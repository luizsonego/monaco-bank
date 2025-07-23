import React from 'react'
import { useDocGet } from '../../hooks/useWallet.query';

function Doc() {
  const { data, isLoading, error } = useDocGet();
  return (
    <div style={{
      backgroundColor: '#F0F0F0',
      background: 'linear-gradient(90deg,rgba(240, 240, 240, 1) 0%, rgba(204, 204, 204, 1) 100%)',
      minHeight: "100vh",
      flex: 1,
      borderRadius: '25px 25px 0 0',
      paddingTop: 30,
      paddingLeft: 15,
      paddingRight: 15,
    paddingBottom: 100,
    marginTop: 20,
    }}>
      {isLoading && <div>Carregando...</div>}
      {error && <div>Erro ao carregar documentos</div>}
      {data && <div>Documentos carregados</div>}
      {data && data.map((item) => (
        <div key={item.id}>
          <img src={item.doc_path} alt={item.doc_path} />
        </div>
      ))}
    </div>

  )
}

export default Doc
