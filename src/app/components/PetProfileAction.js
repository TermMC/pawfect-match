'use client';

import {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSquareXmark, faSquareCheck} from "@fortawesome/free-solid-svg-icons";
import {supabase} from "@/utils/supabase/client";

const PetProfileAction = ({pet, userId, availablePets}) => {
    const [error, setError] = useState(null);

    const handleLike = async () => {
        try {
            const {data, error} = await supabase
                .from('matches')
                .insert([
                    {user_id: userId, pet_id: pet.pet_id, status: 'pending', created_at: new Date(), accepted: true},
                ])
                .select();

            console.log('like success', data);

            window.location.reload();

            if (error)
                setError(error.message);
        } catch (error) {
            console.error('error liking: ', error);
            setError(error.message);
        }
    };

    const handleDislike = async () => {
        try {
            const {data, error} = await supabase
                .from('matches')
                .insert([
                    {user_id: userId, pet_id: pet.pet_id, status: 'closed', created_at: new Date(), accepted: false},
                ])
                .select();

            console.log('dislike success', data);

            window.location.reload();

            if (error)
                setError(error.message);
        } catch (error) {
            console.error('error disliking: ', error);
            setError(error.message);
        }
    };

    return (
        <div className="buttonSectionContainer">
            <div className="buttonContainer">
                {error && <p className="error">{error}</p>}
                <FontAwesomeIcon onClick={handleDislike} icon={faSquareXmark} size="5x" style={{color: "#B32828"}}/>
                <FontAwesomeIcon onClick={handleLike} icon={faSquareCheck} size="5x" style={{color: "#0E5C1F"}}/>
            </div>
        </div>
    );
};

export default PetProfileAction;
