import React, { useState, useMemo } from 'react';
import { Button, List, Modal, Input, Select, Form, notification, Avatar, Badge, Empty, Spin } from 'antd';
import { useConversationGet, useConversationPost } from '../../hooks/useMessage.query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { 
  MessageOutlined, 
  PlusOutlined, 
  SearchOutlined, 
  MoreOutlined,
  UserOutlined,
  ClockCircleOutlined,
  FilterOutlined,
  DownOutlined,
  TeamOutlined
} from '@ant-design/icons';

const { Option } = Select;

// Mock data mais realista baseado na imagem
const mockConversations = [
  {
    id: 1,
    name: 'João Pereira',
    lastMessage: 'Olá, vi o anúncio de vocês e quer...',
    participants: ['José Bueno'],
    unreadCount: 1,
    platform: 'whatsapp',
    avatar: 'JP',
    time: '10:30'
  },
  {
    id: 2,
    name: 'Janaina Ferreira',
    lastMessage: 'Você consegue me ajudar com is...',
    participants: ['Jéssica Gomes'],
    unreadCount: 3,
    platform: 'instagram',
    avatar: 'JF',
    time: '09:15'
  },
  {
    id: 3,
    name: 'Fábio Yassuda',
    lastMessage: 'José Bueno diz: Fábio, seu pedid...',
    participants: ['José Bueno'],
    unreadCount: 0,
    platform: 'messenger',
    avatar: 'FY',
    time: 'Ontem'
  }
];

function Message() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
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
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'whatsapp': return '#25D366';
      case 'instagram': return '#E4405F';
      case 'messenger': return '#0084FF';
      default: return '#667eea';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'whatsapp': return '💬';
      case 'instagram': return '📷';
      case 'messenger': return '💙';
      default: return '💬';
    }
  };

  const getAvatarColor = (name) => {
    const colors = [
      '#667eea', '#764ba2', '#f093fb', '#f5576c',
      '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
      '#fa709a', '#fee140', '#a8edea', '#fed6e3'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  // Usar dados mock se não houver dados reais
  const conversations = conversationsData || mockConversations;
  
  // Busca funcional
  const filteredConversations = useMemo(() => {
    if (!conversations) return [];
    
    return conversations.filter(conv => {
      const searchLower = searchText.toLowerCase();
      const name = conv.name?.toLowerCase() || conv.subject?.toLowerCase() || '';
      const lastMessage = conv.lastMessage?.toLowerCase() || conv.last_message?.toLowerCase() || '';
      
      return name.includes(searchLower) || lastMessage.includes(searchLower);
    });
  }, [conversations, searchText]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const clearSearch = () => {
    setSearchText('');
  };

  return (
    <div style={{ 
        marginTop: 25,
        backgroundColor: '#F0F0F0',
        background: 'linear-gradient(90deg,rgba(240, 240, 240, 1) 0%, rgba(204, 204, 204, 1) 100%)',
        flex: 1,
        borderRadius: '25px 25px 0 0',
        paddingTop: 30,
        // paddingLeft: 15,
        // paddingRight: 15,
        // maxWidth: 480, 
        margin: '0 auto', 
        boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        width: '100%'
    }}>
      {contextHolder}
      
      {/* Header Compacto */}
      <div style={{
        // backgroundColor: '#fff',
        padding: '16px 20px',
        borderBottom: '1px solid #f0f0f0',
        position: 'sticky',
        top: 0,
        zIndex: 10
      }}>
        {/* Top Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '18px'
            }}>
              <MessageOutlined />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontSize: '18px',
                fontWeight: 600,
                color: '#1a1a1a'
              }}>
                Todas as conversas ({filteredConversations.length})
              </span>
              <DownOutlined style={{ color: '#666', fontSize: '12px' }} />
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* <Button
              type="text"
              icon={<FilterOutlined />}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666'
              }}
            /> */}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleOpen}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
            />
          </div>
        </div>

        {/* Barra de Busca */}
        <div style={{ position: 'relative' }}>
          <Input
            placeholder="Pesquisar no chat"
            prefix={<SearchOutlined style={{ color: '#999' }} />}
            value={searchText}
            onChange={handleSearch}
            style={{
              borderRadius: '24px',
              height: '44px',
              fontSize: '15px',
              border: '1px solid #e0e0e0',
              backgroundColor: '#f8f9fa',
              paddingLeft: '16px',
              paddingRight: '16px'
            }}
          />
          {searchText && (
            <Button
              type="text"
              size="small"
              onClick={clearSearch}
              style={{
                position: 'absolute',
                right: '8px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999',
                padding: '0',
                minWidth: 'auto',
                width: '24px',
                height: '24px',
                borderRadius: '50%'
              }}
            >
              ✕
            </Button>
          )}
        </div>
      </div>

      {/* Lista de Conversas */}
      <div style={{ backgroundColor: '#fff' }}>
        {loadingConversations ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            padding: '60px 20px' 
          }}>
            <Spin size="large" />
          </div>
        ) : filteredConversations.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            {searchText ? (
              <Empty
                description={
                  <div>
                    <p style={{ color: '#666', fontSize: '16px', marginBottom: '8px' }}>
                      Nenhuma conversa encontrada
                    </p>
                    <Button 
                      type="link" 
                      onClick={clearSearch}
                      style={{ color: '#667eea', fontWeight: 500 }}
                    >
                      Limpar busca
                    </Button>
                  </div>
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ) : (
              <Empty
                description="Nenhuma conversa encontrada"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            )}
          </div>
        ) : (
          <List
            dataSource={filteredConversations}
            renderItem={(item, index) => (
              <List.Item 
                key={item.id} 
                onClick={() => handleNavigate(item.id)}
                style={{ 
                  cursor: 'pointer',
                  padding: '16px 20px',
                  borderBottom: '1px solid #f0f0f0',
                  transition: 'all 0.2s ease',
                  backgroundColor: index === 2 ? '#f8f9ff' : '#fff', // Destacar o terceiro item como na imagem
                  borderRadius: index === 2 ? '12px' : '0',
                  margin: index === 2 ? '8px 12px' : '0',
                  boxShadow: index === 2 ? '0 2px 8px rgba(102, 126, 234, 0.1)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (index !== 2) {
                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== 2) {
                    e.currentTarget.style.backgroundColor = '#fff';
                  }
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  width: '100%',
                  gap: '12px'
                }}>
                  {/* Avatar com Badge de Plataforma */}
                  <div style={{ position: 'relative' }}>
                    <Avatar 
                      size={48}
                      style={{
                        backgroundColor: getAvatarColor(item.name || item.subject || ''),
                        fontSize: '16px',
                        fontWeight: 600,
                        color: 'white'
                      }}
                    >
                      {item.avatar || (item.name ? item.name.substring(0, 2).toUpperCase() : 'U')}
                    </Avatar>
                    <div style={{
                      position: 'absolute',
                      bottom: '-2px',
                      right: '-2px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: getPlatformColor(item.platform || 'default'),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      color: 'white',
                      border: '2px solid #fff'
                    }}>
                      {getPlatformIcon(item.platform || 'default')}
                    </div>
                  </div>

                  {/* Conteúdo da Conversa */}
                  <div style={{ 
                    flex: 1,
                    minWidth: 0
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '4px'
                    }}>
                      <h3 style={{
                        margin: 0,
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#1a1a1a',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.name || item.subject || 'Conversa sem título'}
                      </h3>
                      <span style={{
                        color: '#999',
                        fontSize: '12px',
                        fontWeight: 500
                      }}>
                        {item.time || 'Agora'}
                      </span>
                    </div>
                    
                    <p style={{
                      margin: 0,
                      color: '#666',
                      fontSize: '14px',
                      lineHeight: '1.4',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      marginBottom: '4px'
                    }}>
                      {item.lastMessage || item.last_message || 'Nova conversa iniciada'}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <TeamOutlined style={{ 
                        color: '#999', 
                        fontSize: '12px' 
                      }} />
                      <span style={{
                        color: '#999',
                        fontSize: '12px'
                      }}>
                        {item.participants ? item.participants[0] : 'Participante'}
                      </span>
                    </div>
                  </div>

                  {/* Badge de Mensagens Não Lidas */}
                  {item.unreadCount > 0 && (
                    <Badge
                      count={item.unreadCount}
                      style={{
                        backgroundColor: '#ff4757',
                        color: 'white',
                        fontWeight: 600
                      }}
                    />
                  )}
                </div>
              </List.Item>
            )}
          />
        )}
      </div>

      {/* Modal de Nova Conversa */}
      <Modal
        title={
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px',
            fontSize: '18px',
            fontWeight: 600,
            color: '#1a1a1a'
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '16px'
            }}>
              <PlusOutlined />
            </div>
            Nova Conversa
          </div>
        }
        open={open}
        onCancel={handleClose}
        footer={null}
        width={400}
        centered
        style={{ borderRadius: '16px' }}
      >
        <Form
          form={form}
          layout="vertical"
          name="create-conversation"
          onFinish={onFinish}
          style={{ marginTop: '20px' }}
        >
          <Form.Item
            name="subject"
            label="Nome da Conversa"
            rules={[{ required: true, message: 'Digite o nome da conversa' }]}
          >
            <Input 
              placeholder="Ex: Suporte Cliente" 
              size="large"
              style={{ 
                borderRadius: '12px',
                height: '44px',
                fontSize: '16px'
              }}
            />
          </Form.Item>
          
          <Form.Item
            name="priority"
            label="Prioridade"
            initialValue={undefined}
          >
            <Select 
              placeholder="Selecione a prioridade (opcional)" 
              allowClear
              size="large"
              style={{ borderRadius: '12px' }}
            >
              <Option value="low">
                <span style={{ color: '#10b981', marginRight: '8px' }}>🟢</span> Baixa
              </Option>
              <Option value="medium">
                <span style={{ color: '#f59e0b', marginRight: '8px' }}>🟡</span> Média
              </Option>
              <Option value="high">
                <span style={{ color: '#ef4444', marginRight: '8px' }}>🔴</span> Alta
              </Option>
            </Select>
          </Form.Item>
          
          <Form.Item style={{ marginBottom: 0, marginTop: '24px' }}>
            <Button
              loading={!!isPending}
              style={{ 
                width: '100%', 
                height: '48px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
              }}
              type="primary"
              htmlType="submit"
            >
              Criar Conversa
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Message;
