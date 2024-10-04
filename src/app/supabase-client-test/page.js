'use client';
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';

export default function Page() {
    const supabase = createClient();
    const [users, setUsers] = useState();

    useEffect(() => {
        const getUserData = async () => {
            const { data: users } = await supabase.from('account').select();
            setUsers(users);
        };

        getUserData();
    }, [supabase]);

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
