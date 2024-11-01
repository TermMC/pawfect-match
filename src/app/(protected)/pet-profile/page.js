
import Image from 'next/image';
import './PetProfilePage.css';
import ShelterContainer from "../../components/ShelterDetails";
import {supabase} from "@/utils/supabase/client";
import SmallTag from '@/app/components/SmallTag';
import { faVenusMars, faUpRightAndDownLeftFromCenter, faSyringe, faMicrochip, faChild, faPaw } from '@fortawesome/free-solid-svg-icons'


export default async function PetProfile() {
  const { data: pet } = await supabase.from("pets")
      .select('pet_id, name, breed, age, gender, vaccinated, description, microchip, child_friendly, pet_friendly, size' )
      .order('pet_id', { ascending: false })
      .limit(1)
      .single();
  return (
    <>
    <div className='petName'>
      <div className='petDetails'>
        <h1>{pet.name}</h1>
        <h2>{pet.breed}</h2>
        <h2>{pet.age} years old</h2>
        </div>
      <div className="petImageContainer">
        <Image className="petImage" src="https://place.dog/500/550" width="300" height="350" alt="Pet Image"></Image>
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
    <ShelterContainer />
    <div className='petDescription'>
      <h2>More about me...</h2>
      <p>{pet.description}</p>
    </div>
    
  </>
  )
}