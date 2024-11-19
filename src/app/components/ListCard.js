import Image from 'next/image';
import './ListCard.css';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function ListCard({ image, title, bodyText, status, pet_id, match_id, type }) {
    const petProfileLink = `/pet-profile/${pet_id}`;
    const conversationLink = `/messages/${match_id}`
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);
    const { data: messages } = await supabase
        .from('messages')
        .select('message_id')
        .eq('match_id', match_id);

    return (
        <Link href={type == "match" ? petProfileLink : conversationLink} className='list-card'>
            <Image width='50' height='50' src={image} alt={title} className='list-card-image' />
            <div className='list-card-content'>
                <h3 className='list-card-title'>{title}</h3>
                <p className='list-card-body' dangerouslySetInnerHTML={{ __html: bodyText }}></p>
                {status && <p className='list-card-status'>Status: {status}</p>}
            </div>
        </Link>
    );
}
