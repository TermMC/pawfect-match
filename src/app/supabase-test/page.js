import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function Page() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data: users } = await supabase.from('account').select();

    return (
        <ul>
            {users?.map((user, index) => (
                <li key={index}>
                    <div>
                        <p>{user.name}</p>
                        <p>{user.username}</p>
                        <p>{user.email}</p>
                        <p>{user.bio}</p>
                    </div>
                    <br />
                </li>
            ))}
        </ul>
    );
}
