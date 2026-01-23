import { useState, useCallback } from 'react';

const CEREBRAS_API_URL = 'https://api.cerebras.ai/v1/chat/completions';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export function useAI() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const chat = useCallback(async (
        messages: Message[],
        onStream?: (chunk: string) => void
    ): Promise<string> => {
        const apiKey = import.meta.env.VITE_CEREBRAS_API_KEY;

        if (!apiKey) {
            // Demo mode - return simulated response
            return simulateResponse(messages[messages.length - 1].content);
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(CEREBRAS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b',
                    messages: [
                        {
                            role: 'system',
                            content: `You are FlickAI, a helpful, concise AI assistant. 
              - Be brief and direct in your responses
              - Format code in markdown code blocks
              - For coding questions, provide working solutions
              - For writing help, be clear and constructive
              - Keep responses under 300 words unless asked for more detail`,
                        },
                        ...messages,
                    ],
                    stream: !!onStream,
                    temperature: 0.7,
                    max_tokens: 2048,
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

// Demo response for when no API key is configured
async function simulateResponse(userMessage: string): Promise<string> {
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

    if (lower.includes('screenshot')) {
        return `I can see your screenshot! Here's what I notice:

📸 **Analysis:**
- The interface looks clean
- I can help troubleshoot any visible errors
- Share more context for detailed assistance

What specifically would you like help with?`;
    }

    return `Thanks for your message! I'm FlickAI, your desktop assistant.

I can help you with:
- 💻 **Coding** - Debug, refactor, or write code
- ✍️ **Writing** - Polish emails, docs, or creative content
- 📸 **Screenshots** - Analyze and troubleshoot what you see
- 🎤 **Voice** - Just click the mic and speak

*Connect a Cerebras API key for full AI capabilities!*`;
}
