import React from 'react';
import ASCIIText from '../react-bits/ASCIIText';
import './Numbers.css';

const Numbers = ({ onBackButtonClick }) => {
  return (
    <div className={styles.overlay}>
      <button
        onClick={onBackButtonClick}
        className={`${styles.backButton} cursor-target`}
      >
        &larr; Back
      </button>
      <ASCIIText
        text='911'
        enableWaves
        asciiFontSize={8}
        style={{ color: 'inherit', fontSize: 'inherit' }}
        className={styles.asciiText}
      />
      <div className={styles.message}>
        That's it.
      </div>
    </div>
  );
};

export default Numbers;