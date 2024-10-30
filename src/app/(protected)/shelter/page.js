import Image from "next/image"
import "./Shelter.css"
import { supabase } from "@/utils/supabase/client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleCheck,
    faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default async function Page(){
const {data: shelters} = await supabase.from("shelters")
    .select('shelter_id, name, bio, verified')
    .limit(1)
    .single();

    return (
        <div className="shelterContainer">
            <Link href="/">
                <FontAwesomeIcon className="backArrow" icon={faArrowLeft} size="2x" />
            </Link>
            <Image src="/images/ShelterImage.svg" className="shelterImage" width='200' height='200' alt="Shelter Profile Image" />
            <div className="shelterName">
                <h1>{shelters.name}</h1>
                <FontAwesomeIcon icon={faCircleCheck} size="2x" style={{color: "#7DC9FF"}}/>
            </div>
            <div className="shelterBio">
                <h2>Who are we?</h2>
                <p>{shelters.bio}</p>
            </div>
            <Image className="petShelterImage" src="https://place.dog/500/450" width="500" height="450" alt="Pet Image" />
        </div>
    )
}