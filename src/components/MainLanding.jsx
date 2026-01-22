import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import finalBg from "../assets/final_bg.mp4";
import RotatingText from "./react-bits/RotatingText";
import DotGrid from "./react-bits/DotGrid";
import TargetCursor from "./react-bits/TargetCursor";
import MainMenu from "./MainMenu";
import GamerMoment from "./menuButtons/GamerMoment";
import PfpFest from "./menuButtons/PfpFest";
import MessageStats from "./menuButtons/MessageStats";
import Numbers from "./menuButtons/Numbers";
import ColorSelection from "./menuButtons/ColorSelection";
import OtherRandomStuff from "./menuButtons/OtherRandomStuff";
import SongsPlayer from "./menuButtons/SongsPlayer";

const MainLanding = () => {
  const [showRotatingText, setShowRotatingText] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [useTargetCursor, setUseTargetCursor] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRotatingText(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showRotatingText) {
      const timer = setTimeout(() => {
        setUseTargetCursor(true);
        setShowMenu(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showRotatingText]);

  const handleMenuClick = (menuItem) => {
    const componentMap = {
      "pfp fest": "PfpFest",
      "message stats": "MessageStats",
      "gamer moment": "GamerMoment",
      "numbers.": "Numbers",
      "colors...": "Colors",
      "songs????": "SongsPlayer",
      "other random stuff which i couldn't properly classify do not judge i tell u": "OtherRandomStuff",
    };
    const componentName = componentMap[menuItem.toLowerCase()];
    if (componentName) {
      setActiveComponent(componentName);
    } else {
      setActiveComponent("ComingSoon");
    }
  };

  const handleBackButtonClick = () => {
    setActiveComponent(null);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "PfpFest":
        return <PfpFest onBackButtonClick={handleBackButtonClick} />;
      case "GamerMoment":
        return <GamerMoment onBackButtonClick={handleBackButtonClick} />;
      case "MessageStats":
        return <MessageStats onBackButtonClick={handleBackButtonClick} />;
      case "Numbers":
        return <Numbers onBackButtonClick={handleBackButtonClick} />;
      case "Colors":
        return <ColorSelection onBackButtonClick={handleBackButtonClick} />;
      case "OtherRandomStuff":
        return <OtherRandomStuff onBackButtonClick={handleBackButtonClick} />;
      case "SongsPlayer":
        return <SongsPlayer onBackButtonClick={handleBackButtonClick} />;
      case "ComingSoon":
        return (
          <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", color: 'white', backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999, flexDirection: 'column', fontSize: '2rem' }}>
            <p>Coming Soon!</p>
            <button
              onClick={handleBackButtonClick}
              style={{
                marginTop: '20px',
                padding: "10px 20px",
                backgroundColor: "#08F0FF",
                color: "black",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Back to Menu
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {useTargetCursor && showMenu && !activeComponent && <TargetCursor />}
      <motion.video
        src={finalBg}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -2,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0 }}
      />

      {activeComponent ? (
        renderActiveComponent()
      ) : (
        <>
          {showRotatingText && (
            <motion.div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 10.0 }}
            >
              <DotGrid
                dotSize={2}
                gap={10}
                baseColor="#271E37"
                activeColor="#08F0FF"
                proximity={120}
                shockRadius={250}
                shockStrength={5}
                resistance={750}
                returnDuration={1.5}
              />
            </motion.div>
          )}
          {showRotatingText && (
            <motion.div
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                display: "flex",
                alignItems: "center",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0 }}
            >
              <motion.span
                className="text-white text-[clamp(1.5rem,6vw,3rem)] font-bold select-none mr-2"
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.0, delay: 0.2 }}
              >
                Wanna know
              </motion.span>
              <RotatingText
                texts={[
                  "how many messages you sent?",
                  "what pfps you used?",
                  "what games you beat?",
                  "how many gifs you shared?",
                ]}
                mainClassName="px-2 sm:px-2 md:px-3 bg-[#1a1a1a] text-white overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg border border-white text-[clamp(1.5rem,6vw,3rem)] font-bold select-none"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.02}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={1800}
                style={{ 
                boxShadow: "0 0 15px 5px rgba(8, 240, 255, 0.7)", }}
              />
            </motion.div>
          )}
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, perspective: "1000px", rotateY: -90 }}
              animate={{ opacity: 1, perspective: "1000px", rotateY: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: "50%",
                left: "35%",
                transform: "translate(0%, -50%)",
                transformStyle: "preserve-3d",
              }}
            >
              <MainMenu onMenuItemClick={handleMenuClick} />
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default MainLanding;
