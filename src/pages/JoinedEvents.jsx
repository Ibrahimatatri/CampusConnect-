import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';

export default function JoinedEvents() {
  const { joinedEvents, saveEvent, unsaveEvent, savedEventIds } = useApp();

  const toggleSave = (id) => {
    if (savedEventIds.includes(id)) unsaveEvent(id);
    else saveEvent(id);
  };

  return (
    <div className="page-wrap">
      <section className="panel">
        <div className="section-head">
          <h1>Events you joined</h1>
          <p className="muted">Hangouts and sessions you said you would attend.</p>
        </div>
        {joinedEvents.length === 0 ? (
          <p className="muted">
            You have not joined any events yet.{' '}
            <Link className="text-link" to="/home">Browse events</Link>
          </p>
        ) : (
          <div className="card-grid">
            {joinedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                saved={savedEventIds.includes(event.id)}
                onSaveToggle={toggleSave}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
