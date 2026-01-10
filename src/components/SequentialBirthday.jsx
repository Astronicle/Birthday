import React, { useState, useRef, useEffect } from 'react';
import music from '../assets/Paradise-Paradise.mp3';

const SequentialBirthday = () => {
  const [step, setStep] = useState(0);
  const [lightsOff, setLightsOff] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (lightsOff) {
      document.body.style.backgroundColor = '#23272F';
      document.body.style.color = 'white';
    }

    // Cleanup function to reset styles when the component unmounts
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
        // Autoplay can be blocked by the browser, log error if it happens
        console.error("Audio play failed:", error);
      });
    }
    handleNextStep();
  };

  const steps = [
    { text: "Turn lights off", action: handleLightsOff },
    { text: "Music time?", action: handleMusic },
    { text: "Decorate", action: handleNextStep },
    { text: "Balloons?", action: handleNextStep },
    { text: "Cake?", action: handleNextStep },
    { text: "A message?", action: handleNextStep }
  ];

  return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
        flexDirection: 'column',
        transition: 'background-color 1s, color 1s'
    }}>
      <audio ref={audioRef} src={music} loop />
      {step < steps.length ? (
        <button onClick={steps[step].action} style={{padding: '10px 20px', fontSize: '16px', cursor: 'pointer'}}>
          {steps[step].text}
        </button>
      ) : (
        <div>
          <h2>Happy Birthday!</h2>
          <p>Hope you have a great day!</p>
        </div>
      )}
    </div>
  );
};

export default SequentialBirthday;
