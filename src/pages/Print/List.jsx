import React, { useState } from 'react'
import { useTransactionsPrintGet } from '../../hooks/useWallet.query';
import { List } from 'antd-mobile';
import { statusExtractColor } from '../../Helpers/statusExtract';
import { Modal } from 'antd';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../assets/logo_fundo_claro.png'; // Baixe um logo roxo pequeno e coloque na pasta do componente


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

const handlePrintPDF = () => {
  if (!selectedTransaction) return;

  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();

  // Cores
  const purple = "#081331";
  const gray = "#F5F5F5";
  const black = "#222";

  // 1. Logo e cabeçalho
  // Se quiser usar imagem, descomente a linha abaixo e adicione o logo na pasta
  let logoWidth = 15;
  let logoHeight = 15;
  doc.addImage(logo, 'PNG', 15, 10, logoWidth, logoHeight);
  doc.setFontSize(24);
  doc.setTextColor(purple);
  // doc.text("nu", 15, 20);

  doc.setFontSize(10);
  doc.setTextColor(black);
  doc.text(`Nome: ${selectedTransaction.name}`, 15, 28);
  doc.text(`Conta: ${selectedTransaction.account_number}`, 15, 33);
  doc.text(`Passaporte: ${selectedTransaction.passport}`, 15, 38);

  // 2. Período
  doc.setFontSize(12);
  doc.setTextColor(black);
  doc.text("Extrato bancário", 15, 48);
  doc.setFontSize(10);
  doc.text(`Período: ${formatDate(selectedTransaction.created_at)} a ${formatDate(selectedTransaction.updated_at)}`, 15, 54);

  // 3. Resumo de saldos (exemplo fictício, ajuste conforme seus dados)
  let saldoInicial = 0;
  let totalEntradas = 0;
  let totalSaidas = 0;
  selectedTransaction.transactions?.forEach((t) => {
    const valor = Number(t.amount_money);
    if (t.type_transaction === 1) {
      totalEntradas += valor;
    } else {
      totalSaidas += valor;
    }
  });
  const saldoFinal = saldoInicial + totalEntradas - totalSaidas;

  doc.setFontSize(11);
  doc.setTextColor(black);
  doc.text("Resumo", 15, 64);
  doc.setFontSize(10);
  doc.text(`Saldo inicial: ${formatCurrency(saldoInicial)}`, 15, 70);
  doc.text(`Total de entradas: ${formatCurrency(totalEntradas)}`, 15, 75);
  doc.text(`Total de saídas: ${formatCurrency(totalSaidas)}`, 15, 80);
  doc.setFontSize(12);
  doc.setTextColor(purple);
  doc.text(`Saldo final do período: ${formatCurrency(saldoFinal)}`, 15, 86);

  // 4. Movimentações
  doc.setFontSize(11);
  doc.setTextColor(black);
  doc.text("Movimentações", 15, 96);

  let y = 102;
  doc.setFontSize(9);

  // Agrupa por data
  const transacoesPorData = {};
  selectedTransaction.transactions?.forEach((t) => {
    const data = formatDate(t.date);
    if (!transacoesPorData[data]) transacoesPorData[data] = [];
    transacoesPorData[data].push(t);
  });

  Object.entries(transacoesPorData).forEach(([data, transacoes]) => {
    doc.setFont(undefined, "bold");
    doc.text(`${data}`, 15, y);
    y += 5;
    doc.setFont(undefined, "normal");
    transacoes.forEach((t) => {
      let tipo = t.type_transaction === 1 ? "Entrada" : "Saída";
      let valor = formatCurrency(t.amount_money);
      doc.text(`${tipo}: ${t.description}`, 18, y);
      doc.text(valor, pageWidth - 50, y, { align: "right" });
      y += 5;
    });
    y += 2;
    if (y > 270) { // Nova página se necessário
      doc.addPage();
      y = 20;
    }
  });

  // 5. Rodapé
  doc.setFontSize(8);
  doc.setTextColor(150);
  doc.text("Documento gerado digitalmente.", 15, 290);

  doc.save(`extrato_${selectedTransaction.id}.pdf`);
};
  
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
        footer={[
          <button key="print" onClick={handlePrintPDF}>
            Imprimir PDF
          </button>
        ]}
        title={`Detalhes do Extrato #${selectedTransaction?.id}`}
        width={800}
      >
        <div id="extract-modal-content">
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
        </div>
      </Modal>
    </>
  )
}

export default ListExtract
