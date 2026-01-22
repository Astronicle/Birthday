import React from 'react';
import ASCIIText from '../react-bits/ASCIIText';

const Numbers = ({ onBackButtonClick }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: 9999,
      backgroundColor: 'rgba(0,0,0,0.7)',
      display: 'flex',
      flexDirection: 'column', // Set flex direction to column
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontFamily: 'monospace',
      paddingTop: '2rem' // Add padding to push content down a bit from the top
    }}>
      <button
        onClick={onBackButtonClick}
        style={{
          position: 'absolute',
          top: '2rem',
          left: '2rem',
          backgroundColor: '#1a1a1a',
          border: '1px solid #333',
          color: '#fff',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          borderRadius: '5px',
          transition: 'all 0.3s ease',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
          zIndex: 10000,
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#08F0FF';
          e.target.style.color = '#1a1a1a';
          e.target.style.boxShadow = '0 0 20px rgba(8, 240, 255, 0.8)';
          e.target.style.borderColor = '#08F0FF';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#1a1a1a';
          e.target.style.color = '#fff';
          e.target.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
          e.target.style.borderColor = '#333';
        }}
        className="cursor-target"
      >
        &larr; Back
      </button>
      <ASCIIText
        text='911'
        enableWaves
        asciiFontSize={8}
        style={{ color: '#0F0', fontSize: '2em' }}
      />
      <div style={{ color: '#0F0', fontSize: '1em', marginTop: '10px' }}>
        That's it.
      </div>
    </div>
  );
};

export default Numbers;