import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, eventSizes } from '../data/categories';
import { buildings } from '../data/buildings';
import { useApp } from '../context/AppContext';

export default function CreateEvent() {
  const navigate = useNavigate();
  const { createEvent, currentUser } = useApp();

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
    const newEvent = {
      id: `e${Date.now()}`,
      title: form.title,
      category: form.category,
      size: form.size,
      date: form.date || 'TBD',
      time: form.time || 'TBD',
      location: form.location,
      building: form.building,
      description: `${form.description}${form.note ? ` What to bring: ${form.note}.` : ''}`,
      audience: form.visibility,
      attendeeCount: 1,
      host: `${currentUser.name} · Student-led`,
      today: false,
      participants: [{ id: currentUser.id, name: currentUser.name, tags: currentUser.interests, friend: false }]
    };

    createEvent(newEvent);
    navigate('/home');
  };

  return (
    <div className="page-wrap">
      <section className="panel form-panel">
        <h1>Create a Student Event</h1>
        <p className="muted">Keep it simple. A quick study session or hangout is enough.</p>
        <form className="stack-form" onSubmit={handleSubmit}>
          <label>Title</label>
          <input value={form.title} onChange={(e) => handleChange('title', e.target.value)} required />

          <label>Description</label>
          <textarea value={form.description} onChange={(e) => handleChange('description', e.target.value)} required />

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
              <label>Date</label>
              <input type="text" placeholder="Apr 18" value={form.date} onChange={(e) => handleChange('date', e.target.value)} required />
            </div>
            <div>
              <label>Time</label>
              <input type="text" placeholder="6:00 PM" value={form.time} onChange={(e) => handleChange('time', e.target.value)} required />
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
              <label>Room or location</label>
              <input value={form.location} onChange={(e) => handleChange('location', e.target.value)} required />
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
