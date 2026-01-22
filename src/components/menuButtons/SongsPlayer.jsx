import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaMusic } from 'react-icons/fa';
import './SongsPlayer.css';
import song1 from '../../assets/music/daegho-nothing-on-u.mp3';
import song2 from '../../assets/music/parallel-dimension.mp3';
import song3 from '../../assets/music/shes-so-nice-pink-guy.mp3';


const songs = [
  {
    name: 'NOTHING ON U - DAEGHO',
    src: song1,
  },
  {
    name: 'Parallel Dimension - Robopup',
    src: song2,
  },
  {
    name: "She's So Nice - Pink Guy",
    src: song3,
  },
];

const SongsPlayer = ({ onBackButtonClick }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const setAudioData = () => {
        setDuration(audio.duration);
        setCurrentTime(audio.currentTime);
      };

      audio.addEventListener('loadedmetadata', setAudioData);
      audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime));

      return () => {
        audio.removeEventListener('loadedmetadata', setAudioData);
        audio.removeEventListener('timeupdate', () => setCurrentTime(audio.currentTime));
      };
    }
  }, [currentSongIndex]); // Re-run effect when song changes

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    setIsPlaying(true);
  };

  const playPreviousSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex - 1 + songs.length) % songs.length);
    setIsPlaying(true);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="songs-player-container">
      <button
        onClick={onBackButtonClick}
        className="back-button"
      >
        &larr; Back
      </button>
      <div className="songs-player-content">
        <div className="album-art-placeholder">
          <FaMusic />
        </div>
        <h3>Now Playing: {songs[currentSongIndex].name}</h3>
        <audio
          ref={audioRef}
          src={songs[currentSongIndex].src}
          onEnded={playNextSong}
          preload="auto"
        />
        <div className="progress-bar-container">
          <span className="time-display">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="progress-bar"
          />
          <span className="time-display">{formatTime(duration)}</span>
        </div>
        <div className="player-controls">
          <button onClick={playPreviousSong} className="control-button">
            <FaStepBackward />
          </button>
          <button onClick={togglePlayPause} className="control-button">
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={playNextSong} className="control-button">
            <FaStepForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SongsPlayer;
