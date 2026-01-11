import { useState } from 'react';
import './fakeout.css';

function FakeoutLanding({ onNext }) {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [exiting, setExiting] = useState(false);

  const handleNoHover = () => {
    const newTop = Math.random() * (window.innerHeight - 100);
    const newLeft = Math.random() * (window.innerWidth - 100);
    setNoButtonPosition({ top: newTop, left: newLeft });
  };

  const handleYesClick = () => {
    setExiting(true);
  };

  const handleAnimationEnd = () => {
    if (exiting) {
      onNext();
    }
  };

  return (
    <div 
      className={`min-h-screen flex flex-col justify-center items-center bg-white text-[#23272F] ${exiting ? 'animate-fade-out' : 'animate-fade-in'}`}
      onAnimationEnd={handleAnimationEnd}
    >
      <div className="flex flex-col items-center p-5 mb-6 text-center rounded-2xl">
        <h1 className="text-4xl font-bold">Wanna see what I made?</h1>
      </div>
      <div className="flex flex-row justify-center">
        <button
          className="p-3 m-3 bg-emerald-300 w-30 rounded-2xl text-center transition-transform transform hover:scale-110"
          onClick={handleYesClick}>
          Yes
        </button>
        <button
          className="p-3 m-3 bg-red-400 w-30 rounded-2xl text-center transition-all"
          style={{ position: 'relative', top: noButtonPosition.top, left: noButtonPosition.left }}
          onMouseEnter={handleNoHover}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default FakeoutLanding;
