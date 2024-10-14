import Tag from './Tag';
import Image from 'next/image';
import styles from "./PetProfile.module.css";
import ShelterContainer from "./ShelterDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareXmark,
  faSquareCheck
} from "@fortawesome/free-solid-svg-icons";
import {supabase} from "@/utils/supabase/client";

export default async function PetProfile() {
  const { data: pet } = await supabase.from("pets")
      .select('pet_id, name, breed, age, gender, vaccinated, description' )
      .order('pet_id', { ascending: false })
      .limit(1)
      .single();
  return (
    <div key={pet.pet_id} className={styles.pageContainer}>
      <Image src="https://place.dog/500/450" width="500" height="450" alt="Pet Image"></Image>
      <div className={styles.profileContainer}>
        <div className={styles.headerContainer}>
          <h1>{pet.name}</h1>
          <h2>{pet.breed}</h2>
        </div>
        <div className={styles.tagContainer}>
          <Tag title="Age" description={`${pet.age}`} />
          <Tag title="Gender" description={`${pet.gender}`} />
          <Tag title="Vaccinated" description={pet.vaccinated ? 'Yes' : 'No'} />
        </div>
        <ShelterContainer />
        <div className={styles.petDescription}>
          <p>{pet.description}<a href="/profile">Read more...</a></p>
        </div>
        <div className={styles.buttonContainer}>
        <FontAwesomeIcon icon={faSquareXmark} size="5x" style={{color: "#B32828"}} />
        <FontAwesomeIcon icon={faSquareCheck} size="5x" style={{color: "#0E5C1F"}}/>
        </div>
      </div>
    </div>
  );
}