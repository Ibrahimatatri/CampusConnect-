import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function MapNavigation() {
  const { id } = useParams();
  const { events } = useApp();
  const event = useMemo(() => events.find((item) => item.id === id), [events, id]);

  if (!event) return <div className="page-wrap"><p>Map unavailable.</p></div>;

  return (
    <div className="page-wrap map-layout">
      <section className="map-card">
        <h1>{event.building}</h1>
        <p className="muted">Destination: {event.location}</p>
        <div className="fake-map">
          <div className="map-dot start">You are here</div>
          <div className="map-path"></div>
          <div className="map-dot end">{event.location}</div>
        </div>
      </section>

      <section className="panel route-panel">
        <h3>Route steps</h3>
        <ol>
          <li>Leave the current hallway and head toward the main connector.</li>
          <li>Follow signs toward {event.building}.</li>
          <li>Enter the building through the main student entrance.</li>
          <li>Continue to {event.location}.</li>
        </ol>
        <p className="muted small">Indoor navigation is approximate in this prototype.</p>
        <Link className="secondary-link button-like" to={`/event/${event.id}`}>Back to Event</Link>
      </section>
    </div>
  );
}
