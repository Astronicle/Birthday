import React, { useState, useRef } from 'react';
import CountUp from '../react-bits/CountUp';
import './MessageStats.css';
import { BsChatDots, BsTelephone, BsActivity, BsGift, BsEmojiNeutral } from 'react-icons/bs';
import { FaGhost } from 'react-icons/fa';

const stats = [
  {
    icon: <BsChatDots />,
    value: 127370,
    label: "messages sent",
  },
  {
    icon: <BsTelephone />,
    value: 1091,
    label: "hours in voice call",
  },
  {
    icon: <BsActivity />,
    value: 8.0588235294118,
    label: "activity changes per day",
  },
  {
    icon: <BsGift />,
    value: 570,
    label: "gifs shared",
  },
  {
    icon: <BsEmojiNeutral />,
    value: 91,
    label: "shrugs",
  },
  {
    icon: <FaGhost />,
    value: 21,
    label: "ghosts",
  },
];

const MessageStats = ({ onBackButtonClick }) => {
  const [showYearText, setShowYearText] = useState(false);
  const animationsFinished = useRef(0);

  const handleAnimationEnd = () => {
    animationsFinished.current += 1;
    if (animationsFinished.current === stats.length) {
      setShowYearText(true);
    }
  };

  return (
    <div className="message-stats-container">
      <div className="message-stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">
              <CountUp 
                to={stat.value} 
                duration={3} 
                onEnd={handleAnimationEnd}
              />
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>
      {showYearText && (
        <div className="year-text">
          all in a year-
        </div>
      )}
      <button
        onClick={onBackButtonClick}
        className="back-button cursor-target"
      >
        &larr; Back
      </button>
    </div>
  );
};

export default MessageStats;
