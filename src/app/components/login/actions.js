'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export async function login(formData) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
        email: formData.get('email'),
        password: formData.get('password'),
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
        redirect('/error');
    }

    revalidatePath('/', 'layout');
    redirect('/');
}

async function addNewUserToAccountsTable(supabase, accountsInsertObject) {
    const { error } = await supabase.from('account').insert(accountsInsertObject);
    if (error) {
        console.error('Error inserting into accounts table:', error);
    }
}

export async function signup(formData) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const email = formData.get('email');
    const password = formData.get('password');
    const signUpData = { email, password };

    const { data, error } = await supabase.auth.signUp(signUpData);

    if (error) {
        console.error('Sign-up error:', error.message);
        redirect('/error');
    }
    if (data.user) {
        const accountsInsertObject = {
            user_id: data.user.id,
            username: formData.get('username'),
            email,
            name: formData.get('name'),
            date_of_birth: formData.get('DOB'),
        };
        await addNewUserToAccountsTable(supabase, accountsInsertObject);
        revalidatePath('/', 'layout');
        redirect('/');
    }
}