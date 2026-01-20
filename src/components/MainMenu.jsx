import React from 'react';
import './MainMenu.css';

const menuItems = [
  ["pfp fest", "gamer moment", "message stats", "songs????"],
  ["anime stuff", "colors...", "numbers.", "random stuff"],
  ["other random stuff which i couldn't properly classify do not judge i tell u"]
];

const flatMenuItems = menuItems.flat();

const MainMenu = ({ onPfpFestClick }) => { // Accept onPfpFestClick prop
  return (
    <div className="main-menu-container">
      {flatMenuItems.map((item, index) => (
        <div 
          key={index} 
          className={`menu-item-wrapper ${index === flatMenuItems.length - 1 ? 'menu-item-last' : ''}`}
          onClick={item === 'pfp fest' ? onPfpFestClick : null} // Add onClick for "pfp fest"
        >
          <div className="menu-item cursor-target">
            {item}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainMenu;
