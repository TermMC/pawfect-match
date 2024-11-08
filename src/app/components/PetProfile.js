import Tag from './Tag';
import Image from 'next/image';
import './PetProfile.css';
import ShelterContainer from "./ShelterDetails";
import PetProfileAction from './PetProfileAction';
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function PetProfile({ userId }) {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const { data: matchedPets, error: matchesError } = await supabase
        .from('matches')
        .select('pet_id')
        .eq('user_id', userId);

    if(matchesError){
        console.error('Error fetching matches:', matchesError.message)
        return <div>Error fetching matched pets.</div>
    }

    const matchedPetIds = matchedPets.map((match) => match.pet_id);

    const { data: availablePets, error: petsError} = await supabase
        .from('pets')
        .select('pet_id, name, breed, age, gender, vaccinated, description, owner_id')
        .not('pet_id', 'in', `(${matchedPetIds.join(', ')})`);

    if(petsError){
        console.error('Error fetching available pets:', petsError.message)
        return <div>Error fetching available pets.</div>
    }

    const availablePet = availablePets.length > 0 ? availablePets[0] : null;

    return (
        <div className="pageContainer">
            {availablePet ? (
                <div key={availablePet.pet_id} className="petProfile">
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
                            <h1>{availablePet.name}</h1>
                            <h2>{availablePet.breed}</h2>
                        </div>
                        <div className="tagContainer">
                            <Tag title="Age" description={`${availablePet.age}`} />
                            <Tag title="Gender" description={`${availablePet.gender}`} />
                            <Tag title="Vaccinated" description={availablePet.vaccinated ? 'Yes' : 'No'} />
                        </div>
                        <ShelterContainer petId={availablePet.pet_id} shelterId={availablePet.owner_id} />
                        <div className="petDescription">
                            <p>
                                {availablePet.description}
                                <Link href={`/pet-profile/${availablePet.pet_id}`} >Read more...</Link>
                            </p>
                        </div>
                    </div>
                    <PetProfileAction pet={availablePet} userId={userId} availablePets={availablePets} />
                </div>
            ) : (
                <div>No available pets at the moment.</div>
            )}
        </div>
    );
}

