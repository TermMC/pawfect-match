'use client';
import { supabase } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ConversationMessageCard from '@/app/components/ConversationMessageCard';

export default function Conversation() {
    const params = useParams();
    const matchId = params.matchId;
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const fetchMessages = async () => {
            const { data, error } = await supabase.from('messages').select('*').eq('match_id', matchId);
            if (error) {
                console.error;
            } else {
                console.log(data);
                setMessages(data);
            }
        };
        fetchMessages();
    }, [matchId]);
    return (
        <div>
            {messages.map((message) => (
                <ConversationMessageCard key={message.message_id} bodyText={message.content} sender={message.sender} sentAt={message.sent_at} />
            ))}
        </div>
    );
}
