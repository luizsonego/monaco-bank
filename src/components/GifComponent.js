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

function useBatterySaver() {
  const [isBatterySaver, setIsBatterySaver] = useState(false);

  useEffect(() => {
    // Verifica se a API de economia de bateria está disponível
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        // Verifica se o dispositivo está em modo de economia de bateria
        // Esta é uma verificação aproximada baseada no nível da bateria
        const checkBatterySaver = () => {
          // Considera economia de bateria quando a bateria está baixa (< 20%)
          // ou quando o dispositivo está carregando lentamente
          const isLowBattery = battery.level < 0.2;
          const isChargingSlowly = battery.charging && battery.level < 0.5;
          
          setIsBatterySaver(isLowBattery || isChargingSlowly);
        };

        checkBatterySaver();
        
        // Adiciona listeners para mudanças na bateria
        battery.addEventListener('levelchange', checkBatterySaver);
        battery.addEventListener('chargingchange', checkBatterySaver);

        return () => {
          battery.removeEventListener('levelchange', checkBatterySaver);
          battery.removeEventListener('chargingchange', checkBatterySaver);
        };
      });
    }

    // Verificação adicional para dispositivos móveis
    // Alguns dispositivos têm APIs específicas para economia de bateria
    if ('connection' in navigator) {
      const connection = navigator.connection;
      if (connection && connection.effectiveType) {
        // Se a conexão for lenta, pode indicar economia de bateria
        const isSlowConnection = connection.effectiveType === 'slow-2g' || 
                                connection.effectiveType === '2g' ||
                                connection.saveData === true;
        setIsBatterySaver(prev => prev || isSlowConnection);
      }
    }

    // Verificação para iOS (que não suporta a API de bateria)
    const ua = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(ua);
    
    if (isIOS) {
      // Para iOS, verifica se há indicações de economia de bateria
      // como baixa performance ou modo de baixo consumo
      const checkIOSBatterySaver = () => {
        // Verifica se o dispositivo está em modo de baixo consumo
        // Esta é uma verificação heurística baseada na performance
        const startTime = performance.now();
        setTimeout(() => {
          const endTime = performance.now();
          const performanceTime = endTime - startTime;
          // Se a performance estiver muito baixa, pode indicar economia de bateria
          if (performanceTime > 100) {
            setIsBatterySaver(true);
          }
        }, 50);
      };

      checkIOSBatterySaver();
    }
  }, []);

  return isBatterySaver;
}

const GifComponent = ({ onGifEnd }) => {
  const isIOS = useIsIOS();
  const isBatterySaver = useBatterySaver();
  const videoRef = useRef(null);
  const [useGif, setUseGif] = useState(false);

  const [gifLoaded, setGifLoaded] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Se a economia de bateria estiver ativada, usa GIF diretamente
    if (isBatterySaver) {
      console.log("Modo de economia de bateria detectado, usando GIF");
      setUseGif(true);
      return;
    }

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
  }, [isBatterySaver]);

  const handleVideoEnd = () => {
    setFadeOut(true);
    setTimeout(onGifEnd, 1000); // Time for the fade-out effect
  };

  const handleGifEnd = () => {
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
            onLoad={() => {
              // Simula o fim da animação do GIF após um tempo
              setTimeout(handleGifEnd, 3000); // 3 segundos para o GIF
            }}
          />
          ) : (
            <video 
              ref={videoRef}
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
      </div>
    </div>
  );
};

export default GifComponent;
