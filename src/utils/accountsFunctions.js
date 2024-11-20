import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export const checkUsernameAvailability = async (currentUsername, newUsername) => {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);
    if (newUsername === currentUsername) {
        return true; // Username hasn't changed, so it's valid
    }

    const { data, error } = await supabase
        .from("account")
        .select("username")
        .eq("username", newUsername)
        .single();

    if (error && error.code === "PGRST116") {
        return true; // Username is available
    }
    return false; // Username is taken
};