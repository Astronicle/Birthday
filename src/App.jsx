import { useState, useEffect } from 'react'
// import MusicButton from './components/MusicButton.jsx'
import FakeoutLanding from './components/FakeoutLanding.jsx'
import DisplayBoard from './components/DisplayBoard.jsx'
import SequentialBirthday from './components/SequentialBirthday.jsx'

function App() {
  const [stage, setStage] = useState('fakeout');

  useEffect(() => {
    if (stage === 'display') {
      const timer = setTimeout(() => {
        setStage('sequential');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleNext = () => {
    setStage('display');
  };

  return (
    <>
      {/* <MusicButton /> */}
      {stage === 'fakeout' && <FakeoutLanding onNext={handleNext} />}
      {stage === 'display' && <DisplayBoard />}
      {stage === 'sequential' && <SequentialBirthday />}
    </>
  )
}

export default App
