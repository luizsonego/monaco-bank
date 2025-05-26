import React, { useState } from 'react'
import { useTransactionsPrintGet } from '../../hooks/useWallet.query';
import { List } from 'antd-mobile';
import { statusExtractColor } from '../../Helpers/statusExtract';
import { Modal } from 'antd';

function ListExtract() {
  const { data: transactionsPrintData, isLoading: loadingTransactionsPrint } =
    useTransactionsPrintGet();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const handleAction = (item) => {
    setSelectedTransaction(item);
    setIsModalOpen(true);
  }

  const handleClose = () => { 
    setIsModalOpen(false);
    setSelectedTransaction(null);
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  }

  return (
    <>
      <div>
        <h1>Lista de Extratos</h1>
        <List>
          {transactionsPrintData?.requestTransactions?.map((item) => (
            <List.Item
              key={item.id}
              extra={<p>{statusExtractColor(item.status)}</p>}
              description={
                <div>
                  <p>Nome: {item.name}</p>
                  <p>Conta: {item.account_number}</p>
                  <p>Data: {formatDate(item.created_at)}</p>
                </div>
              }
              onClick={() => handleAction(item)}
            >
              Extrato #{item.id}
            </List.Item>
          ))}
        </List>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}
        title={`Detalhes do Extrato #${selectedTransaction?.id}`}
        width={800}
      >
        {selectedTransaction && (
          <div>
            <div style={{ marginBottom: '20px' }}>
              <h3>Informações do Cliente</h3>
              <p><strong>Nome:</strong> {selectedTransaction.name}</p>
              <p><strong>Conta:</strong> {selectedTransaction.account_number}</p>
              <p><strong>Passaporte:</strong> {selectedTransaction.passport}</p>
              <p><strong>Status:</strong> {statusExtractColor(selectedTransaction.status)}</p>
            </div>
            
            <h3>Transações</h3>
            <List>
              {selectedTransaction.transactions?.map((transaction) => (
                <List.Item
                  key={transaction.id}
                  description={
                    <div>
                      <p><strong>Data:</strong> {formatDate(transaction.date)}</p>
                      <p><strong>Descrição:</strong> {transaction.description}</p>
                      <p><strong>Valor:</strong> {formatCurrency(transaction.amount_money)}</p>
                    </div>
                  }
                >
                  Transação #{transaction.id.slice(0, 8)}
                </List.Item>
              ))}
              {selectedTransaction.transactions?.length === 0 && (
                <p>Nenhuma transação encontrada</p>
              )}
            </List>
          </div>
        )}
      </Modal>
    </>
  )
}

export default ListExtract
