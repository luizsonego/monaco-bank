import React from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useMessageIdGet, useMessageIdPost, useCreateTaskPost } from '../../hooks/useMessage.query';
import { Card, Tag, Descriptions, Spin, Button, Avatar, Space, Typography, Divider, message as antdMessage, Form, Input, notification } from 'antd';
import { UserOutlined, MailOutlined, CheckCircleOutlined, CloseCircleOutlined, MessageOutlined, LeftOutlined, MoreOutlined, PhoneOutlined, SendOutlined } from '@ant-design/icons';
import { date_format } from '../../Helpers/dateFormat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProfileGet } from '../../hooks/useProfile.query';
const {  Text } = Typography;


function Mensagens() {
  let { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [api, contextHolder] = notification.useNotification();
  
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

  if (loadingMessage) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}><Spin size="large" /></div>;
  }

  if (!messageData) {
    return <div style={{ textAlign: 'center', marginTop: 40 }}><Text type="danger">Mensagem não encontrada.</Text></div>;
  }

  const { status, subject, priority, created_at, updated_at, closed_at, client, agent } = messageData;

  return (
    <div style={{
      // backgroundColor: '#F0F0F0',
      maxHeight: "90vh",
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1001,
      flex: 1,
      overflow: 'hidden',
      paddingBottom: 40
    }}>
      {contextHolder}
      

      {/* Chat Header */}
      <div style={{
        background: '#f9f9f9',
        backdropFilter: 'blur(10px)',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #e8e8e8',
      }}>
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={() => navigate(-1)}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#f0f0f0',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        <div style={{
          textAlign: 'center',
          flex: 1,
        }}>
          <div style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#333',
          }}>
            {agent?.name || 'Agente'}
          </div>
        </div>
        <Button
          type="text"
          icon={<MoreOutlined />}
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: '#f0f0f0',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </div>

      {/* Área de Mensagens */}
      <div style={{
        flex: 1,
        padding: '16px 20px',
        overflowY: 'auto',
        background: '#f0f0f0',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxHeight: 'calc(100vh - 100px)',
        // top: '-60px',
        // position: 'relative',
        // zIndex: -1,
      
      }}>
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
                  alignItems: 'flex-start',
                  gap: 8,
                }}
              >
                <Avatar
                  icon={<UserOutlined />}
                  style={{
                    background: isClient ? '#1890ff' : '#52c41a',
                    flexShrink: 0,
                    width: 32,
                    height: 32,
                    fontSize: 14,
                  }}
                />
                <div
                  style={{
                    background: isLoggedUser ? '#1890ff' : '#ffffff',
                    color: isLoggedUser ? 'white' : '#333',
                    borderRadius: isLoggedUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                    padding: '12px 16px',
                    maxWidth: '70%',
                    wordBreak: 'break-word',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
                    fontSize: 14,
                    lineHeight: 1.4,
                  }}
                >
                  {msg.message}
                  {msg.message_type !== 'text' && msg.file_url && msg.file_url.trim() !== '' && (
                    <div style={{ marginTop: 8 }}>
                      <a 
                        href={msg.file_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        style={{
                          color: isLoggedUser ? 'rgba(255, 255, 255, 0.8)' : '#1890ff',
                          textDecoration: 'none',
                          fontSize: 12,
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
      
      {/* Campo de resposta estilo chat */}
      <div style={{
        background: '#ffffff',
        padding: '16px 20px',
        borderTop: '1px solid #e8e8e8',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: 1000,
      }}>
        <Form
          form={form}
          layout="inline"
          onFinish={handleReplyFinish}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
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
              placeholder="Type something...."
              autoComplete="off"
              style={{ 
                borderRadius: 24, 
                paddingLeft: 20, 
                paddingRight: 20, 
                fontSize: 16,
                height: 48,
                border: '1px solid #d9d9d9',
                background: '#f9f9f9',
              }}
              onPressEnter={e => {
                if (!e.shiftKey) form.submit();
              }}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              type="primary"
              htmlType="submit"
              shape="circle"
              icon={<SendOutlined />}
              style={{ 
                width: 48, 
                height: 48, 
                fontSize: 16,
                background: '#1890ff',
                border: 'none',
                boxShadow: '0 2px 8px rgba(24, 144, 255, 0.3)',
              }}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Mensagens
