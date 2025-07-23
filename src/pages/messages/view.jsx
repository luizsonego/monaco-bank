import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useMessageIdGet, useMessageIdPost, useCreateTaskPost } from '../../hooks/useMessage.query';
import { Card, Tag, Descriptions, Spin, Button, Avatar, Space, Typography, Divider, message as antdMessage, Form, Input, notification } from 'antd';
import { UserOutlined, MailOutlined, CheckCircleOutlined, CloseCircleOutlined, MessageOutlined, LeftOutlined, MoreOutlined, PhoneOutlined } from '@ant-design/icons';
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
  const navigate = useNavigate();
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

  const { mutate: postMessageId } = useMutation({
    mutationFn: useMessageIdPost,
    onSuccess: (data) => {
      api.info({
        message: data.message,
      });
      if (data.status === 201) {
        form.resetFields();
      }
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
        form.resetFields();
      }
      queryClient.invalidateQueries("message-id");
    },
  });

  const [form] = Form.useForm();

  const handleClose = () => {
    antdMessage.info('Função de fechar conversa ainda não implementada.');
  };

  const handleReplyFinish = (values) => {
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
      {contextHolder}
      
      {/* Header com navegação */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24,
        padding: '16px 0',
      }}>
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={() => navigate(-1)}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        />
        <Title level={4} style={{ margin: 0, color: '#081331', fontSize: isMobile ? 18 : 20 }}>
          {client?.username || 'Cliente'}
        </Title>
        <Button
          type="text"
          icon={<MoreOutlined />}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>

      {/* Botões de Status */}
      <div style={{
        display: 'flex',
        gap: 12,
        marginBottom: 24,
      }}>
        <Button
          type="primary"
          style={{
            flex: 1,
            height: 48,
            borderRadius: 12,
            background: status === 'open' ? '#52c41a' : '#d9d9d9',
            border: 'none',
            fontSize: 16,
            fontWeight: '600',
            color: status === 'open' ? 'white' : '#666',
            boxShadow: status === 'open' ? '0 4px 12px rgba(82, 196, 26, 0.3)' : 'none',
          }}
        >
          OPEN
        </Button>
        <Button
          type="primary"
          style={{
            flex: 1,
            height: 48,
            borderRadius: 12,
            background: priority === 'high' ? '#ff4d4f' : '#d9d9d9',
            border: 'none',
            fontSize: 16,
            fontWeight: '600',
            color: priority === 'high' ? 'white' : '#666',
            boxShadow: priority === 'high' ? '0 4px 12px rgba(255, 77, 79, 0.3)' : 'none',
          }}
        >
          HIGH
        </Button>
      </div>
<Button
          type="primary"
          style={{
            flex: 1,
            height: 48,
            borderRadius: 12,
            background:  '#fff',
            border: '1px solid #d9d9d9',
            fontSize: 16,
            fontWeight: '600',
            color: '#666',
            width: '100%',
          }}
          onClick={() => navigate(`/messages/message/${id}`)}
        >
          Mensagens
        </Button>
      <Divider />

      {/* Informações de Data */}
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
        bodyStyle={{ padding: '20px' }}
      >
        <div style={{ marginBottom: 16 }}>
          <Text style={{ fontSize: 15, color: '#081331', fontWeight: '600' }}>
            Criado em: {date_format(created_at * 1000)}
          </Text>
        </div>
        <div>
          <Text style={{ fontSize: 15, color: '#081331', fontWeight: '600' }}>
            Atualizado em: {date_format(updated_at * 1000)}
          </Text>
        </div>
      </Card>

      {/* Seção Cliente */}
      <Card
        style={{
          marginBottom: 24,
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
        bodyStyle={{ padding: '20px' }}
      >
        <div style={{
          textAlign: 'center',
          marginBottom: 20,
          paddingBottom: 16,
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        }}>
          <Title level={4} style={{ margin: 0, color: '#081331', fontSize: 18 }}>
            Cliente
          </Title>
        </div>
        
        <Space direction="vertical" size={16} style={{ width: '100%' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            // gap: 12,
            // padding: '12px 0',
          }}>
            {/* <Avatar
              icon={<UserOutlined />}
              style={{
                background: 'linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)',
                width: 40,
                height: 40,
              }}
            /> */}
            <div style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, color: '#081331', fontWeight: '600', display: 'block' }}>
                {client?.username || 'Nome do Cliente'}
              </Text>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            // padding: '12px 0',
          }}>
            {/* <div style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: 'rgba(8, 19, 49, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <UserOutlined style={{ color: '#081331', fontSize: 18 }} />
            </div> */}
            <div style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, color: '#081331', fontWeight: '600', display: 'block' }}>
                {client?.username || ''}
              </Text>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            // padding: '12px 0',
          }}>
            {/* <div style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: 'rgba(8, 19, 49, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MailOutlined style={{ color: '#081331', fontSize: 18 }} />
            </div> */}
            <div style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, color: '#081331', fontWeight: '600', display: 'block' }}>
                {client?.email || 'carlos@monacobank.com.br'}
              </Text>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            // padding: '12px 0',
          }}>
            {/* <div style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: 'rgba(8, 19, 49, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <PhoneOutlined style={{ color: '#081331', fontSize: 18 }} />
            </div> */}
            <div style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, color: '#081331', fontWeight: '600', display: 'block' }}>
                {client?.phone || '11 99999-9999'}
              </Text>
            </div>
          </div>
        </Space>
      </Card>

      {/* Seção de Mensagens */}
      {/* <Card
        title={
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#081331',
            fontSize: 18,
            fontWeight: '600',
          }}>
            <MessageOutlined />
            Mensagens
          </div>
        }
        style={{
          marginBottom: 24,
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          minHeight: 400,
        }}
        bodyStyle={{ padding: '20px' }}
      >
        <div
          style={{
            maxHeight: 350,
            overflowY: 'auto',
            background: '#f9f9f9',
            padding: isMobile ? 12 : 16,
            borderRadius: 12,
            marginBottom: 80,
            border: '1px solid rgba(0, 0, 0, 0.06)',
          }}
        >
          {messageData.messages && messageData.messages.length > 0 ? (
            messageData.messages.map((msg) => {
              const isClient = msg.sender_id === client?.id;
              const isLoggedUser = msg.sender_id === loggedUserId;
              
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: isLoggedUser ? 'row-reverse' : 'row',
                    marginBottom: 16,
                    alignItems: 'flex-start',
                  }}
                >
                  <Avatar
                    icon={<UserOutlined />}
                    style={{
                      background: isClient ? 'linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)' : '#52c41a',
                      marginLeft: isClient ? 8 : 0,
                      marginRight: isClient ? 0 : 8,
                      flexShrink: 0,
                    }}
                  />
                  <div
                    style={{
                      background: isClient ? '#e6f7ff' : '#f6ffed',
                      border: `1px solid ${isClient ? '#91d5ff' : '#b7eb8f'}`,
                      borderRadius: isClient ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                      padding: isMobile ? '12px 16px' : '16px 20px',
                      minWidth: 80,
                      maxWidth: isMobile ? '75%' : 400,
                      wordBreak: 'break-word',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <div style={{ fontSize: 13, color: '#666', marginBottom: 4 }}>
                      {isClient ? 'Cliente' : 'Agente'}
                      <span style={{ float: 'right', fontSize: 11, color: '#999' }}>
                        {date_format(msg.created_at * 1000)}
                      </span>
                    </div>
                    <div style={{ fontSize: 15, color: '#081331', lineHeight: 1.4 }}>
                      {msg.message}
                    </div>
                    {msg.message_type !== 'text' && msg.file_url && msg.file_url.trim() !== '' && (
                      <div style={{ marginTop: 8 }}>
                        <a 
                          href={msg.file_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          style={{
                            color: '#1890ff',
                            textDecoration: 'none',
                            fontSize: 14,
                          }}
                        >
                          📎 Ver arquivo
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div style={{ 
              textAlign: 'center', 
              color: '#999', 
              padding: 40,
              fontSize: 16,
            }}>
              Nenhuma mensagem ainda.
            </div>
          )}
        </div>
        
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
            padding: isMobile ? 12 : 16,
            display: 'flex',
            alignItems: 'center',
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
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
              style={{ 
                borderRadius: 24, 
                paddingLeft: 20, 
                paddingRight: 20, 
                fontSize: isMobile ? 14 : 16,
                height: 48,
                border: '1px solid #d9d9d9',
              }}
              onPressEnter={e => {
                if (!e.shiftKey) form.submit();
              }}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, marginLeft: 12 }}>
            <Button
              type="primary"
              htmlType="submit"
              shape="circle"
              icon={<CheckCircleOutlined />}
              style={{ 
                width: 48, 
                height: 48, 
                fontSize: 18,
                background: 'linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(8, 19, 49, 0.3)',
              }}
            />
          </Form.Item>
        </Form>
      </Card> */}
    </div>
  );
}

export default ViewMessage
