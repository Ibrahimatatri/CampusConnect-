import { Link } from 'react-router-dom';

export default function EventCard({ event, saved, onSaveToggle }) {
  return (
    <div className="event-card">
      <div className="event-card-top">
        <span className="pill">{event.category}</span>
        <button className="save-btn" onClick={() => onSaveToggle(event.id)}>
          {saved ? 'Saved' : 'Save'}
        </button>
      </div>
      <h3>{event.title}</h3>
      <p className="muted">{event.date} · {event.time}</p>
      <p className="muted">{event.location}</p>
      <p className="muted">{event.size} group · {event.attendeeCount} attending</p>
      <p>{event.description}</p>
      <Link className="primary-link" to={`/event/${event.id}`}>View Details</Link>
    </div>
  );
}
