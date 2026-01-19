import React from 'react';
import music from '../../assets/Paradise-Paradise.mp3';
import newMusic from '../../assets/NightShade.m4a';

const MusicPlayer = ({ audioRef, nightShadeAudioRef }) => {
  return (
    <>
      <audio ref={audioRef} src={music} loop />
      <audio ref={nightShadeAudioRef} src={newMusic} loop />
    </>
  );
};

export default MusicPlayer;

