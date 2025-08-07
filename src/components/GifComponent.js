import React, { useState } from "react";
import cofreGif from "../assets/cofre.mp4";

const GifComponent = ({ onGifEnd }) => {
  const [gifLoaded, setGifLoaded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const handleVideoEnd = () => {
    setFadeOut(true);
    setTimeout(onGifEnd, 1000); // Time for the fade-out effect
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0f172a",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={`gif-container ${fadeOut ? "fade-out" : ""}`} style={{width: "100%", height: "100%", position: "absolute", top: 0, left: 0}}>
         {!gifLoaded && ''}
        <video 
          src={cofreGif} 
          autoPlay 
          muted 
          alt="Loading animation"
          onEnded={handleVideoEnd}
          style={{ 
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        />
      </div>
    </div>
  );
};

export default GifComponent;
