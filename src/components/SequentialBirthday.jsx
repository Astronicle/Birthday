import React, { useState, useRef, useEffect } from 'react';
import music from '../assets/Paradise-Paradise.mp3';
import StarField from './StarField';
import BalloonSpawner from './BalloonSpawner';

const SequentialBirthday = () => {
  const [step, setStep] = useState(0);
  const [lightsOff, setLightsOff] = useState(false);
  const [isDecorated, setIsDecorated] = useState(false);
  const [balloonsActive, setBalloonsActive] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const audioRef = useRef(null);

  const handleNextStep = () => {
    setStep(prevStep => prevStep + 1);
    setIsExiting(false);
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

  const steps = [
    { text: "Turn lights off", action: handleLightsOff },
    { text: "Music time?", action: handleMusic },
    { text: "Decorate", action: handleDecorate },
    { text: "Balloons?", action: handleBalloons },
    { text: "Cake?", action: handleNextStep },
    { text: "A message?", action: handleNextStep }
  ];

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      steps[step].action();
    }, 300);
  };

  const buttonClasses = (step) => {
    if (step === 0) {
      return "bg-white text-black border-black";
    }
    return "bg-transparent text-white border-white";
  };

  return (
    <>
      <div className={`flex justify-center items-center h-screen text-center flex-col transition-colors duration-1000 relative overflow-hidden ${lightsOff ? 'bg-[#23272F] text-white' : 'bg-white text-[#23272F]'}`}>
        <audio ref={audioRef} src={music} loop />
        <StarField isDecorated={isDecorated} />
        <BalloonSpawner active={balloonsActive} />
        {step < steps.length ? (
          <button 
            onClick={handleClick} 
            className={`p-3 m-3 w-40 rounded-2xl text-center transition-transform transform hover:scale-110 relative z-10 border-2 ${buttonClasses(step)} ${isExiting ? 'animate-zoom-in-fade-out' : ''}`}
          >
            {steps[step].text}
          </button>
        ) : (
          <div className="relative z-10 animate-fade-in">
            <h2 className="text-5xl font-bold mb-4">Happy Birthday!</h2>
            <p className="text-2xl">Hope you have a great day!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SequentialBirthday;
