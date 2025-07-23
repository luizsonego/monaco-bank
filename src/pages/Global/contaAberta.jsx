import React from 'react';
import { NavBar, Button, Space, Toast } from 'antd-mobile';
import { LeftOutline, CheckCircleFill } from 'antd-mobile-icons';
import { useNavigate } from 'react-router-dom';
import logoB from '../../assets/logo_fundo_claro.png';
import imgCard from "../../assets/card.png";

function ContaAberta() {
  const navigate = useNavigate();

  const back = () => navigate(-1);

  const handleRequestCard = () => {
    Toast.show({
      content: 'Solicitação de cartão enviada!',
      position: 'center',
    });
  };

  const handleDecideLater = () => {
    navigate(-1);
  };

  return (
    <div style={{ 
      backgroundColor: '#f5f5f5',
      fontFamily: 'Arial, sans-serif',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10000
    }}>

      <div style={{ padding: '20px' }}>
        {/* Status da Conta */}
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #4CAF50',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px'
        }}>
          <CheckCircleFill style={{ 
            color: '#4CAF50', 
            fontSize: '24px' 
          }} />
          <span style={{ 
            color: '#2E7D32', 
            fontSize: '16px', 
            fontWeight: '600' 
          }}>
            Conta Global aberta
          </span>
        </div>

        {/* Cartão Visual */}
        <div style={{
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '45px',
          position: 'relative',
          boxShadow: '0 8px 24px rgba(25, 118, 210, 0.3)',
          backgroundImage: `url(${imgCard})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          height: '175px',
          backgroundPosition: 'center',
          backgroundColor: 'transparent',
          width: '290px',
          margin: '0 auto',
        }}>
        </div>

        {/* Título Principal */}
        <h1 style={{
          fontSize: '25px',
          fontWeight: '400',
          color: '#333',
          textAlign: 'center',
          marginBottom: '24px',
          marginTop: '20px'
        }}>
          Solicite seu Cartão de Débito Global Monaco Visa
        </h1>

        {/* Seção de Benefícios */}
        <div style={{ marginBottom: '32px' }}>
          <h3 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: '#333',
            marginBottom: '16px'
          }}>
            Benefícios com o Cartão Safra Global:
          </h3>

          {/* Benefício 1 */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: 'white',
            borderRadius: '8px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{ 
                fontSize: '18px', 
                color: '#1976D2' 
              }}>
                <img width="50" height="50" src="https://img.icons8.com/ios/50/euro-exchange.png" alt="euro-exchange"/>
              </span>
            </div>
            <div>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '4px'
              }}>
                Conversão automática para dólar
              </div>
              <div style={{
                fontSize: '12px',
                color: '#666',
                lineHeight: '1.4'
              }}>
                Pagamentos ou retiradas no mundo todo, com uma taxa de câmbio atrativa.
              </div>
            </div>
          </div>

          {/* Benefício 2 */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '12px',
            padding: '12px',
            backgroundColor: 'white',
            borderRadius: '8px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{ 
                fontSize: '18px', 
              }}><img width="50" height="50" src="https://img.icons8.com/ios/50/phonelink-lock.png" alt="phonelink-lock"/></span>
            </div>
            <div>
              <div style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#333',
                marginBottom: '4px'
              }}>
                Segurança no pagamento
              </div>
              <div style={{
                fontSize: '12px',
                color: '#666',
                lineHeight: '1.4'
              }}>
                Adicione seu cartão em uma carteira digital segura.
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <Space direction="vertical" style={{ width: '100%', }}>
          <Button
            block
            color="primary"
            size="large"
            onClick={handleRequestCard}
            style={{
              backgroundColor: '#081331',
              borderColor: '#081331',
              borderRadius: '12px',
              height: '48px',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Solicitar cartão
          </Button>
          
          <Button
            block
            fill="none"
            size="large"
            onClick={handleDecideLater}
            style={{
              color: '#666',
              fontSize: '16px',
              fontWeight: '500',
              height: '48px'
            }}
          >
            Decidir depois
          </Button>
        </Space>
      </div>
    </div>
  );
}

export default ContaAberta;
