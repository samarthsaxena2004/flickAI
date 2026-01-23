export interface User {
    id: string
    email: string
    name?: string
    avatar?: string
    createdAt: string
}

export interface Message {
    id: string
    role: 'user' | 'assistant'
    content: string
    timestamp: number
}

export interface ChatSession {
    id: string
    title: string
    messages: Message[]
    createdAt: string
    updatedAt: string
}
