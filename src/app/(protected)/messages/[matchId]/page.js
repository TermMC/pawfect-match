'use client';
import { supabase } from '@/utils/supabase/client';
import { useRef, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from "next/link";
import ConversationMessageCard from '@/app/components/ConversationMessageCard';
import './Conversation.css';

export default function Conversation() {
    const params = useParams();
    const matchId = params.matchId;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversationPartner, setConversationPartner] = useState(null);
    const messageEndRef = useRef(null);

    useEffect(() => {
        const fetchMessages = async () => {
            const { data, error } = await supabase.from('messages').select('*').eq('match_id', matchId).order('sent_at', { ascending: true });
            if (error) {
                console.error;
            } else {
                setMessages(data);
            }
        };
        const fetchPartnerInfo = async () => {
            const { data, error } = await supabase.from('matches').select(
                `
                pet_id, 
                pets (
                pet_id,
                name,
                breed,
                image,
                owner_id,
                shelters (
                shelter_id,
                name
            ))
                `
            ).eq('match_id', matchId).single();
            if (!error) setConversationPartner(data);
        };
        fetchMessages();
        fetchPartnerInfo();
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
            <div className="conversation-header">
                <Link className="back-button" href="/messages">←</Link>
                {conversationPartner && (
                    <>
                        <img
                            src={conversationPartner.pets.image}
                            alt={`${conversationPartner.pets.name}'s avatar`}
                            className="partner-avatar"
                        />
                        <div className="partner-info">
                            <span className="partner-name">{conversationPartner.pets.name}</span>
                            <span className="partner-breed">{conversationPartner.pets.breed}</span>
                            <span className="partner-shelter">Shelter: {conversationPartner.pets.shelters.name}</span>
                        </div>
                    </>
                )}
            </div>
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
