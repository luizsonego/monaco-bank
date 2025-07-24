import React from "react";
import { Card } from "antd";
import { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import imgFamilia from "../assets/familia4.jpg";
import imgPhone from "../assets/iphone.png";
import { useNavigate } from "react-router-dom";

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
      <div style={{
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
      }}>
        
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
        <div style={{ padding: "0 24px" }}>
          
          {/* Seção superior com título e mockup do smartphone */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}>
{/* Texto à esquerda */}
            <div style={{
              zIndex: 1001,
              flex: 1,
              marginRight: "16px",
              position: "relative",
              top: "-100px",
              maxWidth: '140px',
              borderTop: "5px solid #1e3a8a",
              borderBottom: "5px solid #1e3a8a",
              padding: "10px 0 ",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              display: "flex",
              flexDirection: "column",
            }}>
              <h2 style={{
                fontSize: "19px",
                fontWeight: "bold",
                color: "#1e3a8a",
                margin: "0 0 8px 0",
                lineHeight: "1.2",
              }}>
                Conta <br /> Global Monaco Capital Bank
              </h2>
              <p style={{
                fontSize: "14px",
                color: "#374151",
                margin: 0,
                lineHeight: "1.4",
              }}>
                Conveniência e segurança para viajar o mundo.
              </p>
            </div>
            {/* Mockup do smartphone à direita */}
            <div style={{
              backgroundColor: "transparent",
              width: "105px",
              height: "200px",
              borderRadius: "12px",
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              top: "-70px",
              right: "15px",
              position: "relative",
              zIndex: 1001,
            }}>
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
          <div style={{
            top: "-130px",
            width: '250px',
            position: "relative",
            height: "100px",
          }}>
            <div style={{
              fontSize: "25px",
              fontWeight: "normal",
              color: "#1e3a8a",
              marginBottom: "8px",
            }}>
              Pague em <br /> qualquer moeda,
            </div>
            <div style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#1e3a8a",
            }}>
              24 horas por dia,
            </div>
            <div style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#1e3a8a",
            }}>
              7 dias por semana,
            </div>
            <div style={{
              fontSize: "22px",
              fontWeight: "bold",
              color: "#1e3a8a",
            }}>
              com a segurança da Monaco.
            </div>
          </div>

          {/* Botão de ação */}
          <button
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