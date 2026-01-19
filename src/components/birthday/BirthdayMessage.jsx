import React from 'react';
import { motion } from 'framer-motion';

const BirthdayMessage = () => {
  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <motion.div
      className="relative z-10"
      variants={messageVariants}
      initial="initial"
      animate="animate"
    >
      <h2 className="text-5xl font-bold mb-4">Happy Birthday!</h2>
      <p className="text-2xl">Hope you have a great day!</p>
    </motion.div>
  );
};

export default BirthdayMessage;
