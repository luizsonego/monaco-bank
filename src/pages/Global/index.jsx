import React, { useState } from 'react';
import { NavBar, Button, ActionSheet } from 'antd-mobile';
import { useNavigate } from 'react-router-dom';
import Contract from './contract';
import { useProfileGet } from '../../hooks/useProfile.query';

function Global() {
  const navigate = useNavigate();
  const [selectedCurrency, setSelectedCurrency] = useState('dollar');
  const [showContract, setShowContract] = useState(false);
  const { data: profileData } = useProfileGet();

  const handleBack = () => {
    navigate(-1);
  };

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const handleContinue = () => {
    setShowContract(true);
  };

  const handleCloseContract = () => {
    setShowContract(false);
  };

  const handleAcceptContract = () => {
    handleCloseContract();
    
    // Preparar dados para enviar para a próxima tela
    const accountData = {
      id: profileData?.profile?.id,
      tipo_conta: selectedCurrency === 'dollar' ? 'global_dollar' : 'global_euro',
      moeda: selectedCurrency === 'dollar' ? 'USD' : 'EUR',
      user_id: profileData?.profile?.user_id
    };
    
    // Navegar para a tela de conta aberta com os dados
    navigate('/global/conta-aberta', { 
      state: { accountData } 
    });
  };

  return (
    <div style={{ 
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      flex: 1
    }}>
      {/* Header */}
      {/* <NavBar
        onBack={handleBack}
        style={{
          background: 'rgba(8, 19, 49, 1)',
          color: 'white',
          paddingTop: 10,
        }}
      >
        <span style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
          Conta Global
        </span>
      </NavBar> */}

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        {/* Icon */}
        <div style={{
          width: '130px',
          height: '130px',
          borderRadius: '50%',
          border: '1px solid #081331',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          marginTop: '20px'
        }}>
          <div style={{
            fontSize: '50px',
            color: '#081331',
            position: 'relative'
          }}>
            <img width="70" height="70" src="https://img.icons8.com/pastel-glyph/64/globe-checked.png" alt="globe-checked"/>
          </div>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#081331',
          marginBottom: '10px',
          textAlign: 'center'
        }}>
          Abertura de conta global
        </h1>

        {/* Question */}
        <p style={{
          fontSize: '16px',
          color: '#081331',
          marginBottom: '30px',
          textAlign: 'center'
        }}>
          Quais moedas você quer adicionar?
        </p>

        {/* Currency Options */}
        <div style={{ width: '100%', maxWidth: '390px' }}>
          {/* Dollar Option */}
          <div 
            style={{
              border: '1px solid #081331',
              borderRadius: '12px',
              padding: '25px 16px',
              marginBottom: '12px',
              cursor: 'pointer',
              backgroundColor: selectedCurrency === 'dollar' ? '#f0f8ff' : 'white'
            }}
            onClick={() => handleCurrencyChange('dollar')}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div 
                style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #081331',
                  borderRadius: '4px',
                  backgroundColor: selectedCurrency === 'dollar' ? '#081331' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  cursor: 'pointer'
                }}
                onClick={() => handleCurrencyChange('dollar')}
              >
                {selectedCurrency === 'dollar' && (
                  <div style={{
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#081331',
                  marginBottom: '4px'
                }}>
                  Abrir saldo em dólar
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#081331',
                  opacity: 0.8
                }}>
                  Transações em mais de 150 moedas
                </div>
              </div>
            </div>
          </div>

          {/* Euro Option */}
          <div 
            style={{
              border: '1px solid #081331',
              borderRadius: '12px',
              padding: '25px 16px',
              marginBottom: '30px',
              cursor: 'pointer',
              backgroundColor: selectedCurrency === 'euro' ? '#f0f8ff' : 'white'
            }}
            onClick={() => handleCurrencyChange('euro')}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div 
                style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #081331',
                  borderRadius: '4px',
                  backgroundColor: selectedCurrency === 'euro' ? '#081331' : 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '12px',
                  cursor: 'pointer'
                }}
                onClick={() => handleCurrencyChange('euro')}
              >
                {selectedCurrency === 'euro' && (
                  <div style={{
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    ✓
                  </div>
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: '#081331',
                  marginBottom: '4px'
                }}>
                  Abrir saldo em euro
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#081331',
                  opacity: 0.8
                }}>
                  Apenas transações em euro
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Button */}
      <div style={{ 
        padding: '20px',
        backgroundColor: 'white',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: showContract ? 1000 : 1010,
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <Button
          block
          color='primary'
          size='large'
          onClick={handleContinue}
          style={{
            backgroundColor: '#081331',
            borderColor: '#081331',
            borderRadius: '12px',
            height: '48px',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Continuar
        </Button>
      </div>

      {/* Contract Modal */}
      <ActionSheet
        style={{
          backgroundColor: 'white',
          zIndex: 10000,
          position: 'relative',
          borderRadius: '12px',
          width: '100%',
          overflow: 'hidden',
          flex: 1
        }}
        visible={showContract}
        onClose={handleCloseContract}
        title="Contrato de Conta Global"
        closeOnAction={false}
        closeOnMaskClick={false}
        actions={[]}
        extra={
          <div style={{ 
            padding: '20px',
            maxHeight: '60vh',
            overflowY: 'auto'
          }}>
            <Contract />
            <div style={{ 
              marginTop: '20px',
              display: 'flex',
              gap: '10px'
            }}>
              <Button
                block
                color='default'
                size='large'
                onClick={handleCloseContract}
                style={{
                  borderRadius: '12px',
                  height: '48px',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Cancelar
              </Button>
              <Button
                block
                color='primary'
                size='large'
                onClick={handleAcceptContract}
                style={{
                  backgroundColor: '#081331',
                  borderColor: '#081331',
                  borderRadius: '12px',
                  height: '48px',
                  fontSize: '16px',
                  fontWeight: 'bold'
                }}
              >
                Aceitar
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
}

export default Global;
