import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import music from '../assets/Paradise-Paradise.mp3';
import newMusic from '../assets/NightShade.m4a';
import StarField from './StarField';
import BalloonSpawner from './BalloonSpawner';
import CakeRun from './CakeRun';
import MainLanding from './MainLanding';
import SurfaceShark from './SurfaceShark';

const SequentialBirthday = () => {
  const [step, setStep] = useState(0);
  const [lightsOff, setLightsOff] = useState(false);
  const [isDecorated, setIsDecorated] = useState(false);
  const [balloonsActive, setBalloonsActive] = useState(false);
  const [cakeRunActive, setCakeRunActive] = useState(false);
  const [showNewBg, setShowNewBg] = useState(false);
  const [showSharkFin, setShowSharkFin] = useState(false);
  const audioRef = useRef(null);
  const nightShadeAudioRef = useRef(null);

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

  const handleSharkClick = () => {
    setIsDecorated(false);
    setBalloonsActive(false);
    setCakeRunActive(false);
    setShowSharkFin(false);
    
    // Fade out old music
    if (audioRef.current) {
      let volume = audioRef.current.volume;
      const fadeOutInterval = setInterval(() => {
        if (volume > 0.1) {
          volume -= 0.1;
          audioRef.current.volume = volume;
        } else {
          audioRef.current.pause();
          clearInterval(fadeOutInterval);
        }
      }, 100);
    }

    // Fade in new music
    if (nightShadeAudioRef.current) {
      nightShadeAudioRef.current.volume = 0;
      nightShadeAudioRef.current.play().catch(error => console.error("New audio play failed:", error));
      let volume = 0;
      const fadeInInterval = setInterval(() => {
        if (volume < 0.9) {
          volume += 0.1;
          nightShadeAudioRef.current.volume = volume;
        } else {
            nightShadeAudioRef.current.volume = 1;
          clearInterval(fadeInInterval);
        }
      }, 150);
    }


    setTimeout(() => {
        setShowNewBg(true);
    }, 1000); // Wait for animations to finish
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

  useEffect(() => {
    if (!showButton) {
      const timer = setTimeout(() => {
        setShowSharkFin(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showButton]);


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

  const getBgClass = () => {
    if (showNewBg) {
      return 'bg-transparent';
    }
    return lightsOff ? 'bg-[#23272F] text-white' : 'bg-white text-[#23272F]';
  }

  const motionDivExit = { opacity: 0, transition: { duration: 1 } };

  return (
    <>
      <motion.div
        key="birthday-content"
        className={`flex justify-center items-center h-screen text-center flex-col transition-colors duration-1000 relative overflow-hidden ${getBgClass()}`}
      >
        <audio ref={audioRef} src={music} loop />
        <audio ref={nightShadeAudioRef} src={newMusic} loop />

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
      </motion.div>
      
      {showSharkFin && <SurfaceShark onSharkClick={handleSharkClick} />}
      {showNewBg && <MainLanding />}
    </>
  );
};

export default SequentialBirthday;