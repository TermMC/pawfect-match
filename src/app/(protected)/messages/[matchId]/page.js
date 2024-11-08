'use client';
import { supabase } from '@/utils/supabase/client';
import { useRef, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ConversationMessageCard from '@/app/components/ConversationMessageCard';
import './Conversation.css';

export default function Conversation() {
    const params = useParams();
    const matchId = params.matchId;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messageEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const { data, error } = await supabase.from('messages').select('*').eq('match_id', matchId).order('sent_at', { ascending: true }); // Orders messages by timestamp
            if (error) {
                console.error;
            } else {
                setMessages(data);
            }
        };
        fetchMessages();
    }, [matchId]);

    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        const { data: user } = await supabase.auth.getUser();

        const { data, error } = await supabase
            .from('messages')
            .insert([{ content: newMessage.trim(), sender: 'user', match_id: matchId, user_id: user.id }])
            .select('message_id, content, match_id, sender, sent_at');

        if (error) {
            console.error(error);
        } else {
            setMessages((prevMessages) => [...prevMessages, data[0]]);
            setNewMessage('');
        }
    };

    return (
        <div className='conversation-container'>
            <div className='conversation-list'>
                {messages.map((message) => (
                    <ConversationMessageCard key={message.message_id} bodyText={message.content} sender={message.sender} sentAt={message.sent_at} />
                ))}
                <div ref={messageEndRef} />
            </div>
            <div className='message-input-container'>
                <input
                    type='text'
                    placeholder='Type a message...'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className='message-input'
                />
                <button onClick={sendMessage} className='send-button'>
                    Send
                </button>
            </div>
        </div>
    );
}
