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
          <div className="stat-box">
            <strong>{savedEventIds.length}</strong>
            <span>Saved</span>
          </div>
          <div className="stat-box">
            <strong>{joinedEventIds.length}</strong>
            <span>Joined</span>
          </div>
          <div className="stat-box">
            <strong>{currentUser.interests.length}</strong>
            <span>Interests</span>
          </div>
        </div>

        <div className="top-gap">
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
