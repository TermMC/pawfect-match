import UserProfile from "@/app/components/UserProfile";
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'


export default async function UserProfilePage () {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')}

    return (
        <UserProfile user_id_main={data.user.id} />
    )
}