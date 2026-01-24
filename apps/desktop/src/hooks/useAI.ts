import { useState, useCallback } from 'react';

const CEREBRAS_API_URL = 'https://api.cerebras.ai/v1/chat/completions';

export interface MessageContent {
    type: 'text' | 'image_url';
    text?: string;
    image_url?: { url: string };
}

export interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string | MessageContent[];
}

export function useAI() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const chat = useCallback(async (
        messages: Message[],
        onStream?: (chunk: string) => void,
        visionContext?: string  // Vision description from OpenRouter
    ): Promise<string> => {
        const apiKey = import.meta.env.VITE_CEREBRAS_API_KEY;

        if (!apiKey) {
            // Demo mode - return simulated response
            const lastMessage = messages[messages.length - 1];
            const messageText = typeof lastMessage?.content === 'string'
                ? lastMessage.content
                : (lastMessage?.content as MessageContent[])?.find(c => c.type === 'text')?.text || '';
            return simulateResponse(messageText, !!visionContext);
        }

        setIsLoading(true);
        setError(null);

        try {
            // Detect context type based on user input and vision context
            const contextType = detectContextType(messages, !!visionContext);
            const systemPrompt = getContextualSystemPrompt(contextType, visionContext);

            console.log('[FlickAI] Calling Cerebras GLM 4.7...');
            if (visionContext) {
                console.log('[FlickAI] Vision context included in system prompt');
            }

            const response = await fetch(CEREBRAS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                    'User-Agent': 'FlickAI-Desktop/1.0',
                },
                body: JSON.stringify({
                    model: 'zai-glm-4.7',
                    messages: [
                        {
                            role: 'system',
                            content: systemPrompt,
                        },
                        ...messages,
                    ],
                    stream: !!onStream,
                    temperature: 1.0, // GLM 4.7 default recommended by Z.ai
                    top_p: 0.95, // Balanced default
                    max_completion_tokens: 2048,
                    clear_thinking: false, // Preserve reasoning for coding/agentic workflows & better cache hits
                }),
            });

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }

            if (onStream && response.body) {
                const reader = response.body.getReader();
                const decoder = new TextDecoder();
                let fullContent = '';

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;

                    const chunk = decoder.decode(value, { stream: true });
                    const lines = chunk.split('\n');

                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice(6);
                            if (data === '[DONE]') continue;

                            try {
                                const parsed = JSON.parse(data);
                                const content = parsed.choices?.[0]?.delta?.content || '';
                                if (content) {
                                    fullContent += content;
                                    onStream(content);
                                }
                            } catch {
                                // Skip invalid JSON
                            }
                        }
                    }
                }

                return fullContent;
            } else {
                const data = await response.json();
                return data.choices?.[0]?.message?.content || 'No response generated';
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error';
            setError(message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { chat, isLoading, error };
}

// Helper function to build user message with optional screenshot
export function buildUserMessage(text: string, screenshot?: string): Message {
    if (screenshot) {
        return {
            role: 'user',
            content: [
                { 
                    type: 'text', 
                    text: text || 'Analyze what you see on this screen and help me.' 
                },
                { 
                    type: 'image_url', 
                    image_url: { url: screenshot } 
                }
            ]
        };
    }
    return { role: 'user', content: text };
}

// Detect what kind of help the user needs based on context
function detectContextType(
    messages: Message[],
    hasScreenshot: boolean
): 'coding' | 'writing' | 'email' | 'general' {
    const lastMessage = messages[messages.length - 1];
    const lastMessageText = typeof lastMessage?.content === 'string' 
        ? lastMessage.content.toLowerCase() 
        : (lastMessage?.content as MessageContent[])?.find(c => c.type === 'text')?.text?.toLowerCase() || '';
    const combinedText = lastMessageText;

    // Coding keywords
    const codingKeywords = [
        'code', 'bug', 'error', 'debug', 'function', 'class', 'variable',
        'syntax', 'compile', 'runtime', 'exception', 'import', 'export',
        'typescript', 'javascript', 'python', 'react', 'component', 'api',
        'terminal', 'console', 'stack trace', 'npm', 'yarn', 'git'
    ];

    // Email keywords
    const emailKeywords = [
        'email', 'gmail', 'reply', 'compose', 'send', 'recipient',
        'subject line', 'professional', 'business email', 'message'
    ];

    // Writing keywords
    const writingKeywords = [
        'write', 'grammar', 'rewrite', 'improve', 'polish', 'proofread',
        'document', 'paragraph', 'essay', 'article', 'content', 'tone'
    ];

    // Check for coding context
    if (codingKeywords.some(keyword => combinedText.includes(keyword)) ||
        hasScreenshot) {
        return 'coding';
    }

    // Check for email context
    if (emailKeywords.some(keyword => combinedText.includes(keyword))) {
        return 'email';
    }

    // Check for writing context
    if (writingKeywords.some(keyword => combinedText.includes(keyword))) {
        return 'writing';
    }

    return 'general';
}

// Get contextual system prompt based on detected context
function getContextualSystemPrompt(
    contextType: 'coding' | 'writing' | 'email' | 'general',
    visionContext?: string
): string {
    const basePrompt = 'You are FlickAI, an intelligent desktop assistant powered by Cerebras GLM 4.7.';
    
    // If vision context exists, add it to the prompt
    const visionSection = visionContext 
        ? `\n\n**SCREEN CONTEXT** (from vision analysis):\n${visionContext}\n\nThe above description is from analyzing the user's current screen. Use this context to provide specific, relevant help based on what they're actually seeing.`
        : '';

    switch (contextType) {
        case 'coding':
            return `${basePrompt}${visionSection}

**Context**: User needs coding assistance.

**Your role**:
- Provide accurate, working code solutions
- Debug errors and explain the fix${visionContext ? '\n- Reference specific code/errors visible in the screen context' : ''}
- Suggest best practices and optimizations
- Format code in proper markdown code blocks with language tags
- Be concise but thorough - explain WHY, not just HOW

**Response style**:
- Start with the solution/fix immediately
- Use code blocks: \`\`\`language
- Highlight key changes or error causes
- Keep explanations under 200 words unless complex
- If you see an error in a screenshot, identify it precisely`;

        case 'email':
            return `${basePrompt}

**Context**: User needs help with email composition or replies.

**Your role**:
- Draft professional, clear emails
- Adapt tone based on context (formal/casual)
- Structure: Subject line (if needed) → Greeting → Body → Closing
- Keep it concise and actionable
- For Gmail replies, match the thread's tone

**Response style**:
- Provide the complete email draft
- Use proper formatting (paragraphs, bullets if needed)
- Suggest 2-3 subject line options if composing new email
- Be direct and respectful`;

        case 'writing':
            return `${basePrompt}

**Context**: User needs writing assistance (grammar, rewriting, improvement).

**Your role**:
- Correct grammar, spelling, and punctuation
- Improve clarity and flow
- Adjust tone as needed (professional, casual, persuasive)
- Maintain the user's voice and intent
- Highlight major changes made

**Response style**:
- Show the improved version first
- Brief explanation of changes (1-2 sentences)
- Suggest alternatives if relevant
- Be constructive, not just corrective`;

        case 'general':
        default:
            return `${basePrompt}

**Your capabilities**:
- 💻 Code assistance: Debug, write, and optimize code
- ✍️ Writing help: Grammar, rewriting, and composition
- 📧 Email drafting: Professional and personal emails
- 🔍 General help: Troubleshooting, explanations, productivity

**Response guidelines**:
- Be concise and actionable (under 300 words)
- Use formatting: **bold**, bullets, code blocks
- Prioritize clarity over verbosity
- Ask clarifying questions if context is unclear
- If user shows a screenshot, analyze it carefully`;
    }
}

// Demo response for when no API key is configured
async function simulateResponse(userMessage: string, hasScreenshot: boolean = false): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 800));

    const lower = userMessage.toLowerCase();

    if (lower.includes('code') || lower.includes('error') || lower.includes('bug')) {
        return `I can help with that! Here's a quick solution:

\`\`\`javascript
// Example fix
const handleError = (error) => {
  console.error('Error:', error.message);
  // Add proper error handling
};
\`\`\`

**Tips:**
- Check your syntax for typos
- Verify all imports are correct
- Look for null/undefined values

Need more specific help? Share the actual code!`;
    }

    if (lower.includes('write') || lower.includes('email') || lower.includes('document')) {
        return `Here's a polished version:

> Your text has been refined for clarity and professionalism.

**Suggestions:**
- Use active voice for stronger impact
- Keep sentences concise
- Lead with the main point

Would you like me to adjust the tone or style?`;
    }

    if (lower.includes('screenshot') || hasScreenshot) {
        return `I can see your screenshot! Here's what I notice:

📸 **Analysis:**
- The interface looks clean
- I can help troubleshoot any visible errors
- Share more context for detailed assistance

${hasScreenshot ? '*Note: Screenshot automatically captured! In production mode, I would analyze the actual content.*' : 'What specifically would you like help with?'}`;
    }

    return `Thanks for your message! I'm FlickAI, your desktop assistant.

I can help you with:
- 💻 **Coding** - Debug, refactor, or write code
- ✍️ **Writing** - Polish emails, docs, or creative content
- 📸 **Screenshots** - Analyze and troubleshoot what you see
- 🎤 **Voice** - Just click the mic and speak

*Connect a Cerebras API key for full AI capabilities!*`;
}
