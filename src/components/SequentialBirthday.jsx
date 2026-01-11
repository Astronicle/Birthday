import React, { useState, useRef, useEffect } from 'react';
import music from '../assets/Paradise-Paradise.mp3';
import StarField from './StarField';
import BalloonSpawner from './BalloonSpawner';

const SequentialBirthday = () => {
  const [step, setStep] = useState(0);
  const [lightsOff, setLightsOff] = useState(false);
  const [isDecorated, setIsDecorated] = useState(false);
  const [balloonsActive, setBalloonsActive] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (lightsOff) {
      document.body.style.backgroundColor = '#23272F';
      document.body.style.color = 'white';
    }

    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, [lightsOff]);


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

  const steps = [
    { text: "Turn lights off", action: handleLightsOff },
    { text: "Music time?", action: handleMusic },
    { text: "Decorate", action: handleDecorate },
    { text: "Balloons?", action: handleBalloons },
    { text: "Cake?", action: handleNextStep },
    { text: "A message?", action: handleNextStep }
  ];

  return (
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        flexDirection: 'column',
        transition: 'background-color 1s, color 1s',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <audio ref={audioRef} src={music} loop />
        <StarField isDecorated={isDecorated} />
        <BalloonSpawner active={balloonsActive} />
        {step < steps.length ? (
          <button onClick={steps[step].action} style={{padding: '10px 20px', fontSize: '16px', cursor: 'pointer', position: 'relative', zIndex: 10}}>
            {steps[step].text}
          </button>
        ) : (
          <div style={{position: 'relative', zIndex: 10}}>
            <h2>Happy Birthday!</h2>
            <p>Hope you have a great day!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SequentialBirthday;
