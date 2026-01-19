import React from 'react';
import { motion } from 'framer-motion';

const BirthdayStep = ({ step, steps, handleClick, buttonClasses }) => {
  const buttonVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 1.5, transition: { duration: 0.3 } },
    hover: { scale: 1.1 }
  };

  return (
    <motion.button
      key={step}
      onClick={handleClick}
      className={`p-3 m-3 w-40 rounded-2xl text-center relative z-10 border-2 ${buttonClasses(step)}`}
      variants={buttonVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover="hover"
    >
      {steps[step].text}
    </motion.button>
  );
};

export default BirthdayStep;
