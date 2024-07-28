import React, { useState } from "react";
import cofreGif from "../assets/logoanimada.gif";

const GifComponent = ({ onGifEnd }) => {
  const [gifLoaded, setGifLoaded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleGifLoad = () => {
    setGifLoaded(true);
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(onGifEnd, 1000); // Time for the fade-out effect
    }, 6000); // Adjust to the duration of your GIF
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        background: "bisque",
        backgroundColor: "#fff",
      }}
    >
      <div className={`gif-container ${fadeOut ? "fade-out" : ""}`}>
        {!gifLoaded && <div>Loading...</div>}
        <img
          src={cofreGif}
          alt="Loading animation"
          onLoad={handleGifLoad}
          style={{ display: gifLoaded ? "block" : "none" }}
        />
      </div>
    </div>
  );
};

export default GifComponent;
