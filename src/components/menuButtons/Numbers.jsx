import React from 'react';
import ASCIIText from '../react-bits/ASCIIText';
import './Numbers.css';

const Numbers = ({ onBackButtonClick }) => {
  return (
    <div className="overlay">
      <button
        onClick={onBackButtonClick}
        className={"backButton cursor-target"}
      >
        &larr; Back
      </button>
      <ASCIIText
        text='911'
        enableWaves
        asciiFontSize={8}
        style={{ color: 'inherit', fontSize: 'inherit' }}
        className="asciiText"
      />
      <div className="message">
        That's it.
      </div>
    </div>
  );
};

export default Numbers;