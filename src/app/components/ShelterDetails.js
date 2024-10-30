import './ShelterDetails.css';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import {supabase} from "@/utils/supabase/client";



export default async function ShelterDetails() {
    const {data: shelters} = await supabase.from("shelters")
        .select('shelter_id, name')
        .limit(1)
        .single();
    return (
        <Link href="/shelter">
            <div className="shelterDetailsContainer">
                <Image className="shelterDetailsImage" src="/images/ShelterImage.svg" width="80" height="80"
                       alt="Shelter logo"></Image>
                <div className="shelterDetails">
                    <h1>{shelters.name}</h1>
                    <h2>Location</h2>
                </div>
                <div className="rightArrow">
                    <FontAwesomeIcon icon={faChevronRight} size="2x" style={{color: "#D6D6D6"}}/>
                </div>
            </div>
        </Link>
    );
}
