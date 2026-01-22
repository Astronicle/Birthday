import React from 'react';
import ShapeBlur from '../react-bits/ShapeBlur';
import './ColorSelection.css';

const ColorSelection = ({ onBackButtonClick }) => {
  const shapeBlurProps = {
    pixelRatioProp: window.devicePixelRatio || 1,
    shapeSize: 1,
    roundness: 0.5,
    borderSize: 0.05,
    circleSize: 0.25,
    circleEdge: 1,
    style: { width: '100px', height: '100px' }
  };

  return (
    <div className="color-selection-container">
      <div className="color-selection-content">
        <div className="color-selection-item">
          <ShapeBlur variation={1} {...shapeBlurProps} color="#9B080A" />
          <p>blood red</p>
        </div>

        <div className="color-selection-item">
          <ShapeBlur variation={1} {...shapeBlurProps} color="#8FFFF6" />
          <p>cerydra flame blue</p>
        </div>

        <div className="color-selection-item">
          <ShapeBlur variation={1} {...shapeBlurProps} color="#453481" />
          <p>raiden purple</p>
        </div>
      </div>

      <button onClick={onBackButtonClick} className="back-button cursor-target">
        &larr; Back
      </button>
    </div>
  );
};

export default ColorSelection;
