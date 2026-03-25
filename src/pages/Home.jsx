import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import { useApp } from '../context/AppContext';
import { getRecommendedEvents } from '../utils/recommend';

export default function Home() {
  const { currentUser, events, savedEventIds, saveEvent, unsaveEvent } = useApp();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const recommended = useMemo(() => getRecommendedEvents(events, currentUser), [events, currentUser]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.location.toLowerCase().includes(search.toLowerCase()) ||
        event.building.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = activeFilter === 'All' || event.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [events, search, activeFilter]);

  const toggleSave = (id) => {
    if (savedEventIds.includes(id)) unsaveEvent(id);
    else saveEvent(id);
  };

  return (
    <div className="page-wrap">
      <section className="hero-strip">
        <div>
          <h1>Welcome back, {currentUser.name}</h1>
          <p className="muted">Discover events that fit your interests and feel easier to join.</p>
        </div>
        <div className="hero-actions">
          <Link className="primary-link button-like" to="/create">Create Event</Link>
          <Link className="secondary-link button-like" to="/saved">Saved Events</Link>
        </div>
      </section>

      <section className="panel">
        <SearchBar value={search} onChange={setSearch} />
        <FilterPanel active={activeFilter} setActive={setActiveFilter} />
      </section>

      <section className="panel">
        <div className="section-head">
          <h2>Recommended for you</h2>
          <span className="muted">Based on your interests and preferred event size</span>
        </div>
        <div className="card-grid">
          {recommended.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              saved={savedEventIds.includes(event.id)}
              onSaveToggle={toggleSave}
            />
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="section-head">
          <h2>All upcoming events</h2>
          <Link className="text-link" to="/saved">View saved</Link>
        </div>
        <div className="card-grid">
          {filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              saved={savedEventIds.includes(event.id)}
              onSaveToggle={toggleSave}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
