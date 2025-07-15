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
          Por favor, entre em contato com o suporte para mais informações.<br />
          <span style={{ fontWeight: 'bold', color: '#1976d2' }}>+1 (954) 868-5468</span>
        </p>
        <a
          href="https://wa.me/19548685468"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: 16,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: '#e0f2f1', // verde bem claro
            color: '#128C7E',
            fontWeight: 500,
            padding: '8px 18px',
            borderRadius: 8,
            textDecoration: 'none',
            fontSize: 15,
            boxShadow: 'none',
            border: '1px solid #b2dfdb',
            transition: 'background 0.2s',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="16" fill="#25D366"/>
            <path d="M23.472 19.615c-.355-.177-2.096-1.034-2.42-1.153-.324-.118-.56-.177-.797.178-.237.355-.914 1.153-1.12 1.39-.207.237-.412.266-.767.089-.355-.178-1.5-.553-2.86-1.763-1.057-.944-1.77-2.108-1.98-2.463-.207-.355-.022-.546.155-.723.159-.158.355-.412.532-.619.178-.207.237-.355.355-.59.118-.237.06-.443-.03-.62-.089-.178-.797-1.92-1.09-2.63-.287-.69-.58-.595-.797-.605-.207-.009-.443-.011-.68-.011-.237 0-.62.089-.944.443-.324.355-1.24 1.21-1.24 2.95 0 1.74 1.267 3.422 1.444 3.66.178.237 2.5 3.82 6.05 5.207.846.291 1.504.464 2.018.594.847.215 1.617.185 2.227.112.68-.08 2.096-.857 2.393-1.687.296-.83.296-1.54.207-1.687-.089-.148-.324-.237-.68-.414z" fill="white"/>
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  )
}

export default Message