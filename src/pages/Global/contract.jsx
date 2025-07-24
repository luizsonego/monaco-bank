import React from 'react'

function Contract() {
  return (
    <div style={{ 
      fontSize: '14px', 
      lineHeight: '1.6',
      color: '#333'
    }}>
      <h2 style={{ 
        fontSize: '18px', 
        fontWeight: 'bold', 
        marginBottom: '15px',
        color: '#081331'
      }}>
        Contrato de Abertura de Conta Global
      </h2>
      
      <p style={{ marginBottom: '10px' }}>
        <strong>1. OBJETO DO CONTRATO</strong>
      </p>
      <p style={{ marginBottom: '15px' }}>
        O presente contrato tem por objeto a abertura de conta global no Monaco Capital Bank, 
        permitindo ao cliente realizar transações em múltiplas moedas conforme as 
        condições estabelecidas.
      </p>

      <p style={{ marginBottom: '10px' }}>
        <strong>2. MOEDAS DISPONÍVEIS</strong>
      </p>
      <p style={{ marginBottom: '15px' }}>
        A conta global permite transações em mais de 150 moedas, incluindo mas não 
        se limitando a: Dólar Americano (USD), Euro (EUR), Libra Esterlina (GBP), 
        Iene Japonês (JPY), entre outras.
      </p>

      <p style={{ marginBottom: '10px' }}>
        <strong>3. TAXAS E COMISSÕES</strong>
      </p>
      <p style={{ marginBottom: '15px' }}>
        O cliente está ciente de que poderão ser aplicadas taxas de câmbio e 
        comissões conforme tabela vigente do banco, que será disponibilizada 
        previamente a cada operação.
      </p>

      <p style={{ marginBottom: '10px' }}>
        <strong>4. RESPONSABILIDADES</strong>
      </p>
      <p style={{ marginBottom: '15px' }}>
        O cliente se compromete a fornecer informações verdadeiras e atualizadas, 
        bem como a cumprir todas as regulamentações aplicáveis às operações 
        cambiais.
      </p>

      <p style={{ marginBottom: '10px' }}>
        <strong>5. ACEITAÇÃO</strong>
      </p>
      <p style={{ marginBottom: '15px' }}>
        Ao aceitar este contrato, o cliente declara ter lido, compreendido e 
        concordado com todos os termos e condições estabelecidos.
      </p>

      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '15px', 
        borderRadius: '8px',
        marginTop: '20px',
        border: '1px solid #ddd'
      }}>
        <p style={{ 
          fontSize: '12px', 
          color: '#666',
          margin: 0
        }}>
          <strong>Importante:</strong> Este contrato está sujeito à aprovação do 
          Monaco Capital Bank e pode ser alterado conforme regulamentações vigentes. 
          Para dúvidas, entre em contato com nosso suporte.
        </p>
      </div>
    </div>
  )
}

export default Contract
