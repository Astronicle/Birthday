import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import music from '../assets/Paradise-Paradise.mp3';
import StarField from './StarField';
import BalloonSpawner from './BalloonSpawner';
import CakeRun from './CakeRun';

const SequentialBirthday = () => {
  const [step, setStep] = useState(0);
  const [lightsOff, setLightsOff] = useState(false);
  const [isDecorated, setIsDecorated] = useState(false);
  const [balloonsActive, setBalloonsActive] = useState(false);
  const [cakeRunActive, setCakeRunActive] = useState(false);
  const audioRef = useRef(null);

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const handleLightsOff = () => {
    setLightsOff(true);
    handleNextStep();
  };

  const handleMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Audio play failed:", error);
      });
    }
    handleNextStep();
  };

  const handleDecorate = () => {
    setIsDecorated(true);
    handleNextStep();
  };

  const handleBalloons = () => {
    setBalloonsActive(true);
    handleNextStep();
  };

  const handleCakeRun = () => {
    setCakeRunActive(true);
    handleNextStep();
  };

  const steps = [
    { text: "Turn lights off", action: handleLightsOff },
    { text: "Music time?", action: handleMusic },
    { text: "Decorate", action: handleDecorate },
    { text: "Balloons?", action: handleBalloons },
    { text: "Cake?", action: handleCakeRun },
    { text: "A message?", action: handleNextStep }
  ];

  const handleClick = () => {
    steps[step].action();
  };

  const buttonClasses = (step) => {
    if (step === 0) {
      return "bg-white text-black border-black";
    }
    return "bg-transparent text-white border-white";
  };

  const showButton = step < steps.length;

  const buttonVariants = {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 1.5, transition: { duration: 0.3 } },
    hover: { scale: 1.1 }
  };

  const messageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
  };

  return (
    <>
      <div className={`flex justify-center items-center h-screen text-center flex-col transition-colors duration-1000 relative overflow-hidden ${lightsOff ? 'bg-[#23272F] text-white' : 'bg-white text-[#23272F]'}`}>
        <audio ref={audioRef} src={music} loop />
        <StarField isDecorated={isDecorated} />
        <BalloonSpawner active={balloonsActive} />
        {cakeRunActive && <CakeRun />}
        <AnimatePresence mode="wait">
          {showButton ? (
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
          ) : (
            step >= steps.length && (
              <motion.div
                className="relative z-10"
                variants={messageVariants}
                initial="initial"
                animate="animate"
              >
                <h2 className="text-5xl font-bold mb-4">Happy Birthday!</h2>
                <p className="text-2xl">Hope you have a great day!</p>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SequentialBirthday;
