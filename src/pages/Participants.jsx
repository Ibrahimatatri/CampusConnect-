import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import ParticipantList from '../components/ParticipantList';
import { useApp } from '../context/AppContext';

export default function Participants() {
  const { id } = useParams();
  const { events } = useApp();
  const event = useMemo(() => events.find((item) => item.id === id), [events, id]);

  if (!event) return <div className="page-wrap"><p>Participants unavailable.</p></div>;

  return (
    <div className="page-wrap">
      <section className="panel">
        <div className="section-head">
          <div>
            <h1>Participants</h1>
            <p className="muted">{event.title}</p>
          </div>
          <Link className="secondary-link button-like" to={`/event/${event.id}`}>Back to Event</Link>
        </div>
        <ParticipantList participants={event.participants} />
      </section>
    </div>
  );
}
