import ListCard from '../../components/ListCard';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import './Messages.css';

const id = 'b28f56b5-589b-4ded-8ebe-23efc579a794';

export default async function Matches() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    let uniqueMessages = [];
    const { data, error } = await supabase
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
        .eq('user_id', id)
        .order('match_id', { ascending: true })
        .order('sent_at', { ascending: false });

    if (error) {
        console.error(error);
    } else {
        uniqueMessages = Array.from(
            data
                .reduce((map, message) => {
                    if (!map.has(message.match_id)) {
                        map.set(message.match_id, message);
                    }
                    return map;
                }, new Map())
                .values()
        );
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
