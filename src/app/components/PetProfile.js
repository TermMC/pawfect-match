import Tag from './Tag';
import Image from 'next/image';
import styles from "./PetProfile.module.css";
import ShelterContainer from "./ShelterDetails";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareXmark,
  faSquareCheck
} from "@fortawesome/free-solid-svg-icons";

const PetProfile = () => {
  return (
    <div>
      <Image src="https://place.dog/500/450" width="500" height="450" alt="Pet Image" ></Image>
      <div className={styles.profileContainer}>
        <div className={styles.headerContainer}>
          <h1>Bruce</h1>
          <h2>Boxer</h2>
        </div>
        <div className={styles.tagContainer}>
          <Tag title="Age" description="2 years" />
          <Tag title="Gender" description="Male" />
          <Tag title="Vaccinated" description="Yes" />
        </div>
        <ShelterContainer />
        <div className={styles.petDescription}>
          <p>Lorem ipsum dolor sit amet consectetur. Magna sagittis quis amet egestas at egestas nunc ultricies.<a href="/profile">Read more...</a></p>
        </div>
        <div className={styles.buttonContainer}>
        <FontAwesomeIcon icon={faSquareXmark} size="5x" style={{color: "#B32828"}} />
        <FontAwesomeIcon icon={faSquareCheck} size="5x" style={{color: "#0E5C1F"}}/>
        </div>
      </div>
    </div>
  );
}
export default PetProfile;