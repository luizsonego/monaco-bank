import React from "react";
import { Card } from "antd";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import imgFamilia from "../assets/familia4.jpg";
import imgPhone from "../assets/iphone.png";
import { useNavigate } from "react-router-dom";
import "./GlobalAccountCard.css";

const GlobalAccountCard = () => {
  const [showGlobalAccount, setShowGlobalAccount] = useState(false);

  const handleOpenGlobalAccount = () => {
    setShowGlobalAccount(true);
  };

  const handleCloseGlobalAccount = () => {
    setShowGlobalAccount(false);
  };

  return (
    <>
    <div style={{
      padding: "20px",
      backgroundColor: '#081331',
      background: 'linear-gradient(180deg,rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)',
      marginTop: 15,
      borderRadius: "12px"
    }} onClick={handleOpenGlobalAccount}>
        <div style={{ 
          fontSize: "24px", 
          fontWeight: "bold", 
          marginBottom: "10px",
          color: "white"
        }}>
          Conta Global
        </div>
        <div style={{ 
          fontSize: "14px", 
          opacity: 0.9,
          color: "white"
        }}>
          Abertura de conta global Monaco Capital Bank
        </div>
      </div>
      {showGlobalAccount && <GlobalAccount onClose={handleCloseGlobalAccount} />}
    </>
  );
};

export default GlobalAccountCard; 

function GlobalAccount({ onClose }) {
  const navigate = useNavigate();
  
  return (
    <>
      {/* Overlay de fundo */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1001,
        backgroundColor: "rgba(255, 255, 255, 0.64)",
        backdropFilter: "blur(4px)",
      }} onClick={onClose}></div>

      {/* Modal */}
      <div 
        className="modal-container"
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: "400px",
          backgroundColor: "white",
          borderRadius: "16px",
          zIndex: 1001,
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
          paddingBottom: "20px",
        }}
      >
        
        {/* Imagem da família na praia */}
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "300px",
          backgroundColor: "rgba(131, 93, 34, 0.3)",
          zIndex: 1000,
        }}></div>
        <div style={{
          position: "relative",
          width: "100%",
          height: "300px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          backgroundImage: `url(${imgFamilia})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
          {/* Botão de fechar */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "rgba(255, 255, 255, 0.9)",
              border: "none",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 1002,
            }}
          >
            <CloseOutlined style={{ fontSize: "16px", color: "#333" }} />
          </button>
        </div>

        {/* Conteúdo do modal */}
        <div 
          className="modal-content"
          style={{ padding: "0 24px" }}
        >
          
          {/* Seção superior com título e mockup do smartphone */}
          <div 
            className="header-section"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: "16px",
              position: "relative",
              top: "-100px",
              zIndex: 1001,
              flexWrap: "wrap",
            }}
          >
            {/* Texto à esquerda */}
            <div 
              className="text-section"
              style={{
                flex: "1 1 200px",
                minWidth: "140px",
                borderTop: "5px solid #1e3a8a",
                borderBottom: "5px solid #1e3a8a",
                padding: "10px 0",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
              }}
            >
              <h2 
                className="title-text"
                style={{
                  fontSize: "19px",
                  fontWeight: "bold",
                  color: "#1e3a8a",
                  margin: "0 0 8px 0",
                  lineHeight: "1.2",
                }}
              >
                Conta <br /> Global Monaco Capital Bank
              </h2>
              <p 
                className="description-text"
                style={{
                  fontSize: "14px",
                  color: "#374151",
                  margin: 0,
                  lineHeight: "1.4",
                }}
              >
                Conveniência e segurança para viajar o mundo.
              </p>
            </div>
            
            {/* Mockup do smartphone à direita */}
            <div 
              className="phone-section"
              style={{
                flex: "0 0 auto",
                backgroundColor: "transparent",
                width: "105px",
                height: "200px",
                borderRadius: "12px",
                padding: "8px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
                top: "30px",
              }}
            >
              <div
                style={{
                  backgroundImage: `url(${imgPhone})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>
          </div>

          {/* Benefícios */}
          <div 
            className="benefits-section"
            style={{
              position: "relative",
              top: "-130px",
              width: "100%",
              maxWidth: "250px",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <div 
              className="benefit-text"
              style={{
                fontSize: "25px",
                fontWeight: "normal",
                color: "#1e3a8a",
                marginBottom: "8px",
              }}
            >
              Pague em <br /> qualquer moeda,
            </div>
            <div 
              className="benefit-bold"
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#1e3a8a",
              }}
            >
              24 horas por dia,
            </div>
            <div 
              className="benefit-bold"
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#1e3a8a",
              }}
            >
              7 dias por semana,
            </div>
            <div 
              className="benefit-bold"
              style={{
                fontSize: "22px",
                fontWeight: "bold",
                color: "#1e3a8a",
              }}
            >
              com a segurança da Monaco.
            </div>
          </div>

          {/* Botão de ação */}
          <button
            className="action-button"
            onClick={() => {
              // Aqui você pode adicionar a lógica para solicitar a conta
              navigate("/global");
            }}
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "#1e3a8a",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
              marginTop: "20px",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#1e40af";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#1e3a8a";
            }}
          >
            Peça a sua
          </button>
        </div>
      </div>
    </>
  );
}