import './ConversationMessageCard.css';

function formatTimestamp(sentAt) {
    const date = new Date(sentAt);
    return new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Displays time in AM/PM format
    }).format(date);
}

export default function ConversationMessageCard({ bodyText, sentAt, sender }) {
    return (
        <div className={sender == 'user' ? 'user-message-card message-card' : 'shelter-message-card message-card'}>
            <div className='message-card-content'>
                <p className='message-card-body' dangerouslySetInnerHTML={{ __html: bodyText }}></p>
                <p className='message-card-time'> {formatTimestamp(sentAt)}</p>
            </div>
            <div></div>
        </div>
    );
}
