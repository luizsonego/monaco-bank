import React, { useState } from 'react';
import { Button, List, Modal, Input, Select, Form, notification } from 'antd';
import { useConversationGet, useConversationPost } from '../../hooks/useMessage.query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const mockChats = [
  { id: 1, subject: 'Suporte - Problema no app', lastMessage: 'Olá, como posso ajudar?', updatedAt: '2024-06-01 10:00' },
  { id: 2, subject: 'Dúvida sobre investimento', lastMessage: 'Seu rendimento foi atualizado.', updatedAt: '2024-06-02 14:30' },
];

function Message() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState(mockChats);
  const navigate = useNavigate();

  const { data: conversationsData, isLoading: loadingConversations } = useConversationGet();
  
  const { mutate, isPending } = useMutation({
    mutationFn: useConversationPost,
    onSuccess: (data) => {
      api.info({
        message: data.message,
      });
      if (data.status === 201) {
        setOpen(false);
        form.resetFields();
      }
      setOpen(false);
      queryClient.invalidateQueries("conversation");
    },
  });

  const handleOpen = () => {
    form.resetFields();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onFinish = (values) => {
    mutate(values);
  };

  const handleNavigate = (id) => {
    navigate(`/messages/${id}`);
  }

  return (
    <div style={{ width: '100%', margin: '0 auto', padding: 16 }}>
      {contextHolder}
      <h1>Conversas</h1>
      <Button type="primary" onClick={handleOpen} style={{ marginBottom: 16 }}>
        Novo Chat
      </Button>
      <List
        bordered
        dataSource={conversationsData}
        renderItem={item => (
          <List.Item key={item.id} onClick={() => handleNavigate(item.id)} style={{ cursor: 'pointer' }}>
            <div style={{ width: '100%' }}>
              <strong>{item.subject}</strong>
              <div style={{ color: '#888', fontSize: 12 }}>{item.subject}</div>
              <div style={{ color: '#bbb', fontSize: 10 }}>{item.created_at}</div>
            </div>
          </List.Item>
        )}
      />
      <Modal
        title="Nova Conversa"
        open={open}
        onCancel={handleClose}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          name="create-conversation"
          onFinish={onFinish}
        >
          <Form.Item
            name="subject"
            label="Assunto"
            rules={[{ required: true, message: 'Digite o assunto da conversa' }]}
          >
            <Input placeholder="Assunto da conversa" />
          </Form.Item>
          {/* <Form.Item
            name="initial_message"
            label="Mensagem inicial"
            rules={[{ required: true, message: 'Digite a mensagem inicial' }]}
          >
            <Input placeholder="Mensagem inicial" />
          </Form.Item> */}
          <Form.Item
            name="priority"
            label="Prioridade"
            initialValue={undefined}
          >
            <Select placeholder="Selecione a prioridade" allowClear>
              <Option value="low">Baixa</Option>
              <Option value="medium">Média</Option>
              <Option value="high">Alta</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              loading={!!isPending}
              style={{ width: '100%', marginRight: 0 }}
              type="primary"
              htmlType="submit"
            >
              Criar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Message;
