const reminderOptions = ['10 minutes before', '30 minutes before', '1 hour before', '1 day before'];

export default function ReminderModal({ open, eventTitle, onClose, onSelect }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Set reminder">
      <div className="modal-card">
        <h3>Set a reminder{eventTitle ? ` for “${eventTitle}”` : ''}</h3>
        <p className="muted">Choose when you want to be reminded before this event starts.</p>

        <div className="button-row wrap-row">
          {reminderOptions.map((option) => (
            <button key={option} className="secondary-btn" type="button" onClick={() => onSelect(option)}>
              {option}
            </button>
          ))}
        </div>

        <button className="ghost-btn top-gap" type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
