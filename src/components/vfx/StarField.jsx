import React, { useState, useEffect } from 'react';
import starImg from '../../assets/decor/star.png';

const starColors = [
  '#FFFFFF',
  '#FFD700',
  '#FFB6C1',
  '#ADD8E6',
  '#E6E6FA',
];

const generateStar = (id) => ({
  id,
  x: Math.random() * 100,
  y: Math.random() * 100,
  scale: 0.3 + Math.random() * 0.7,
  opacity: 0.4 + Math.random() * 0.6,
  duration: 15 + Math.random() * 20,
  delay: Math.random() * 5,
  driftX: -50 + Math.random() * 100,
  driftY: -50 + Math.random() * 100,
  rotationDuration: 3 + Math.random() * 7,
  rotationDirection: Math.random() > 0.5 ? 1 : -1,
  entranceDelay: id * 0.15 + Math.random() * 0.5,
  color: starColors[Math.floor(Math.random() * starColors.length)],
});

const StarField = ({ isDecorated }) => {
  const [stars] = useState(() => {
    const starCount = 30;
    return Array.from({ length: starCount }, (_, i) => generateStar(i));
  });

  const [visibleStars, setVisibleStars] = useState(new Set());

  useEffect(() => {
    if (!isDecorated) {
      setVisibleStars(new Set());
      return;
    }

    const timeouts = stars.map((star, idx) =>
      setTimeout(() => {
        setVisibleStars(prev => new Set([...prev, idx]));
      }, star.entranceDelay * 1000)
    );

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isDecorated, stars]);

  const getStarFloatAnimation = (star) => {
    const rotationsPerCycle = star.duration / star.rotationDuration;
    return `
      @keyframes starFloat${star.id} {
        0% {
          transform: translate(0, 0) scale(1) rotate(0deg);
        }
        25% {
          transform: translate(${star.driftX * 0.5}px, ${star.driftY * 0.5}px) scale(1.1) rotate(${90 * rotationsPerCycle * star.rotationDirection}deg);
        }
        50% {
          transform: translate(${star.driftX}px, ${star.driftY}px) scale(0.95) rotate(${180 * rotationsPerCycle * star.rotationDirection}deg);
        }
        75% {
          transform: translate(${star.driftX * 0.7}px, ${star.driftY * 0.7}px) scale(1.05) rotate(${270 * rotationsPerCycle * star.rotationDirection}deg);
        }
        100% {
          transform: translate(0, 0) scale(1) rotate(${360 * rotationsPerCycle * star.rotationDirection}deg);
        }
      }
    `;
  };

  const starStyles = isDecorated ? `
    @keyframes starEnter {
      0% {
        opacity: 0;
        transform: scale(0) rotate(0deg);
      }
      50% {
        transform: scale(1.2) rotate(180deg);
      }
      100% {
        opacity: 1;
        transform: scale(1) rotate(360deg);
      }
    }
    ${stars.map(getStarFloatAnimation).join('')}
    ${stars.map(star => {
    const glowIntensity = star.opacity * 0.6;
    const glowIntensity2 = glowIntensity * 0.5;
    return `
        .star-${star.id} {
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, ${glowIntensity})) drop-shadow(0 0 8px ${star.color.replace(')', ` , ${glowIntensity2})`)});
          animation: starEnter 0.6s ease-out forwards, starFloat${star.id} ${star.duration}s ease-in-out infinite;
          animation-delay: 0s, 0.6s;
        }
      `;
  }).join('')}
  ` : '';

  return (
    <>
      <style>{starStyles}</style>
      {isDecorated && (
        <>
          {stars.map((star, idx) => {
            const isVisible = visibleStars.has(idx);

            if (!isVisible) {
              return null;
            }

            return (
              <img
                key={star.id}
                src={starImg}
                alt=""
                className={`star-${star.id}`}
                style={{
                  position: 'fixed',
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                  width: `${20 * star.scale}px`,
                  height: `${20 * star.scale}px`,
                  opacity: star.opacity,
                  pointerEvents: 'none',
                  zIndex: 1,
                  filter: `hue-rotate(${Math.random() * 360}deg) brightness(1.5)`,
                }}
              />
            );
          })}
        </>
      )}
    </>
  );
};

export default StarField;