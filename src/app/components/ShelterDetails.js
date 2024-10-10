import styles from './ShelterDetails.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

const ShelterDetails = () => {
    return (
        <div className={styles.shelterContainer}>
          <Image styles={styles.shelterImage} src="/images/ShelterImage.svg" width="80" height="80" alt="Shelter logo"></Image>
          <div className={styles.shelterDetails}>
            <h1>Shelter Name</h1>
            <h2>Location</h2>
          </div>
          <div className={styles.rightArrow}>
          <FontAwesomeIcon icon={faChevronRight} size="2x" style={{color: "#D6D6D6"}} />
          </div>
        </div>
    );
}
export default ShelterDetails;