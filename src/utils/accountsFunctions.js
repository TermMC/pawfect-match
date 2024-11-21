
export const checkUsernameAvailability = async (supabase, currentUsername, newUsername) => {
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