'use client'
import { useSearchParams } from 'next/navigation'

export default function ErrorPage() {
    const searchParams = useSearchParams()
    const errorCode = searchParams.get('error') | 0;
    const errorMessages = [
        "Sorry, something went wrong.", "Username already taken please sign up again with a different usename."
    ]
    console.log(errorCode, typeof errorCode, errorMessages[errorCode])

    return (
        <p>{errorMessages[errorCode]} <a href="/login"><strong>Return to login</strong></a></p>)
}