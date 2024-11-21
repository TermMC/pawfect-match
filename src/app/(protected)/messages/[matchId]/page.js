import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import ConversationWindow from '@/app/components/ConversationWindow';

export default async function Conversation({ params }) {
    const matchId = params.matchId;
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const { data: session, error } = await supabase.auth.getUser()

    console.log("HERHE", session)
    return (
        <ConversationWindow matchId={matchId} user={session.user} />
    );
}
