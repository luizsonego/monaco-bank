import React, { useState, useEffect, useRef } from "react";
import cofreVideo from "../assets/cofre.mp4";

const VideoComponent = ({ onVideoEnd }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleVideoEnd = () => {
      onVideoEnd();
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", handleVideoEnd);
      video.play();
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [onVideoEnd]);

  const handlePlayVideo = () => {
    const video = videoRef.current;
    if (video) {
      video.play();
      video.addEventListener("ended", onVideoEnd);
    }
  };

  return (
    <>
      <video ref={videoRef} width="100%" height="100%" controls>
        <source src={cofreVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <button onClick={handlePlayVideo}>Play Video</button>
    </>
  );
};

export default VideoComponent;
