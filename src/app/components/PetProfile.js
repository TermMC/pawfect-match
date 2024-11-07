import Tag from './Tag';
import Image from 'next/image';
import './PetProfile.css';
import ShelterContainer from "./ShelterDetails";
import PetProfileClient from './PetProfileClient';
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export default async function PetProfile({ userId }) {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const petId = '40';

    const { data: pet } = await supabase
        .from('pets')
        .select('pet_id, name, breed, age, gender, vaccinated, description, owner_id')
        .eq('pet_id', petId)
        .limit(1)
        .single();

    return (
        <div key={pet.pet_id} className="pageContainer">
            <div className="petImageContainer">
                <Image
                    className="petImage"
                    src="https://place.dog/500/550"
                    width="500"
                    height="550"
                    alt="Pet Image"
                />
            </div>
            <div className="profileContainer">
                <div className="headerContainer">
                    <h1>{pet.name}</h1>
                    <h2>{pet.breed}</h2>
                </div>
                <div className="tagContainer">
                    <Tag title="Age" description={`${pet.age}`} />
                    <Tag title="Gender" description={`${pet.gender}`} />
                    <Tag title="Vaccinated" description={pet.vaccinated ? 'Yes' : 'No'} />
                </div>
                <ShelterContainer petId={pet.pet_id} shelterId={pet.owner_id} />
                <div className="petDescription">
                    <p>
                        {pet.description}
                        <a href="/pet-profile">Read more...</a>
                    </p>
                </div>
            </div>
            <PetProfileClient pet={pet} userId={userId} />
        </div>
    );
}
