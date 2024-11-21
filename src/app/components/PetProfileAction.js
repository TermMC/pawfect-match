'use client';

import {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark, faHeart} from "@fortawesome/free-solid-svg-icons";
import {supabase} from "@/utils/supabase/client";

const PetProfileAction = ({pet, userId}) => {
    const [error, setError] = useState(null);

    const [showHeart, setShowHeart] = useState(false)
    const [showCross, setShowCross] = useState(false)

    const handleLike = async () => {
        try {
            const {data, error} = await supabase
                .from('matches')
                .insert([
                    {user_id: userId, pet_id: pet.pet_id, status: 'pending', created_at: new Date(), accepted: true},
                ])
                .select();

            setShowHeart(true);
            setTimeout(() => setShowHeart(false), 2000);

            setTimeout(function () {
                window.location.reload();
            }, 1500);

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

            setShowCross(true);
            setTimeout(() => setShowCross(false), 2000);

            setTimeout(function () {
                window.location.reload();
            }, 1500);

            if (error)
                setError(error.message);
        } catch (error) {
            console.error('error disliking: ', error);
            setError(error.message);
        }
    };

    return (
        <div>
            <div className="buttonPetContainer">
                {error && <p className="error">{error}</p>}
                <FontAwesomeIcon onClick={handleDislike} icon={faXmark} size="3x" className="dislikeButtonContainer"/>
                {showCross && <div className="iconContainer">
                    <FontAwesomeIcon icon={faXmark} size="10x" className="crossIcon"/>
                </div>}
                <FontAwesomeIcon onClick={handleLike} icon={faHeart} size="3x" className="likeButtonContainer"/>
                {showHeart && <div className="iconContainer">
                    <FontAwesomeIcon icon={faHeart} size="10x" className="heart"/>
                </div>}
            </div>
        </div>
    );
};

export default PetProfileAction;
