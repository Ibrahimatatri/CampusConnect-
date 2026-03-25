import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';

export default function SavedEvents() {
  const { savedEvents, savedEventIds, saveEvent, unsaveEvent } = useApp();

  const toggleSave = (id) => {
    if (savedEventIds.includes(id)) unsaveEvent(id);
    else saveEvent(id);
  };

  return (
    <div className="page-wrap">
      <section className="panel">
        <div className="section-head">
          <h1>Saved Events</h1>
          <p className="muted">Events you wanted to come back to later.</p>
        </div>
        {savedEvents.length === 0 ? (
          <p className="muted">You have not saved any events yet.</p>
        ) : (
          <div className="card-grid">
            {savedEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                saved
                onSaveToggle={toggleSave}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
