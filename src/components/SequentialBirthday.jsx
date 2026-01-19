import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLanding from './MainLanding';
import SurfaceShark from './vfx/SurfaceShark';
import BirthdayStep from './birthday/BirthdayStep';
import BirthdayMessage from './birthday/BirthdayMessage';
import Decorations from './birthday/Decorations';
import MusicPlayer from './birthday/MusicPlayer';

const SequentialBirthday = () => {
  const [step, setStep] = useState(0);
  const [lightsOff, setLightsOff] = useState(false);
  const [isDecorated, setIsDecorated] = useState(false);
  const [balloonsActive, setBalloonsActive] = useState(false);
  const [cakeRunActive, setCakeRunActive] = useState(false);
  const [showNewBg, setShowNewBg] = useState(false);
  const [showSharkFin, setShowSharkFin] = useState(false);
  const [showBirthdayMessage, setShowBirthdayMessage] = useState(true);
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
    setTimeout(() => {
      setShowBirthdayMessage(false);
    }, 4000);
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

  const getBgClass = () => {
    if (showNewBg) {
      return 'bg-transparent';
    }
    return lightsOff ? 'bg-[#23272F] text-white' : 'bg-white text-[#23272F]';
  }

  return (
    <>
      <motion.div
        key="birthday-content"
        className={`flex justify-center items-center h-screen text-center flex-col transition-colors duration-1000 relative overflow-hidden ${getBgClass()}`}
      >
        <MusicPlayer audioRef={audioRef} nightShadeAudioRef={nightShadeAudioRef} />
        
        <Decorations 
          isDecorated={isDecorated}
          balloonsActive={balloonsActive}
          cakeRunActive={cakeRunActive}
        />

        <AnimatePresence mode="wait">
          {showButton && (
            <BirthdayStep
              key="step-button"
              step={step}
              steps={steps}
              handleClick={handleClick}
              buttonClasses={buttonClasses}
            />
          )}
          {!showButton && showBirthdayMessage && (
            <BirthdayMessage key="birthday-message" />
          )}
        </AnimatePresence>
      </motion.div>
      
      {showSharkFin && <SurfaceShark onSharkClick={handleSharkClick} />}
      {showNewBg && <MainLanding />}
    </>
  );
};

export default SequentialBirthday;