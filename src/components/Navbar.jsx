import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export default function Navbar() {
  const { logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="brand">Campus Connect Plus</div>
      <div className="nav-links">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/create">Create Event</NavLink>
        <NavLink to="/saved">Saved</NavLink>
        <NavLink to="/joined">Joined</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/settings">Settings</NavLink>
        <button className="ghost-btn" onClick={handleLogout}>Log Out</button>
      </div>
    </nav>
  );
}
