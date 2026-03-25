import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="auth-page center-page">
      <div className="auth-card wide-card">
        <h1>Campus Connect Plus</h1>
        <p>
          Find campus events, create small student gatherings, and get to the right place without
          guessing where to go.
        </p>
        <div className="button-row">
          <Link className="primary-link button-like" to="/login">Log In</Link>
          <Link className="secondary-link button-like" to="/login">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}
