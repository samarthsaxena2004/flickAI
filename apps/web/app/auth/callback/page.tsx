'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthCallbackPage() {
    const searchParams = useSearchParams()
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
    const [message, setMessage] = useState('Processing authentication...')

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Get token from URL or exchange code for token
                const token = searchParams.get('token') || searchParams.get('access_token')

                if (token) {
                    // Redirect to desktop app with token
                    setMessage('Authentication successful! Redirecting to FlickAI...')
                    setStatus('success')

                    // Small delay for user to see success message
                    setTimeout(() => {
                        window.location.href = `flick://auth?token=${token}`
                    }, 1500)
                } else {
                    throw new Error('No token received')
                }
            } catch (err) {
                setStatus('error')
                setMessage('Authentication failed. Please try again.')
            }
        }

        handleCallback()
    }, [searchParams])

    return (
        <main className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
            {/* Background */}
            <div className="noise-overlay" />
            <div className="glow-orb w-[400px] h-[400px] bg-violet-600 top-[20%] left-[20%]" />

            <div className="text-center relative z-10">
                <div className="glass rounded-3xl p-12 max-w-md">
                    {status === 'loading' && (
                        <>
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-violet-500 border-t-transparent animate-spin" />
                            <h1 className="text-xl font-semibold mb-2">Authenticating...</h1>
                        </>
                    )}

                    {status === 'success' && (
                        <>
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-semibold mb-2">Success!</h1>
                        </>
                    )}

                    {status === 'error' && (
                        <>
                            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <h1 className="text-xl font-semibold mb-2">Authentication Failed</h1>
                        </>
                    )}

                    <p className="text-white/60">{message}</p>

                    {status === 'error' && (
                        <Link
                            href="/auth/login"
                            className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl font-medium"
                        >
                            Try Again
                        </Link>
                    )}
                </div>
            </div>
        </main>
    )
}
