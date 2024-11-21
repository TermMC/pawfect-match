'use client'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ErrorMessage() {
 const searchParams = useSearchParams()
    const errorCode = searchParams.get('error') | 0;
    const errorMessages = [
        "Sorry, something went wrong.", "Username already taken please sign up again with a different usename."
    ]
    return <p>{errorMessages[errorCode]}</p>
}

export default function ErrorPage() {
    return (
        <div>
            <Suspense><ErrorMessage/></Suspense>
            <p><a href="/login"><strong>Return to login</strong></a></p>
        </div>)
}
