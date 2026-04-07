import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, eventSizes } from '../data/categories';
import { useApp } from '../context/AppContext';

function formatReminderLabel(time) {
  if (!time) return '';
  return time.replace(/^1 hour before$/i, '1 hour notice').replace(/^1 day before$/i, '1 day notice');
}

export default function Settings() {
  const { currentUser, reminders, events, updateUserSettings, showToast } = useApp();
  const [preferredSize, setPreferredSize] = useState(currentUser.preferredSize);
  const [interests, setInterests] = useState(currentUser.interests);

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]
    );
  };

  const handleSave = () => {
    updateUserSettings({ preferredSize, interests });
    showToast('Settings saved. Recommendations will follow these preferences.');
  };

  return (
    <div className="page-wrap">
      <section className="panel form-panel">
        <h1>Settings</h1>
        <p className="muted">Adjust what kind of events you want to see more often.</p>

        <label>Preferred event size</label>
        <div className="button-row wrap-row">
          {eventSizes.map((size) => (
            <button
              key={size}
              className={preferredSize === size ? 'chip active' : 'chip'}
              onClick={() => setPreferredSize(size)}
              type="button"
            >
              {size}
            </button>
          ))}
        </div>

        <label className="top-gap">Preferred categories</label>
        <div className="interest-grid">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={interests.includes(category) ? 'chip active' : 'chip'}
              onClick={() => toggleInterest(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="top-gap">
          <h3>Reminder status</h3>
          {Object.keys(reminders).length === 0 ? (
            <p className="muted">No reminders have been set yet.</p>
          ) : (
            <ul className="plain-list reminder-list">
              {Object.entries(reminders).map(([eventId, value]) => {
                const linked = events.find((item) => item.id === eventId);
                const eventTitle = linked?.title || 'Event';
                const reminderShort = formatReminderLabel(value);
                return (
                  <li key={eventId}>
                    <Link className="text-link" to={`/event/${eventId}`}>
                      {eventTitle}
                    </Link>
                    <span className="muted"> — {reminderShort}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <button className="primary-btn top-gap" onClick={handleSave}>Save Changes</button>
      </section>
    </div>
  );
}
