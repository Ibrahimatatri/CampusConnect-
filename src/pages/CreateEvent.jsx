import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, eventSizes } from '../data/categories';
import { buildings } from '../data/buildings';
import { useApp } from '../context/AppContext';

const emptyErrors = {
  title: '',
  description: '',
  date: '',
  time: '',
  location: ''
};

export default function CreateEvent() {
  const navigate = useNavigate();
  const { createEvent, currentUser, showToast } = useApp();
  const [errors, setErrors] = useState(emptyErrors);

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: 'Social',
    date: '',
    time: '',
    location: '',
    building: buildings[0].name,
    size: 'Small',
    visibility: 'Open to all',
    note: ''
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = form.title.trim();
    const description = form.description.trim();
    const date = form.date.trim();
    const time = form.time.trim();
    const location = form.location.trim();

    const nextErrors = { ...emptyErrors };
    if (title.length < 3) nextErrors.title = 'Add a clear title (at least 3 characters).';
    if (description.length < 10) nextErrors.description = 'Add a short description (at least 10 characters) so people know what to expect.';
    if (date.length < 2) nextErrors.date = 'Add a date (for example Apr 18 or 2026-04-18).';
    if (time.length < 2) nextErrors.time = 'Add a time so attendees know when to show up.';
    if (location.length < 2) nextErrors.location = 'Add a room, area, or meeting link.';

    const hasError = Object.values(nextErrors).some(Boolean);
    setErrors(nextErrors);
    if (hasError) {
      showToast('Fix the highlighted fields before posting.');
      return;
    }

    const newEvent = {
      id: `e${Date.now()}`,
      title,
      category: form.category,
      size: form.size,
      date,
      time,
      location,
      building: form.building,
      description: `${description}${form.note.trim() ? ` What to bring: ${form.note.trim()}.` : ''}`,
      audience: form.visibility,
      attendeeCount: 1,
      host: `${currentUser.name} · Student-led`,
      today: false,
      participants: [{ id: currentUser.id, name: currentUser.name, tags: currentUser.interests, friend: false }]
    };

    createEvent(newEvent);
    showToast('Event posted. It now appears on the home feed.');
    navigate('/home');
  };

  return (
    <div className="page-wrap">
      <section className="panel form-panel">
        <h1>Create a Student Event</h1>
        <p className="muted">Keep it simple. A quick study session or hangout is enough.</p>
        <form className="stack-form" noValidate onSubmit={handleSubmit}>
          <label htmlFor="create-title">Title</label>
          <input
            id="create-title"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            aria-invalid={Boolean(errors.title)}
          />
          {errors.title ? <p className="field-error">{errors.title}</p> : null}

          <label htmlFor="create-description">Description</label>
          <textarea
            id="create-description"
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            aria-invalid={Boolean(errors.description)}
          />
          {errors.description ? <p className="field-error">{errors.description}</p> : null}
          <p className="hint">Explain what will happen, who it is for, and anything guests should know.</p>

          <div className="two-col">
            <div>
              <label>Category</label>
              <select value={form.category} onChange={(e) => handleChange('category', e.target.value)}>
                {categories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </div>
            <div>
              <label>Expected group size</label>
              <select value={form.size} onChange={(e) => handleChange('size', e.target.value)}>
                {eventSizes.map((size) => <option key={size}>{size}</option>)}
              </select>
            </div>
          </div>

          <div className="two-col">
            <div>
              <label htmlFor="create-date">Date</label>
              <input
                id="create-date"
                type="text"
                placeholder="Apr 18"
                value={form.date}
                onChange={(e) => handleChange('date', e.target.value)}
                aria-invalid={Boolean(errors.date)}
              />
              {errors.date ? <p className="field-error">{errors.date}</p> : null}
            </div>
            <div>
              <label htmlFor="create-time">Time</label>
              <input
                id="create-time"
                type="text"
                placeholder="6:00 PM"
                value={form.time}
                onChange={(e) => handleChange('time', e.target.value)}
                aria-invalid={Boolean(errors.time)}
              />
              {errors.time ? <p className="field-error">{errors.time}</p> : null}
            </div>
          </div>

          <div className="two-col">
            <div>
              <label>Building</label>
              <select value={form.building} onChange={(e) => handleChange('building', e.target.value)}>
                {buildings.map((building) => <option key={building.code} value={building.name}>{building.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="create-location">Room or location</label>
              <input
                id="create-location"
                value={form.location}
                onChange={(e) => handleChange('location', e.target.value)}
                aria-invalid={Boolean(errors.location)}
              />
              {errors.location ? <p className="field-error">{errors.location}</p> : null}
            </div>
          </div>

          <label>Visibility</label>
          <select value={form.visibility} onChange={(e) => handleChange('visibility', e.target.value)}>
            <option>Open to all</option>
            <option>Friends only</option>
          </select>

          <label>Optional note</label>
          <input value={form.note} onChange={(e) => handleChange('note', e.target.value)} placeholder="Bring a laptop, snack, or notebook" />

          <button className="primary-btn" type="submit">Post Event</button>
        </form>
      </section>
    </div>
  );
}
