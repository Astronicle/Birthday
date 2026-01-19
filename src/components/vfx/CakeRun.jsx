import React, { useState, useEffect, useCallback } from 'react';
import Lottie from 'lottie-react';
import cakeAnimation from '../../assets/animations/CAKERUN.json';
import './CakeRun.css';

const CakeInstance = ({ cake, onAnimationEnd }) => {
  const { id, from, top, speed } = cake;
  const isRight = from === 'right';

  const style = {
    top: `${top}vh`,
    left: isRight ? 'auto' : '0',
    right: isRight ? '0' : 'auto',
    animationDuration: `${speed}s`,
    transform: isRight ? 'scaleX(-1)' : 'scaleX(1)',
  };

  const handleAnimationEnd = () => {
    onAnimationEnd(id);
  };

  return (
    <div
      className={`cake-instance ${isRight ? 'move-right-to-left' : 'move-left-to-right'}`}
      style={style}
      onAnimationEnd={handleAnimationEnd}
    >
      <Lottie
        animationData={cakeAnimation}
        loop
        autoplay
        style={{ width: '100px', height: '100px' }}
      />
    </div>
  );
};

const CakeRun = () => {
  const [cakes, setCakes] = useState([]);



  const handleAnimationEnd = useCallback((id) => {
    setCakes(prevCakes => prevCakes.filter(cake => cake.id !== id));
  }, []);

  useEffect(() => {
    const spawnCake = () => {
        setCakes(prevCakes => {
            if (prevCakes.length < 4) {
                const id = Date.now() + Math.random();
                const from = Math.random() < 0.5 ? 'left' : 'right';
                const top = Math.random() * 90;
                const speed = 5;
                return [...prevCakes, { id, from, top, speed }];
            }
            return prevCakes;
        });
    };

    const interval = setInterval(spawnCake, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cake-container">
      {cakes.map(cake => (
        <CakeInstance key={cake.id} cake={cake} onAnimationEnd={handleAnimationEnd} />
      ))}
    </div>
  );
};

export default CakeRun;
