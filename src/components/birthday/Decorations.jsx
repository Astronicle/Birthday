import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarField from '../vfx/StarField';
import BalloonSpawner from '../vfx/BalloonSpawner';
import CakeRun from '../vfx/CakeRun';

const Decorations = ({ isDecorated, balloonsActive, cakeRunActive }) => {
  const motionDivExit = { opacity: 0, transition: { duration: 1 } };

  return (
    <>
      <AnimatePresence>
        {isDecorated && (
          <motion.div exit={motionDivExit}>
            <StarField isDecorated={isDecorated} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {balloonsActive && (
          <motion.div exit={motionDivExit}>
            <BalloonSpawner active={balloonsActive} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cakeRunActive && (
          <motion.div exit={motionDivExit}>
            <CakeRun />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Decorations;
