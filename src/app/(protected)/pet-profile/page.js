import PetProfile from "../../components/PetProfile";
import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";

export default async function PetProfilePage() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);

  const {data, error} = await supabase.auth.getUser();
  console.log(data)
  if (error || !data?.user) {
    redirect('/login');
  }

  return (
      <PetProfile/>
  );
}