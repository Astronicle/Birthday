import { useRef, useState } from "react";
import music from "../assets/Paradise-Paradise.mp3";

function MusicButton() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleMusic = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <button onClick={toggleMusic}>
        {isPlaying ? "Pause Music" : "Play Music"}
      </button>

      <audio
        ref={audioRef}
        src={music}
        loop
        preload="auto"
      />
    </>
  );
}

export default MusicButton