import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, eventSizes } from '../data/categories';
import { useApp } from '../context/AppContext';

export default function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding, currentUser, showToast } = useApp();
  const [displayName, setDisplayName] = useState(currentUser.name);
  const [selectedInterests, setSelectedInterests] = useState(['Tech', 'Study']);
  const [preferredSize, setPreferredSize] = useState('Small');

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]
    );
  };

  const handleFinish = () => {
    const name = displayName.trim() || currentUser.name;
    completeOnboarding({
      interests: selectedInterests,
      preferredSize,
      name
    });
    showToast('Preferences saved. You are ready to explore events.');
    navigate('/home');
  };

  return (
    <div className="auth-page center-page">
      <div className="auth-card wide-card">
        <h2>Set your preferences</h2>
        <p className="muted">This helps us show you more relevant events.</p>
        <label htmlFor="display-name">What should we call you?</label>
        <input
          id="display-name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Name or nickname"
          autoComplete="name"
        />
        <p className="hint">We use this on your home screen and profile so it matches who is signed in.</p>
        <div className="interest-grid">
          {categories.map((category) => (
            <button
              key={category}
              className={selectedInterests.includes(category) ? 'chip active' : 'chip'}
              onClick={() => toggleInterest(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
        <div className="size-block">
          <label>Preferred event size</label>
          <div className="button-row wrap-row">
            {eventSizes.map((size) => (
              <button
                key={size}
                type="button"
                className={preferredSize === size ? 'chip active' : 'chip'}
                onClick={() => setPreferredSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <button className="primary-btn" onClick={handleFinish}>Finish Setup</button>
      </div>
    </div>
  );
}
