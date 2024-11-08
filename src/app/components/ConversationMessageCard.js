import './ConversationMessageCard.css';

export default function ConversationMessageCard({ bodyText, sentAt, sender }) {
    return (
        <div className={sender == 'user' ? 'user-message-card message-card' : 'shelter-message-card message-card'}>
            <div className='message-card-content'>
                <p className='message-card-body' dangerouslySetInnerHTML={{ __html: bodyText }}></p>
                <p className='message-card-time'> {sentAt}</p>
            </div>
            <div></div>
        </div>
    );
}
