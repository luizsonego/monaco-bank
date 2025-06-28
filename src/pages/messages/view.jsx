import React from 'react'
import { useParams } from 'react-router-dom';
import { useMessageIdGet, useMessageIdPost, useCreateTaskPost } from '../../hooks/useMessage.query';
import { Card, Tag, Descriptions, Spin, Button, Avatar, Space, Typography, Divider, message as antdMessage, Form, Input, Select, Modal, notification, List } from 'antd';
import { UserOutlined, MailOutlined, CheckCircleOutlined, CloseCircleOutlined, MessageOutlined } from '@ant-design/icons';
import { date_format } from '../../Helpers/dateFormat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProfileGet } from '../../hooks/useProfile.query';

const { Title, Text } = Typography;

const statusColors = {
  open: 'green',
  closed: 'red',
  pending: 'orange',
};

const priorityColors = {
  low: 'blue',
  medium: 'orange',
  high: 'red',
};

function ViewMessage() {
  let { id } = useParams();
  const queryClient = useQueryClient();
  const [api, contextHolder] = notification.useNotification();
  // Responsividade: detecta largura da tela
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 600);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { data: messageData, isLoading: loadingMessage } = useMessageIdGet(id);
  const { data: profileData, isLoading: loadingProfile } = useProfileGet();
  const loggedUserId = profileData?.profile?.user_id;
  console.log('loggedUserId: ',loggedUserId);

  const { mutate: postMessageId } = useMutation({
    mutationFn: useMessageIdPost,
    onSuccess: (data) => {
      api.info({
        message: data.message,
      });
      if (data.status === 201) {
        // setOpen(false);
        form.resetFields();
      }
      // setOpen(false);
      queryClient.invalidateQueries("message-id");
    },
  });

  const { mutate: postCreateTask } = useMutation({
    mutationFn: useCreateTaskPost,
    onSuccess: (data) => {
      api.info({
        message: data.message,
      });
      if (data.status === 201) {
        // setOpen(false);
        form.resetFields();
      }
      // setOpen(false);
      queryClient.invalidateQueries("message-id");
    },
  });

  // Modal de resposta
  const [replyModalOpen, setReplyModalOpen] = React.useState(false);
  const [form] = Form.useForm();

  const handleClose = () => {
    antdMessage.info('Função de fechar conversa ainda não implementada.');
  };

  const handleReply = () => {
    setReplyModalOpen(true);
  };

  const handleReplyCancel = () => {
    setReplyModalOpen(false);
    form.resetFields();
  };

  const handleReplyFinish = (values) => {
    setReplyModalOpen(false);
    form.resetFields();
    const data = {
      message: values.message,
      sender_id: values.sender_id,
      conversation_id: id,
      message_type: 'text',
      file_url: ' ',
      is_read: false,
    }
    postMessageId(data);
    // Aqui você pode integrar com a API de envio de mensagem
  };

  function handleTransformTask(messageId) {
    const data = {
      conversation_id: messageId,
      message_id: messageId,
      title: messageData.subject,
      description: messageData.message,
      status: 'open',
      priority: messageData.priority,
      assigned_to: messageData.agent_id,
      created_by: loggedUserId,
      due_date: messageData.updated_at,
    }
    postCreateTask(data);
  }

  if (loadingMessage) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}><Spin size="large" /></div>;
  }

  if (!messageData) {
    return <div style={{ textAlign: 'center', marginTop: 40 }}><Text type="danger">Mensagem não encontrada.</Text></div>;
  }

  const { status, subject, priority, created_at, updated_at, closed_at, client, agent } = messageData;

  return (
    <div style={{ maxWidth: 700, margin: isMobile ? '0' : '32px auto', padding: isMobile ? 4 : 16 }}>
      {contextHolder}
      <Card
        title={<Title level={4} style={{ margin: 0, fontSize: isMobile ? 18 : 24 }}><MessageOutlined /> {subject}</Title>}
        extra={<Tag color={statusColors[status] || 'default'} style={{ fontSize: isMobile ? 13 : 16, padding: isMobile ? '2px 8px' : '2px 12px' }}>{status.toUpperCase()}</Tag>}
        bordered
        style={{ borderRadius: 12, boxShadow: isMobile ? '0 1px 4px #0001' : '0 2px 12px #0001', margin: isMobile ? 0 : undefined }}
        bodyStyle={{ padding: isMobile ? 10 : 24 }}
      >
        <Descriptions column={1} size={isMobile ? 'small' : 'middle'}>
          <Descriptions.Item label="Prioridade">
            <Tag color={priorityColors[priority] || 'default'} style={{ fontSize: isMobile ? 12 : 15 }}>{priority.toUpperCase()}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Criado em">{date_format(created_at * 1000)}</Descriptions.Item>
          <Descriptions.Item label="Atualizado em">{date_format(updated_at * 1000)}</Descriptions.Item>
          {closed_at && <Descriptions.Item label="Fechado em">{date_format(closed_at * 1000)}</Descriptions.Item>}
        </Descriptions>
        <Divider />
        <Space
          align="start"
          size={isMobile ? 12 : 32}
          direction={isMobile ? 'vertical' : 'horizontal'}
          style={{ width: '100%', justifyContent: isMobile ? 'center' : 'space-between', display: 'flex' }}
        >
          <Card
            size="small"
            title={<span><UserOutlined /> Cliente</span>}
            style={{ width: '100%', minWidth: isMobile ? '100%' : 220, borderRadius: 8, marginBottom: isMobile ? 8 : 0 }}
            bordered
            bodyStyle={{ padding: isMobile ? 10 : 16 }}
          >
            <Space direction="vertical" size={2}>
              <Avatar icon={<UserOutlined />} style={{ background: '#1890ff' }} />
              <Text strong style={{ fontSize: isMobile ? 13 : 16 }}>{client?.username}</Text>
              <Text type="secondary" style={{ fontSize: isMobile ? 11 : 13 }}><MailOutlined /> {client?.email}</Text>
              <Text type="secondary" style={{ fontSize: isMobile ? 10 : 12 }}>ID: {client?.id}</Text>
            </Space>
          </Card>
          <Card
            size="small"
            title={<span><UserOutlined /> Agente</span>}
            style={{ minWidth: isMobile ? '100%' : 220, borderRadius: 8, marginBottom: isMobile ? 8 : 0 }}
            bordered
            bodyStyle={{ padding: isMobile ? 10 : 16 }}
          >
            <Space direction="vertical" size={2}>
              <Avatar icon={<UserOutlined />} style={{ background: '#52c41a' }} />
              <Text strong style={{ fontSize: isMobile ? 13 : 16 }}>{agent?.username}</Text>
              <Text type="secondary" style={{ fontSize: isMobile ? 11 : 13 }}><MailOutlined /> {agent?.email}</Text>
              <Text type="secondary" style={{ fontSize: isMobile ? 10 : 12 }}>ID: {agent?.id}</Text>
            </Space>
          </Card>
        </Space>
        {/* <Divider />
        <Space style={{ width: '100%', justifyContent: isMobile ? 'center' : 'flex-end', flexWrap: 'wrap' }}>
          {(profileData?.profile?.user_id === 1 || profileData?.profile?.user_id === 2) && (
            <>
              <Button
                type="default"
                icon={<CheckCircleOutlined />}
                onClick={() => handleTransformTask && handleTransformTask(messageData.id)}
                style={{ minWidth: isMobile ? 120 : 140, fontSize: isMobile ? 13 : 16, marginRight: 8 }}
              >
                Transformar em Task
              </Button>
              <Button
                danger
                icon={<CloseCircleOutlined />}
                onClick={handleClose}
                style={{ minWidth: isMobile ? 120 : 140, fontSize: isMobile ? 13 : 16 }}
              >
                Encerrar Conversa
              </Button>
            </>
          )}
        </Space> */}
      </Card>
      <Divider />
      <Card title="Mensagens" bordered style={{ marginBottom: 24, position: 'relative', minHeight: 400 }}>
        <div
          style={{
            maxHeight: 350,
            overflowY: 'auto',
            background: '#f9f9f9',
            padding: isMobile ? 4 : 16,
            borderRadius: 8,
            marginBottom: 56,
          }}
        >
          {messageData.messages && messageData.messages.length > 0 ? (
            messageData.messages.map((msg) => {
              const isClient = msg.sender_id === client?.id;
              const isLoggedUser = msg.sender_id === loggedUserId;
              console.log('isClient: ',isClient);
              console.log('isLoggedUser: ',isLoggedUser);
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: isLoggedUser ? 'row-reverse' : 'row',
                    marginBottom: 16,
                  }}
                >
                  <Avatar
                    icon={<UserOutlined />}
                    style={{
                      background: isClient ? '#1890ff' : '#52c41a',
                      marginLeft: isClient ? 8 : 0,
                      marginRight: isClient ? 0 : 8,
                    }}
                  />
                  <div
                    style={{
                      background: isClient ? '#e6f7ff' : '#f6ffed',
                      border: `1px solid ${isClient ? '#91d5ff' : '#b7eb8f'}`,
                      borderRadius: isClient ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                      padding: isMobile ? '8px 10px' : '10px 16px',
                      minWidth: 80,
                      maxWidth: isMobile ? '70%' : 350,
                      wordBreak: 'break-word',
                      boxShadow: '0 1px 4px #0001',
                    }}
                  >
                    <div style={{ fontSize: 13, color: '#888', marginBottom: 2 }}>
                      {isClient ? 'Você' : 'Agente'}
                      <span style={{ float: 'right', fontSize: 11, color: '#bbb' }}>
                        {date_format(msg.created_at * 1000)}
                      </span>
                    </div>
                    <div style={{ fontSize: 15, color: '#222', marginBottom: 2 }}>{msg.message}</div>
                    {msg.message_type !== 'text' && msg.file_url && msg.file_url.trim() !== '' && (
                      <div style={{ marginTop: 4 }}>
                        <a href={msg.file_url} target="_blank" rel="noopener noreferrer">Arquivo</a>
                      </div>
                    )}
                    <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>
                      Tipo: {msg.message_type}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', color: '#bbb', padding: 24 }}>Nenhuma mensagem ainda.</div>
          )}
        </div>
        {/* Campo de resposta estilo chat */}
        <Form
          form={form}
          layout="inline"
          onFinish={handleReplyFinish}
          style={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            width: '100%',
            background: '#fff',
            borderTop: '1px solid #eee',
            padding: isMobile ? 6 : 12,
            display: 'flex',
            alignItems: 'center',
            zIndex: 0,
          }}
        >
          <Form.Item
            name="sender_id"
            initialValue={client?.id}
            style={{ display: 'none' }}
          >
            <Input type="hidden" />
          </Form.Item>
          <Form.Item
            name="message"
            style={{ flex: 1, marginBottom: 0 }}
            rules={[{ required: true, message: 'Digite sua mensagem' }]}
          >
            <Input
              placeholder="Digite sua mensagem..."
              autoComplete="off"
              style={{ borderRadius: 20, paddingLeft: 16, paddingRight: 16, fontSize: isMobile ? 14 : 16}}
              onPressEnter={e => {
                if (!e.shiftKey) form.submit();
              }}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, marginLeft: 8 }}>
            <Button
              type="primary"
              htmlType="submit"
              shape="circle"
              icon={<CheckCircleOutlined />}
              style={{ width: 40, height: 40, fontSize: 20 }}
            />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}



export default ViewMessage
