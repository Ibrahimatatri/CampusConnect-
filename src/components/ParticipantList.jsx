export default function ParticipantList({ participants }) {
  return (
    <div className="participant-list">
      {participants.map((participant) => (
        <div className="participant-item" key={participant.id}>
          <div>
            <strong>{participant.name}</strong>
            <p className="muted small">{participant.tags.join(', ')}</p>
          </div>
          <span className={participant.friend ? 'friend-badge' : 'friend-badge muted-badge'}>
            {participant.friend ? 'Friend' : 'Student'}
          </span>
        </div>
      ))}
    </div>
  );
}
