import React from 'react';
import { motion } from 'framer-motion';
import finalBg from '../assets/final_bg.mp4';

const MainLanding = () => {
  return (
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
        zIndex: -1, // Behind other content
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
};

export default MainLanding;
