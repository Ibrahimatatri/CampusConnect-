import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ReminderModal from '../components/ReminderModal';

export default function EventDetails() {
  const { id } = useParams();
  const {
    events,
    saveEvent,
    unsaveEvent,
    savedEventIds,
    joinEvent,
    joinedEventIds,
    reminders,
    setReminderForEvent,
    showToast
  } = useApp();

  const [showReminder, setShowReminder] = useState(false);

  const event = useMemo(() => events.find((item) => item.id === id), [events, id]);
  if (!event) return <div className="page-wrap"><p>Event not found.</p></div>;

  const isSaved = savedEventIds.includes(event.id);
  const isJoined = joinedEventIds.includes(event.id);

  const handleReminderSelect = (option) => {
    setReminderForEvent(event.id, option);
    setShowReminder(false);
    showToast(`Reminder set: “${event.title}” · ${option}`);
  };

  return (
    <div className="page-wrap">
      <section className="details-card">
        <div className="details-top">
          <div>
            <span className="pill">{event.category}</span>
            <h1>{event.title}</h1>
            <p className="muted">Hosted by {event.host}</p>
          </div>
          <div className="button-row wrap-row">
            <button
              className="secondary-btn"
              onClick={() => {
                if (isSaved) {
                  unsaveEvent(event.id);
                  showToast('Removed this event from saved.');
                } else {
                  saveEvent(event.id);
                  showToast('Saved. Find it anytime under Saved Events.');
                }
              }}
            >
              {isSaved ? 'Saved' : 'Save Event'}
            </button>
            <button
              className="primary-btn"
              onClick={() => {
                if (!isJoined) {
                  joinEvent(event.id);
                  showToast(`You joined “${event.title}”.`);
                }
              }}
              disabled={isJoined}
            >
              {isJoined ? 'Joined' : 'Join Event'}
            </button>
          </div>
        </div>

        <div className="details-grid">
          <div>
            <h3>Event details</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Group size:</strong> {event.size}</p>
            <p><strong>Attending:</strong> {event.attendeeCount}</p>
            <p><strong>Good for:</strong> {event.audience}</p>
          </div>
          <div>
            <h3>What to expect</h3>
            <p>{event.description}</p>
            <p className="muted small">
              {reminders[event.id]
                ? `Reminder: ${event.title} · ${reminders[event.id]}`
                : 'No reminder set yet.'}
            </p>
          </div>
        </div>

        <div className="button-row wrap-row top-gap">
          <button className="secondary-btn" onClick={() => setShowReminder(true)}>Set Reminder</button>
          <Link className="secondary-link button-like" to={`/map/${event.id}`}>View Map</Link>
          <Link className="secondary-link button-like" to={`/participants/${event.id}`}>View Participants</Link>
        </div>
      </section>

      <ReminderModal
        open={showReminder}
        eventTitle={event.title}
        onClose={() => setShowReminder(false)}
        onSelect={handleReminderSelect}
      />
    </div>
    );
}
