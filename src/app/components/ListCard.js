import Image from 'next/image';
import './ListCard.css';
import Link from 'next/link';

export default function ListCard({ image, title, bodyText, status, pet_id, match_id, type }) {
    const link = type == 'match' ? `/profile/${pet_id}` : `/messages/${match_id}`;
    return (
        <Link href={link} className='list-card'>
            <Image width='50' height='50' src={image} alt={title} className='list-card-image' />
            <div className='list-card-content'>
                <h3 className='list-card-title'>{title}</h3>
                <p className='list-card-body' dangerouslySetInnerHTML={{ __html: bodyText }}></p>
                {status && <p className='list-card-status'>Status: {status}</p>}
            </div>
            <div></div>
        </Link>
    );
}
