import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import finalBg from '../assets/final_bg.mp4';
import RotatingText from './react-bits/RotatingText';
import DotGrid from './react-bits/DotGrid';
import TargetCursor from './react-bits/TargetCursor';
import MainMenu from './MainMenu';

const MainLanding = () => {
  const [showRotatingText, setShowRotatingText] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [useTargetCursor, setUseTargetCursor] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRotatingText(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showRotatingText) {
      const timer = setTimeout(() => {
        setUseTargetCursor(true);
        setShowMenu(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showRotatingText]);

  return (
    <div>
      {useTargetCursor && <TargetCursor />}
      <motion.video
        src={finalBg}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -2, // Behind other content
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
      />
      {showRotatingText && (
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 10.0 }}
        >
          <DotGrid
            dotSize={4}
            gap={10}
            baseColor="#271E37"
            activeColor="#08F0FF"
            proximity={120}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
        </motion.div>
      )}
      {showRotatingText && (
        <motion.div 
          style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', alignItems: 'center' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
        >
          <motion.span 
            className="text-white text-[clamp(1.5rem,6vw,3rem)] font-bold select-none mr-2"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.0, delay: 0.2 }}
          >
            Wanna know 
          </motion.span>
          <RotatingText
            texts={['how many messages you sent?', 'what pfps you used?', 'what games you beat?', 'how many gifs you shared?']}
            mainClassName="px-2 sm:px-2 md:px-3 bg-[#1a1a1a] text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg border border-white text-[clamp(1.5rem,6vw,3rem)] font-bold select-none"
            staggerFrom={'last'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-120%' }}
            staggerDuration={0.020}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            rotationInterval={1800}
          />
        </motion.div>
      )}
      {showMenu && (
        <motion.div
          initial={{ opacity: 0, perspective: '1000px', rotateY: -90 }}
          animate={{ opacity: 1, perspective: '1000px', rotateY: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '35%', // Moved to 35% from the left
            transform: 'translate(0%, -50%)', // Adjusted transform for new left position
            transformStyle: 'preserve-3d',
          }}
        >
          <MainMenu />
        </motion.div>
      )}
    </div>
  );
};

export default MainLanding;
