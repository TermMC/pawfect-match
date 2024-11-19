import Image from 'next/image';
import './ListCard.css';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function ListCard({ image, title, bodyText, status, pet_id, match_id, type }) {
    const petProfileLink = `/pet-profile/${pet_id}`;
    const conversationLink = `/messages/${match_id}`;

    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const { data: messages } = await supabase
        .from('messages')
        .select('message_id')
        .eq('match_id', match_id);

    const hasMessages = messages && messages.length > 0;

    return (
        <div className="list-card">
            <Link href={type === 'match' ? petProfileLink : conversationLink} className="list-card-main-link">
                <Image width="50" height="50" src={image} alt={title} className="list-card-image" />
                <div className="list-card-content">
                    <h3 className="list-card-title">{title}</h3>
                    <p className="list-card-body" dangerouslySetInnerHTML={{ __html: bodyText }}></p>
                    {status && <p className="list-card-status">Status: {status}</p>}
                </div>
            </Link>
            {type === 'match' && (
                <Link
                    href={conversationLink}
                    className="conversation-link"
                    title={hasMessages ? 'Continue Conversation' : 'Start New Conversation'}
                >
                    <Image
                        src={hasMessages ? '/images/chat.png' : '/images/new-chat.png'}
                        alt={hasMessages ? 'Continue Conversation' : 'Start New Conversation'}
                        width={30}
                        height={30}
                    />
                </Link>
            )}
        </div>
    );
}
