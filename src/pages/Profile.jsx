import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Profile() {
  const { currentUser, savedEventIds, joinedEventIds } = useApp();

  return (
    <div className="page-wrap">
      <section className="panel profile-card">
        <h1>{currentUser.name}</h1>
        <p className="muted">{currentUser.major} · {currentUser.year}</p>
        <p>{currentUser.bio}</p>

        <div className="stats-row">
          <Link className="stat-box stat-box-link" to="/saved">
            <strong>{savedEventIds.length}</strong>
            <span className="stat-label">Saved events</span>
            <span className="stat-help">Bookmarks to revisit</span>
          </Link>
          <Link className="stat-box stat-box-link" to="/joined">
            <strong>{joinedEventIds.length}</strong>
            <span className="stat-label">Joined events</span>
            <span className="stat-help">Sessions you RSVPed to</span>
          </Link>
          <a className="stat-box stat-box-link" href="#interest-tags">
            <strong>{currentUser.interests.length}</strong>
            <span className="stat-label">Interest tags</span>
            <span className="stat-help">Topics below tune recommendations</span>
          </a>
        </div>

        <div className="top-gap" id="interest-tags">
          <h3>Interest tags</h3>
          <div className="interest-grid">
            {currentUser.interests.map((interest) => (
              <span className="chip static-chip" key={interest}>{interest}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
