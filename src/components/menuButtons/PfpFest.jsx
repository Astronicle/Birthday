import React, { useEffect } from "react";
import { motion } from "framer-motion";
import TextPressure from "../react-bits/TextPressure";
import ImageTrail from "../react-bits/ImageTrail";

// Import images from assets
import img1 from "../../assets/pfps/1.png";
import img2 from "../../assets/pfps/2.jpg";
import img3 from "../../assets/pfps/3.jpg";
import img4 from "../../assets/pfps/4.jpg";
import img5 from "../../assets/pfps/5.jpg";
import img6 from "../../assets/pfps/6.jpg";
import img7 from "../../assets/pfps/7.png";
import img8 from "../../assets/pfps/8.png";

const PfpFest = ({ onBackButtonClick }) => {
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
        }}
      >
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
        <TextPressure
          text="pfp fest"
          flex
          alpha={false}
          stroke={false}
          width
          weight
          italic
          textColor="#ffffff"
          strokeColor="#5227FF"
          minFontSize={10}
        />
      </motion.div>
      <ImageTrail
        items={[img1, img2, img3, img4, img5, img6, img7, img8]}
        variant="7"
      />
    </div>
  );
};

export default PfpFest;
