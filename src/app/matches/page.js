import ListCard from '../components/ListCard';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import './Matches.css';

const id = 'b28f56b5-589b-4ded-8ebe-23efc579a794';

export default async function Matches() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: matches } = await supabase.from('matches').select('match_id,pet_id, status, pets(age,species, breed, size, image, name)').eq('user_id', id);

    return (
        <div className='match-list'>
            {matches.map((match) => {
                const textBody = `${match.pets.age} Year${match.pets.age > 1 ? 's' : ''} Old <br> Breed: ${match.pets.species}<br>`;

                return (
                    <ListCard
                        key={match.match_id}
                        image={'https://place.dog/50/50'}
                        title={match.pets.name}
                        bodyText={textBody}
                        status={match.status}
                        pet_id={match.pet_id}
                    />
                );
            })}
        </div>
    );
}
