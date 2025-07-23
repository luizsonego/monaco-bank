import { Tag } from "antd";

export const statusExtract = {
  pending: 'Pendente',
  accepted: 'Aprovado',
  rejected: 'Rejeitado',
};


export const statusExtractColor = (status) => {
  return <Tag round color={
      statusExtract[status] === 'Aprovado' ? '#2db7f5' :
      statusExtract[status] === 'Rejeitado' ? '#d90d0d' : '#555555'}>
    {statusExtract[status]}
  </Tag>
};

export const getTypeArrow = (type) => {
  if (type === 1) {
    return '↑'; // Seta para cima (investimento)
  } else if (type === 3) {
    return '↓'; // Seta para baixo
  }
  return ''; // Retorna vazio se não for 1 ou 3
};

