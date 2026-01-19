import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import balloonAnimation from '../../assets/animations/balloon.json';

const Balloon = ({ position, onComplete }) => {
  return (
    <div
      className="animate-float"
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        width: 100,
        height: 100,
        pointerEvents: 'none',
        zIndex: 5
      }}
    >
      <Lottie
        animationData={balloonAnimation}
        autoplay
        loop={false}
        onComplete={onComplete}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

const BalloonSpawner = ({ active }) => {
  const [balloons, setBalloons] = useState([]);
  const timeoutRef = useRef(null);
  const nextIdRef = useRef(0);

  useEffect(() => {
    if (!active) {
      clearTimeout(timeoutRef.current);
      setBalloons([]);
      return;
    }

    const spawn = () => {
      const size = 100;

      setBalloons(prev => [
        ...prev,
        {
          id: nextIdRef.current++,
          position: {
            x: Math.random() * (window.innerWidth - size),
            y: Math.random() * (window.innerHeight - size),
          }
        }
      ]);

      // Natural jitter: short gaps sometimes, long gaps sometimes
      const nextDelay = Math.random() * 1500;
      timeoutRef.current = setTimeout(spawn, nextDelay);
    };

    spawn();

    return () => clearTimeout(timeoutRef.current);
  }, [active]);

  const handleComplete = id => {
    setBalloons(prev => prev.filter(b => b.id !== id));
  };

  return (
    <>
      {balloons.map(b => (
        <Balloon
          key={b.id}
          position={b.position}
          onComplete={() => handleComplete(b.id)}
        />
      ))}
    </>
  );
};

export default BalloonSpawner;
