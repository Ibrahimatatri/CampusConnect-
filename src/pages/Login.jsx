import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate('/onboarding');
  };

  return (
    <div className="auth-page center-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        <p className="muted">Use your university email to continue.</p>
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="primary-btn" type="submit">Continue</button>
      </form>
    </div>
  );
}
