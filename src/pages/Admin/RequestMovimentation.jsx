import React, { useState } from 'react'
import { useAdminExtractGet } from '../../hooks/useWallet.query';
import { Button, Modal, notification, Card, Avatar, Typography, Divider, Badge } from 'antd';
import { Text } from "@chakra-ui/react";
import { ImageViewer } from 'antd-mobile';
import { useAcceptRequestMovimentation, useRejectRequestMovimentation } from '../../hooks/useWallet.query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Flex } from "antd";
import { CalendarOutline, CameraOutline, CheckCircleOutline, CloseCircleOutline, EyeOutline } from 'antd-mobile-icons';
import { AiOutlineFileText } from 'react-icons/ai';
import { CiUser } from "react-icons/ci";
import { PiIdentificationCardLight } from "react-icons/pi";
import { LiaCreditCardSolid } from "react-icons/lia";

const { Title, Paragraph } = Typography;

function RequestMovimentation() {
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [visible, setVisible] = useState(false);
  const { data, isLoading, isError } = useAdminExtractGet();

  const { mutate: acceptRequestMovimentation, isPending: isAccepting } = useMutation({
    mutationFn: useAcceptRequestMovimentation,
    onSuccess: (data) => {
      setIsModalOpen(false);
      api.success({
        message: 'Solicitação aprovada com sucesso!',
        description: data.message,
        placement: 'topRight',
        style: {
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
          color: 'white',
          border: 'none'
        }
      });
      queryClient.invalidateQueries("admin-extract");
    },
    onError: (error) => {
      api.error({
        message: 'Erro ao aprovar solicitação',
        description: error.message,
        placement: 'topRight',
        style: {
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)',
          color: 'white',
          border: 'none'
        }
      });
      console.log("error: ", error);
    }
  });

  const { mutate: rejectRequestMovimentation, isPending: isRejecting } = useMutation({
    mutationFn: useRejectRequestMovimentation,
    onSuccess: (data) => {
      setIsModalOpen(false);
      api.success({
        message: 'Solicitação rejeitada com sucesso!',
        description: data.message,
        placement: 'topRight',
        style: {
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #faad14 0%, #ffc53d 100%)',
          color: 'white',
          border: 'none'
        }
      });
      queryClient.invalidateQueries("admin-extract");
    },
    onError: (error) => {
      api.error({
        message: 'Erro ao rejeitar solicitação',
        description: error.message,
        placement: 'topRight',
        style: {
          borderRadius: '12px',
          background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)',
          color: 'white',
          border: 'none'
        }
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
    acceptRequestMovimentation(record);
  }

  const handleReject = (record) => {
    rejectRequestMovimentation(record);
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: '#faad14', text: 'Pendente', icon: '⏳' },
      accepted: { color: '#52c41a', text: 'Aprovado', icon: '✅' },
      rejected: { color: '#ff4d4f', text: 'Rejeitado', icon: '❌' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <Badge 
        color={config.color} 
        text={config.text}
        style={{ 
          fontSize: '12px',
          fontWeight: '600',
          padding: '4px 8px',
          borderRadius: '12px',
          background: `${config.color}15`,
          color: config.color,
          border: `1px solid ${config.color}30`
        }}
      />
    );
  };

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
      
      {/* Header Section */}
      <Card
        style={{
          marginBottom: "24px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
          border: "none",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(8, 19, 49, 0.3)",
          position: "relative"
        }}
        bodyStyle={{ padding: "28px" }}
      >
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "translate(50%, -50%)"
        }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Flex align="center" gap={12}>
            <div style={{
              width: 48,
              height: 48,
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(10px)'
            }}>
              <AiOutlineFileText style={{ fontSize: 24, color: 'white' }} />
            </div>
            <div>
              <Title 
                level={3} 
                style={{ 
                  color: "white", 
                  margin: "0 0 8px 0",
                  fontSize: "24px",
                  fontWeight: "700",
                  textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
                }}
              >
                Solicitações de Extrato
              </Title>
              <Text style={{ 
                color: "rgba(255, 255, 255, 0.9)", 
                margin: 0,
                fontSize: "16px",
                fontWeight: "400"
              }}>
                Gerencie as solicitações de extrato dos usuários
              </Text>
            </div>
          </Flex>
        </div>
      </Card>

      {/* Statistics Cards */}
      <div style={{ marginBottom: 24 }}>
        <Flex gap={12} wrap="wrap">
          <Card
            style={{
              flex: 1,
              minWidth: 120,
              borderRadius: 16,
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
            bodyStyle={{ padding: '20px', textAlign: 'center' }}
          >
            <div style={{ fontSize: 32, fontWeight: 'bold', color: '#081331', marginBottom: 8 }}>
              {data?.filter(item => item.status === 'pending').length || 0}
            </div>
            <div style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>Pendentes</div>
          </Card>
          
          <Card
            style={{
              flex: 1,
              minWidth: 120,
              borderRadius: 16,
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
            bodyStyle={{ padding: '20px', textAlign: 'center' }}
          >
            <div style={{ fontSize: 32, fontWeight: 'bold', color: '#52c41a', marginBottom: 8 }}>
              {data?.filter(item => item.status === 'accepted').length || 0}
            </div>
            <div style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>Aprovadas</div>
          </Card>
          
          <Card
            style={{
              flex: 1,
              minWidth: 120,
              borderRadius: 16,
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)'
            }}
            bodyStyle={{ padding: '20px', textAlign: 'center' }}
          >
            <div style={{ fontSize: 32, fontWeight: 'bold', color: '#ff4d4f', marginBottom: 8 }}>
              {data?.filter(item => item.status === 'rejected').length || 0}
            </div>
            <div style={{ fontSize: 14, color: '#666', fontWeight: 500 }}>Rejeitadas</div>
          </Card>
        </Flex>
      </div>

      {/* Requests List */}
      <div>
        {isLoading ? (
          <Card style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: 16, color: '#666' }}>Carregando solicitações...</div>
          </Card>
        ) : data?.length === 0 ? (
          <Card style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: 16, color: '#666' }}>Nenhuma solicitação encontrada</div>
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data?.map((item) => (
              <Card
                key={item.id}
                                 style={{
                   borderRadius: 16,
                   background: 'rgba(255, 255, 255, 0.9)',
                   border: '1px solid rgba(255, 255, 255, 0.2)',
                   boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                   backdropFilter: 'blur(10px)',
                   cursor: 'pointer',
                   transition: 'all 0.3s ease'
                 }}
                 onMouseEnter={(e) => {
                   e.currentTarget.style.transform = 'translateY(-2px)';
                   e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
                 }}
                 onMouseLeave={(e) => {
                   e.currentTarget.style.transform = 'translateY(0)';
                   e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                 }}
                bodyStyle={{ padding: '20px' }}
                onClick={() => handleAction(item)}
              >
                <Flex justify="space-between" align="center">
                  <Flex align="center" gap={12} flex={1}>
                    <Avatar
                      size={48}
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        fontSize: 18,
                        fontWeight: 'bold'
                      }}
                    >
                      {item.name?.charAt(0)?.toUpperCase() || 'U'}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontSize: 16, 
                        fontWeight: '600', 
                        color: '#081331',
                        marginBottom: 4
                      }}>
                        {item.name}
                      </div>
                      <div style={{ 
                        fontSize: 14, 
                        color: '#666',
                        marginBottom: 4
                      }}>
                        Conta: {item.account_number}
                      </div>
                      <div style={{ 
                        fontSize: 12, 
                        color: '#999'
                      }}>
                        {formatDate(item.created_at)}
                      </div>
                    </div>
                  </Flex>
                  <div>
                    {getStatusBadge(item.status)}
                  </div>
                </Flex>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Modal de Detalhes */}
      <Modal
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={400}
        style={{ top: 20 }}
        bodyStyle={{ padding: 0, borderRadius: 16 }}
      >
        <div style={{ padding: 24 }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Avatar
              size={64}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontSize: 24,
                fontWeight: 'bold',
                marginBottom: 12
              }}
            >
              {selectedRecord?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Avatar>
            <Title level={4} style={{ margin: '12px 0 8px 0', color: '#081331' }}>
              {selectedRecord?.name}
            </Title>
            {getStatusBadge(selectedRecord?.status)}
          </div>

          <Divider style={{ margin: '16px 0' }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <CiUser style={{ fontSize: 18, color: '#666' }} />
              <div>
                <div style={{ fontSize: 12, color: '#999', marginBottom: 2 }}>Nome</div>
                <div style={{ fontSize: 14, color: '#081331', fontWeight: 500 }}>
                  {selectedRecord?.name}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <LiaCreditCardSolid style={{ fontSize: 18, color: '#666' }} />
              <div>
                <div style={{ fontSize: 12, color: '#999', marginBottom: 2 }}>Número da Conta</div>
                <div style={{ fontSize: 14, color: '#081331', fontWeight: 500 }}>
                  {selectedRecord?.account_number}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <PiIdentificationCardLight style={{ fontSize: 18, color: '#666' }} />
              <div>
                <div style={{ fontSize: 12, color: '#999', marginBottom: 2 }}>Passaporte</div>
                <div style={{ fontSize: 14, color: '#081331', fontWeight: 500 }}>
                  {selectedRecord?.passport}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <CalendarOutline style={{ fontSize: 18, color: '#666' }} />
              <div>
                <div style={{ fontSize: 12, color: '#999', marginBottom: 2 }}>Data da Solicitação</div>
                <div style={{ fontSize: 14, color: '#081331', fontWeight: 500 }}>
                  {formatDate(selectedRecord?.created_at)}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <CameraOutline style={{ fontSize: 18, color: '#666' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: '#999', marginBottom: 8 }}>Selfie</div>
                <div 
                  style={{
                    width: '100%',
                    height: 120,
                    borderRadius: 12,
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    border: '2px solid #f0f0f0'
                  }}
                  onClick={() => setVisible(true)}
                >
                  <img 
                    src={selectedRecord?.selfie} 
                    alt="Selfie" 
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                                     <div style={{
                     position: 'absolute',
                     top: 0,
                     left: 0,
                     right: 0,
                     bottom: 0,
                     background: 'rgba(0,0,0,0.3)',
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'center',
                     opacity: 0,
                     transition: 'opacity 0.2s ease'
                   }} 
                   onMouseEnter={(e) => e.target.style.opacity = 1}
                   onMouseLeave={(e) => e.target.style.opacity = 0}>
                    <EyeOutline style={{ fontSize: 24, color: 'white' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {selectedRecord?.status === 'pending' && (
            <>
              <Divider style={{ margin: '24px 0' }} />
              <div style={{ display: 'flex', gap: 12 }}>
                <Button
                  type="primary"
                  size="large"
                  icon={<CheckCircleOutline />}
                  loading={isAccepting}
                  onClick={() => handleApprove(selectedRecord.id)}
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, #52c41a 0%, #73d13d 100%)',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: 16
                  }}
                >
                  Aprovar
                </Button>
                <Button
                  danger
                  size="large"
                  icon={<CloseCircleOutline />}
                  loading={isRejecting}
                  onClick={() => handleReject(selectedRecord.id)}
                  style={{
                    flex: 1,
                    height: 48,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, #ff4d4f 0%, #ff7875 100%)',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: 16
                  }}
                >
                  Rejeitar
                </Button>
              </div>
            </>
          )}
        </div>

        <ImageViewer
          classNames={{
            mask: 'customize-mask',
            body: 'customize-body',
          }}
          image={selectedRecord?.selfie}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      </Modal>
    </div>
  )
}

export default RequestMovimentation
