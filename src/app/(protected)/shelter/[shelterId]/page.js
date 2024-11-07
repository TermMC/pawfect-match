import Image from "next/image"
import "../Shelter.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";

async function fetchShelter(shelterId) {
    const cookieStore = cookies();
    const supabase = await createClient(cookieStore);

    const { data, error } = await supabase.from('shelters')
        .select('shelter_id, name, bio, verified')
        .eq('shelter_id', shelterId)
        .single();

    if (error) {
        console.error('Error fetching shelter:', error);
        return null;
    }

    return data;
}

export default async function ShelterPage({ params }) {
    const { shelterId, petId } = await params;
    const shelter = await fetchShelter(shelterId);

    if (!shelter) {
        return <div>Error loading shelter information.</div>;
    }

    return (
        <div className="shelterContainer">
            <Link href="/" petId={petId}>
                <FontAwesomeIcon className="backArrow" icon={faArrowLeft} size="2x"/>
            </Link>
            <Image src="/images/ShelterImage.svg" className="shelterImage" width='200' height='200'
                   alt="Shelter Profile Image"/>
            <div className="shelterName">
                <h1>{shelter.name}</h1>
                {shelter.verified && (
                    <FontAwesomeIcon icon={faCircleCheck} size="2x" style={{color: "#7DC9FF"}}/>
                )}
            </div>
            <div className="shelterBio">
                <h2>Who are we?</h2>
                <p>{shelter.bio}</p>
            </div>
            <Image className="petShelterImage" src="https://place.dog/500/450" width="500" height="450"
                   alt="Pet Image"/>
        </div>
    );
}