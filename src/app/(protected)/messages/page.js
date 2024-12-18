import ListCard from '../../components/ListCard';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import './Messages.css';

export default async function Messages() {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    let uniqueMessages = [];
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect('/login');
    } else {
        const { data: messages, error } = await supabase
            .from('messages')
            .select(
                `
                message_id,
                user_id,
                match_id,
                content,
                sent_at,
                sender,
                matches (
                match_id,
                pets (
                    pet_id,
                    name
                )
                )
            `
            )
            .eq('user_id', data.user.id)
            .order('match_id', { ascending: true })
            .order('sent_at', { ascending: false });

        if (error) {
            console.error(error);
        } else {
            uniqueMessages = Array.from(
                messages
                    .reduce((map, message) => {
                        if (!map.has(message.match_id)) {
                            map.set(message.match_id, message);
                        }
                        return map;
                    }, new Map())
                    .values()
            );
        }
    }
    return (
        <div className='message-list'>
            {uniqueMessages.map((message) => (
                <ListCard
                    key={message.message_id}
                    match_id={message.match_id}
                    image={'https://place.dog/50/50'}
                    title={message.matches.pets.name}
                    bodyText={message.content}
                />
            ))}
        </div>
    );
}
