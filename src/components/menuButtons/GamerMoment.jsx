import React, { useEffect } from "react";
import { motion } from "framer-motion";

const GamerMoment = ({ onBackButtonClick }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "m" || event.key === "M") {
        onBackButtonClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onBackButtonClick]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.7)",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white"
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1,
          flexDirection: 'column',
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>Gamer Moment</h1>
        <button
          onClick={onBackButtonClick}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            padding: "10px 20px",
            backgroundColor: "#08F0FF",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            zIndex: 10,
            fontWeight: "bold",
          }}
        >
          Back to Menu
        </button>
      </motion.div>
    </div>
  );
};

export default GamerMoment;
