import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Shuffle from '../react-bits/Shuffle';
import GameCard from './GameCard';
import './GamerMoment.css';

// Image Imports
// Already Gamed
import HollowKnight from '../../assets/games/already_gamed/HollowKnight.jpg';
import MovingOut2 from '../../assets/games/already_gamed/MovingOut2.png';
import Peak from '../../assets/games/already_gamed/Peak.jpg';
import PicoPark from '../../assets/games/already_gamed/PicoPark.jpg';
import PicoPark2 from '../../assets/games/already_gamed/PicoPark2.jpg';
import RvThereYet from '../../assets/games/already_gamed/RvThereYet.png';

// Continue
import HollowKnightSilksong from '../../assets/games/continue/HollowKnightSilksong.jpg';
import Overcooked2 from '../../assets/games/continue/Overcooked2.png';
import SuperMario3DWorld from '../../assets/games/continue/SuperMario3DWorld.jpg';
import Undertale from '../../assets/games/continue/Undertale.jpg';

// Mastered
import Genshin from '../../assets/games/mastered/Genshin.png';
import HonkaiStarRail from '../../assets/games/mastered/HonkaiStarRail.png';
import ZenlessZoneZero from '../../assets/games/mastered/ZenlessZoneZero.jpg';

// To Do Next
import Celeste from '../../assets/games/to_do_next/Celeste.jpg';
import Deltarune from '../../assets/games/to_do_next/Deltarune.png';
import ItTakesTwo from '../../assets/games/to_do_next/ItTakesTwo.png';
import Repo from '../../assets/games/to_do_next/Repo.png';

const games = {
  alreadyGaming: [
    { image: HollowKnight, description: 'A classic metroidvania with a beautiful art style.' },
    { image: MovingOut2, description: 'A chaotic and fun physics-based moving simulator.' },
    { image: Peak, description: 'A challenging platformer with a focus on precision.' },
    { image: PicoPark, description: 'A cooperative puzzle game that will test your friendships.' },
    { image: PicoPark2, description: 'More cooperative puzzle fun.' },
    { image: RvThereYet, description: 'A road trip adventure with a narrative focus.' },
  ],
  mastered: [
    { image: Genshin, description: 'An open-world action RPG with a gacha system.' },
    { image: HonkaiStarRail, description: 'A turn-based RPG with a sci-fi setting.' },
    { image: ZenlessZoneZero, description: 'A futuristic action RPG with a stylish art style.' },
  ],
  continue: [
    { image: HollowKnightSilksong, description: 'The highly anticipated sequel to Hollow Knight.' },
    { image: Overcooked2, description: 'More chaotic cooking action.' },
    { image: SuperMario3DWorld, description: 'A classic 3D Mario platformer.' },
    { image: Undertale, description: 'An RPG where you don\'t have to kill anyone.' },
  ],
  toDoNext: [
      { image: Celeste, description: 'A challenging platformer with a story about mental health.' },
      { image: Deltarune, description: 'The next game from the creator of Undertale.' },
      { image: ItTakesTwo, description: 'A cooperative-only adventure.' },
      { image: Repo, description: 'A game about managing a repository.' },
  ]
};

const GamerMoment = ({ onBackButtonClick }) => {
  const [nextGame, setNextGame] = useState(null);
  const nextGameRef = useRef(null);

  const handleNextGame = () => {
    const randomIndex = Math.floor(Math.random() * games.toDoNext.length);
    setNextGame(games.toDoNext[randomIndex]);
  };

  useEffect(() => {
    if (nextGame && nextGameRef.current) {
      nextGameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [nextGame]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.7)',
        overflowY: 'auto',
      }}
    >
      <div className="gamer-moment">
        <button onClick={onBackButtonClick} className="back-button cursor-target">
          &larr; Back
        </button>
        <Shuffle text="gaming" className="gamer-moment-title" loop="true" loopDelay="10" />

        <div className="game-category">
          <h2>already gaming</h2>
          <div className="game-list">
            {games.alreadyGaming.map((game, index) => (
              <GameCard key={index} image={game.image} description={game.description} />
            ))}
          </div>
        </div>

        <div className="game-category">
          <h2>mastered</h2>
          <div className="game-list">
            {games.mastered.map((game, index) => (
              <GameCard key={index} image={game.image} description={game.description} />
            ))}
          </div>
        </div>

        <div className="game-category">
          <h2>continue?</h2>
          <div className="game-list">
            {games.continue.map((game, index) => (
              <GameCard key={index} image={game.image} description={game.description} />
            ))}
          </div>
        </div>

        <div className="to-do-next">
          <button onClick={handleNextGame} className="to-do-next-button cursor-target">
            to do next
          </button>
          {nextGame && (
            <motion.div
              ref={nextGameRef}
              className="next-game-display"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3>Your next challenge:</h3>
              <GameCard image={nextGame.image} description={nextGame.description} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamerMoment;