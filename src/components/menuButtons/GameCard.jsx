import React from 'react';
import ElectricBorder from '../react-bits/ElectricBorder';
import './GameCard.css';

const GameCard = ({ image, description }) => {
  return (
    <div className="game-card">
      <ElectricBorder color="#7df9ff" speed={1} chaos={0.12} thickness={2} style={{ borderRadius: 16 }}>
        <div className="game-card-content">
          <img src={image} alt={description} className="game-card-image" />
          <p className="game-card-description">{description}</p>
        </div>
      </ElectricBorder>
    </div>
  );
};

export default GameCard;
