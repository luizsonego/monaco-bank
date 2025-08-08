import React, { useEffect, useRef, useState } from "react";
import cofreGif from "../assets/cofre.mp4";
import gifFallback from "../assets/cofre.gif";

function useIsIOS() {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(ua));
  }, []);

  return isIOS;
}

const GifComponent = ({ onGifEnd }) => {
  const isIOS = useIsIOS();
  const videoRef = useRef(null);
  const [useGif, setUseGif] = useState(false);

  const [gifLoaded, setGifLoaded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const tryPlay = async () => {
        try {
          await video.play();
          // O vídeo foi iniciado com sucesso
        } catch (err) {
          console.warn("Autoplay falhou, usando GIF como fallback");
          setUseGif(true);
        }
      };

      tryPlay();
    }
  }, []);

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
        {
          useGif ? (
            <img
            src={gifFallback}
            alt="Fallback animation"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
          ) : (
            <video 
              src={cofreGif} 
              autoPlay 
              muted 
              alt="Loading animation"
              onEnded={handleVideoEnd}
              playsInline
              style={{ 
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block"
              }}
            />
          )
      }
         {/* {!gifLoaded && ''}
        <video 
          src={cofreGif} 
          autoPlay 
          muted 
          alt="Loading animation"
          onEnded={handleVideoEnd}
          playsInline
          style={{ 
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block"
          }}
        /> */}
      </div>
    </div>
  );
};

export default GifComponent;
