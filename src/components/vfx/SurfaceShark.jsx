import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import SharkOriginal from '../../assets/Shark_original.json';

const SurfaceShark = ({ onSharkClick }) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(true);
  const lottieRef = useRef();
  const timeoutRef = useRef(null);

  const handleNewPosition = () => {
    setPosition({
      x: Math.random() * 90,
      y: Math.random() * 90,
    });
    setIsVisible(true);
  };

  useEffect(() => {
    if (isVisible) {
      // The Lottie player's onComplete will handle hiding it.
    } else {
      // After it's hidden, wait 3 seconds to show it again.
      timeoutRef.current = setTimeout(handleNewPosition, 3000);
    }

    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, [isVisible]);

  const handleComplete = () => {
    setIsVisible(false);
  };
  
  const handleClick = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
    onSharkClick();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          style={{
            position: 'absolute',
            top: `${position.y}vh`,
            left: `${position.x}vw`,
            width: '150px',
            height: '150px',
            cursor: 'pointer',
            pointerEvents: 'auto',
            zIndex: 100,
          }}
          onClick={handleClick}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={SharkOriginal}
            loop={false}
            onComplete={handleComplete}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SurfaceShark;
