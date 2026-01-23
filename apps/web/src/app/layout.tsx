import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'FlickAI - Your Lightweight Desktop AI Assistant',
    description: 'A minimal, always-available AI assistant that wakes on double-tap. Get instant help with coding, writing, and troubleshooting.',
    keywords: ['AI assistant', 'desktop app', 'productivity', 'coding help', 'writing assistant'],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <body className={`${inter.className} bg-gray-950 text-white antialiased`}>
                {children}
            </body>
        </html>
    )
}
