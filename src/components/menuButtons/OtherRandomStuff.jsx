import React from 'react';
import { motion } from 'framer-motion';
import FallingText from '../react-bits/FallingText';
import './OtherRandomStuff.css';

const OtherRandomStuff = ({ onBackButtonClick }) => {
  return (
    <motion.div
      className="other-random-stuff-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="other-random-stuff-content">
        <FallingText
          className="inner-falling-text content-slide-up"
          style={{ animationDelay: '0.4s' }}
          text="pineapple tea monster kiwi horny dagger sniper racoon-plush luna miko genshin hk zzz"
          fontSize="2rem"
          gravity={0.5}
          highlightWords={["horny", "monster", "luna", "miko"]}
          highlightClass="highlighted-word"
        />
        <FallingText
          className="inner-falling-text content-slide-up"
          style={{ animationDelay: '0.6s' }}
          text="hexakosioihexekontahexaphobia scara 1357 911 arson damian sofia kuro jane-doe lights-out twisted-love 69 little-stranger one-piece another frieren"
          fontSize="1.5rem"
          gravity={0.3}
          highlightWords={["hexakosioihexekontahexaphobia", "arson", "69", "jane-doe"]}
          highlightClass="highlighted-word"
        />
      </div>
      <button
        onClick={onBackButtonClick}
        className="back-button cursor-target"
      >
        &larr; Back
      </button>
    </motion.div>
  );
};

export default OtherRandomStuff;
