import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import {cookies} from "next/headers";

export default async function PrivatePage() {
    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore)

    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return <p>Hello {data.user.email}</p>
}