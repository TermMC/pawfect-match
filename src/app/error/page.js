'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

export default function ErrorPage() {
    const searchParams = useSearchParams()
    const errorCode = searchParams.get('error') | 0;
    const errorMessages = [
        "Sorry, something went wrong.", "Username already taken please sign up again with a different usename."
    ]
    console.log(errorCode, typeof errorCode, errorMessages[errorCode])

    return (
        <div>
            <Suspense><p>{errorMessages[errorCode]}</p></Suspense>
            <p><a href="/login"><strong>Return to login</strong></a></p>
        </div>)
}
