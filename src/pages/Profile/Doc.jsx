import React from 'react'
import { useDocGet } from '../../hooks/useWallet.query';

function Doc() {
  const { data, isLoading, error } = useDocGet();
  return (
    <div>
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
