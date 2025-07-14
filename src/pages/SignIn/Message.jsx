import React from 'react'

function Message() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(10px)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{
        background: 'white',
        borderRadius: 16,
        padding: '40px 32px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
      }}>
        <span style={{ fontSize: 64, color: '#e57373', marginBottom: 16 }}>⚠️</span>
        <h2 style={{ color: '#e57373', marginBottom: 16, textAlign: 'center' }}>Usuário Bloqueado</h2>
        <p style={{ color: '#333', fontSize: 18, textAlign: 'center', marginBottom: 8 }}>
          Seu acesso foi bloqueado.
        </p>
        <br />
        <p style={{ color: '#333', fontSize: 16, textAlign: 'center' }}>
          Por favor, entre em contato com o suporte para mais informações.
        </p>
      </div>
    </div>
  )
}

export default Message