import './ShelterDetails.css';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";

export default async function ShelterDetails({ petId, shelterId }) {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const { data: pet, error} = await supabase.from('pets')
        .select(`owner_id, pet_id, shelters(shelter_id, name, location)`)
        .eq('pet_id', petId)
        .limit(1)
        .single();

    if (error) {
        console.error(error);
        return <div>Error fetching shelter details.</div>
    }

    const shelter = pet.shelters;
    if (!shelter) {
        return <div>No shelter information available.</div>;
    }

    return (
        <Link href={`/shelter/${shelterId}`}>
            <div className="shelterDetailsContainer">
                <Image className="shelterDetailsImage" src="/images/ShelterImage.svg" width="70" height="70"
                       alt="Shelter logo"></Image>
                <div className="shelterDetails">
                    <h1>{shelter.name}</h1>
                    <h2>{shelter.location}</h2>
                </div>
                <div className="rightArrow">
                    <FontAwesomeIcon icon={faChevronRight} size="2x" style={{color: "#D6D6D6"}}/>
                </div>
            </div>
        </Link>
    );
}
