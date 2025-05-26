import React, { useState } from 'react'
import { useAdminExtractGet } from '../../hooks/useWallet.query';
import { Button, Modal, notification, Table } from 'antd';
import { ImageViewer, List } from 'antd-mobile';
import { useAcceptRequestMovimentation, useRejectRequestMovimentation } from '../../hooks/useWallet.query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { statusExtractColor } from '../../Helpers/statusExtract';

function RequestMovimentation() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [visible, setVisible] = useState(false);
  const { data, isLoading, isError } = useAdminExtractGet();

  const { mutate: acceptRequestMovimentation } = useMutation({
    mutationFn: useAcceptRequestMovimentation,
    onSuccess: (data) => {
      setIsModalOpen(false);
      api.success({
        message: data.message,
      });
      queryClient.invalidateQueries("admin-extract");
    },
    onError: (error) => {

      api.error({
        message: error.message,
      });
      console.log("error: ", error);
    }
  });
  const { mutate: rejectRequestMovimentation } = useMutation({
    mutationFn: useRejectRequestMovimentation,
    onSuccess: (data) => {
      setIsModalOpen(false);
      api.success({
        message: data.message,
      });
      queryClient.invalidateQueries("admin-extract");
    },
    onError: (error) => {
      api.error({
        message: error.message,
      });
      
    }
  });

  const handleAction = (record) => {
    
    setSelectedRecord(record);
    setIsModalOpen(true);
  }

  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const handleApprove = (record) => {
    console.log("id>: ", record);
    acceptRequestMovimentation(record);
  }

  const handleReject = (record) => {
    console.log("id: ", record);
    rejectRequestMovimentation(record);
  }

  return (
    <div>
      <h1>Solicitação de Extrato</h1>
      <List>
        {data?.map((item) => (
          <List.Item
            key={item.id}
            extra={<p>{statusExtractColor(item.status)}</p>}
            onClick={() => handleAction(item)}
            description={<p>{item.passport}</p>}
          >
            {item.name}
          </List.Item>
        ))}
      </List>

      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <List header='Solicitação de Extrato'>
          <List.Item prefix={<b>nome: </b>}>{selectedRecord?.name}</List.Item>
          <List.Item prefix={<b>status: </b>}>{selectedRecord?.status}</List.Item>
          <List.Item prefix={<b>data: </b>}>{selectedRecord?.created_at}</List.Item>
          <List.Item prefix={<b>numero da conta: </b>}>{selectedRecord?.account_number}</List.Item>
          <List.Item prefix={<b>passaporte: </b>}>{selectedRecord?.passport}</List.Item>
          <List.Item prefix={<b>selfie: </b>}>
            <img src={selectedRecord?.selfie} alt="selfie" onClick={() => {
          setVisible(true)
        }} />
          </List.Item>
          <List.Item style={{ display: 'flex', gap: 10, justifyContent: 'center' }} >
            <Button type='primary' onClick={() => handleApprove(selectedRecord.id)} >Aprovar</Button>
            <Button type='danger' onClick={() => handleReject(selectedRecord.id)} >Rejeitar</Button>
          </List.Item>
        </List>
        <ImageViewer
        classNames={{
          mask: 'customize-mask',
          body: 'customize-body',
        }}
        image={selectedRecord?.selfie}
        visible={visible}
        onClose={() => {
          setVisible(false)
        }}
      />
      </Modal>
    </div>
  )
}

export default RequestMovimentation
