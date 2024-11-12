import '../PetProfilePage.css';
import ShelterContainer from "../../../components/ShelterDetails";
import {supabase} from "@/utils/supabase/client";
import SmallTag from '@/app/components/SmallTag';
import { faVenusMars, faUpRightAndDownLeftFromCenter, faSyringe, faMicrochip, faChild, faPaw, faArrowLeft, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from "next/link";

export default async function PetProfile({ params }) {
  const petId = await params.petId;

  const { data: pet, error } = await supabase.from("pets")
    .select('pet_id, name, breed, age, gender, vaccinated, description, microchip, child_friendly, pet_friendly, size, owner_id, address')
    .eq('pet_id', petId)
    .single();

    if (error) {
      throw error; // Next.js will catch this and show the closest error boundary
    }
  
    if (!pet) {
      return <div>Pet not found</div>;
    }

  return (
    <div className="petProfilePageContainer">
    <div className='petName'>
      <div className='petDetails'>
        <h1>{pet.name}</h1>
        <p>{pet.breed}</p>
        <p>{pet.age} years old</p>
        </div>
      <div className="petProfileImageContainer">
      </div>
    </div>
    <div className='petInfo'>
      <SmallTag title={pet.gender} icon= {faVenusMars} />
      <SmallTag title={pet.size} icon= {faUpRightAndDownLeftFromCenter}/>
      <SmallTag title={pet.vaccinated? 'Vaccinated' : 'Unvaccinated'} icon= {faSyringe}/>
      <SmallTag title={pet.microchip? 'Microchipped' : 'Not Microchipped'} icon= {faMicrochip}/>
      <SmallTag title={pet.child_friendly? 'Child-friendly' : 'Not Child-friendly'} icon= {faChild}/>
      <SmallTag title={pet.pet_friendly? 'Fine with other Animals' : 'Not Pet-friendly'} icon= {faPaw}/>
    </div>
    <div className='petProfileDescription'>
      <h2>More about me...</h2>
      <p>{pet.description}</p>
    </div>
    <div className='petProfileDescription'>
      <h2>Where you can find me</h2>
      <p><FontAwesomeIcon className='locationIcon' icon={faLocationDot} /> {pet.address}</p>
    </div>
    <div className='petProfileDescription'>
      <h2>My Shelter</h2>
    <ShelterContainer className='shelterContainer' petId={pet.pet_id} shelterId={pet.owner_id} />
    </div>
    <div className='buttonSectionContainer'>
      <div className='backButtonContainer'>
        <Link href='/' aria-label="Navigate back to homepage">
          <FontAwesomeIcon className='backButton' icon={faArrowLeft}/>
        </Link>
      </div>
    </div>
  </div>
  )
}