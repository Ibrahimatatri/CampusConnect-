import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories, eventSizes } from '../data/categories';
import { useApp } from '../context/AppContext';

export default function Onboarding() {
  const navigate = useNavigate();
  const { completeOnboarding } = useApp();
  const [selectedInterests, setSelectedInterests] = useState(['Tech', 'Study']);
  const [preferredSize, setPreferredSize] = useState('Small');

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]
    );
  };

  const handleFinish = () => {
    completeOnboarding({ interests: selectedInterests, preferredSize });
    navigate('/home');
  };

  return (
    <div className="auth-page center-page">
      <div className="auth-card wide-card">
        <h2>Set your preferences</h2>
        <p className="muted">This helps us show you more relevant events.</p>
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
