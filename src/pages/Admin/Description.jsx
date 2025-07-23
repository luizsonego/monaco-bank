import React from "react";
import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Avatar, List } from "antd-mobile";
import { Button, Card, Divider, Empty, notification, Statistic, Typography, Badge, Tag, Progress, Tooltip } from "antd";
import { EditSOutline } from "antd-mobile-icons";
import {
  useProfileActive,
  useProfileDelete,
  useProfileDescriptionGet,
} from "../../hooks/useProfile.query";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../Helpers/moneyFormat";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  UserOutlined, 
  WalletOutlined, 
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  BankOutlined,
  HomeOutlined,
  PhoneOutlined,
  MailOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  SafetyCertificateOutlined,
  TrophyOutlined,
  StarOutlined,
  CrownOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
  ShieldOutlined,
  GlobalOutlined,
  CreditCardOutlined,
  SettingOutlined
} from "@ant-design/icons";

const { Title, Text: AntText } = Typography;

const Description = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const queryClient = useQueryClient();
  const [api, contextHolder] = notification.useNotification();
  const { data: profileData, isLoading } = useProfileDescriptionGet(id);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const { mutate } = useMutation({
    mutationFn: useProfileActive,
    onSuccess: (data) => {
      api.success({
        message: data.message,
      });
      queryClient.invalidateQueries("profile");
      if (data.status === 201) {
        navigate(-1);
      }
    },
  });
  const { mutate: mutateDelete } = useMutation({
    mutationFn: useProfileDelete,
    onSuccess: (data) => {
      api.success({
        message: data.message,
      });
      queryClient.invalidateQueries("profile");
      if (data.status === 201) {
        navigate(-1);
      }
    },
  });

  const handleActivate = (data) => {
    mutate({ id: data });
  };
  const handleDelete = (data) => {
    mutateDelete({ id: data });
  };

  // Funções para determinar status e cores
  const getStatusInfo = (status) => {
    switch (status) {
      case 10:
        return { text: "Ativo", color: "#52c41a", icon: <CheckCircleOutlined />, bg: "#52c41a" };
      case 1:
        return { text: "Pendente", color: "#faad14", icon: <ClockCircleOutlined />, bg: "#faad14" };
      case 0:
        return { text: "Bloqueado", color: "#ff4d4f", icon: <ExclamationCircleOutlined />, bg: "#ff4d4f" };
      default:
        return { text: "Desconhecido", color: "#0c0c0c", icon: <ExclamationCircleOutlined />, bg: "#fafafa" };
    }
  };

  const getAccountLevel = (amount) => {
    if (amount >= 1000000) return { level: "Premium", color: "#722ed1", icon: <CrownOutlined /> };
    if (amount >= 500000) return { level: "Gold", color: "#faad14", icon: <TrophyOutlined /> };
    if (amount >= 100000) return { level: "Silver", color: "#8c8c8c", icon: <StarOutlined /> };
    return { level: "Standard", color: "#52c41a", icon: <UserOutlined /> };
  };

  const statusInfo = getStatusInfo(profileData?.user?.status);
  const accountLevel = getAccountLevel(profileData?.wallet?.amount || 0);

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

      {/* Header Card com Informações do Usuário */}
      <Card
        style={{
          marginBottom: "24px",
          borderRadius: "24px",
          background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
          border: "none",
          overflow: "hidden",
          boxShadow: "0 12px 40px rgba(8, 19, 49, 0.4)",
          position: "relative"
        }}
        bodyStyle={{ padding: "24px" }}
      >
        {/* Elementos decorativos de fundo */}
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
        <div style={{
          position: "absolute",
          bottom: -30,
          left: -30,
          width: "120px",
          height: "120px",
          background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)",
          borderRadius: "50%"
        }} />
        
        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Layout responsivo para mobile */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: "16px"
          }}>
            {/* Avatar e Badge */}
            <div style={{ position: "relative" }}>
              <Avatar
                size={80}
                src={profileData?.profile?.profile_pic}
                icon={<UserOutlined />}
                style={{ 
                  border: "4px solid rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                }}
              />
              {/* Badge de nível da conta */}
              <div style={{
                position: "absolute",
                bottom: "-6px",
                right: "-6px",
                background: accountLevel.color,
                borderRadius: "50%",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid white",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
              }}>
                {React.cloneElement(accountLevel.icon, { 
                  style: { color: "white", fontSize: "12px" } 
                })}
              </div>
            </div>
            
            {/* Informações do Cliente */}
            <div style={{ width: "100%" }}>
              {/* Nome e Status */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px"
              }}>
                <Title 
                  level={3} 
                  style={{ 
                    color: "white", 
                    margin: 0,
                    fontSize: "24px",
                    fontWeight: "800",
                    textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
                    textAlign: "center",
                    lineHeight: "1.2"
                  }}
                >
                  {profileData?.profile?.name || "Usuário"}
                </Title>
                <Tag
                  color={statusInfo.color}
                  style={{
                    background: statusInfo.bg,
                    border: `1px solid ${statusInfo.color}`,
                    borderRadius: "16px",
                    padding: "4px 12px",
                    fontSize: "11px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    margin: "0 auto"
                  }}
                >
                  {statusInfo.icon}
                  {statusInfo.text}
                </Tag>
              </div>
              
              {/* Informações Secundárias */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                  justifyContent: "center"
                }}>
                  <p style={{ 
                    color: "rgba(255, 255, 255, 0.9)", 
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: "500"
                  }}>
                    {profileData?.profile?.time_contract || "Cliente"}
                  </p>
                  {/* <div style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.5)"
                  }} /> */}
                  {/* <p style={{ 
                    color: "rgba(255, 255, 255, 0.8)", 
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: "500"
                  }}>
                    {accountLevel.level}
                  </p> */}
                </div>
                
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  justifyContent: "center"
                }}>
                  <BankOutlined style={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "12px" }} />
                  <p style={{ 
                    color: "rgba(255, 255, 255, 0.8)", 
                    margin: 0,
                    fontSize: "13px",
                    fontWeight: "400"
                  }}>
                    Conta: {profileData?.profile?.account_number || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Cards de Estatísticas Financeiras */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "16px",
        marginBottom: "24px"
      }}>
        {/* Card do Saldo da Carteira */}
        <Card
          style={{
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.95)",
            border: "none",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            backdropFilter: "blur(10px)",
            position: "relative",
            overflow: "hidden"
          }}
          bodyStyle={{ padding: "20px" }}
        >
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "60px",
            height: "60px",
            background: "linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            transform: "translate(30%, -30%)"
          }} />
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 20px rgba(76, 175, 80, 0.3)"
            }}>
              <WalletOutlined style={{ color: "white", fontSize: "20px" }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: "11px",
                color: "rgba(8, 19, 49, 0.6)",
                fontWeight: "600",
                marginBottom: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Saldo Disponível
              </div>
              <div style={{
                fontSize: "18px",
                fontWeight: "800",
                color: "#4CAF50",
                lineHeight: "1.2"
              }}>
                {formatCurrency(profileData?.wallet?.amount, "USD")}
              </div>
            </div>
          </div>
        </Card>

        {/* Card de Status da Conta */}
        <Card
          style={{
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.95)",
            border: "none",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            backdropFilter: "blur(10px)",
            position: "relative",
            overflow: "hidden"
          }}
          bodyStyle={{ padding: "20px" }}
        >
          <div style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "60px",
            height: "60px",
            background: `linear-gradient(135deg, ${statusInfo.color}15 0%, transparent 70%)`,
            borderRadius: "50%",
            transform: "translate(30%, -30%)"
          }} />
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "16px"
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: `linear-gradient(135deg, ${statusInfo.color} 0%, ${statusInfo.color}dd 100%)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 6px 20px ${statusInfo.color}30`
            }}>
              {React.cloneElement(statusInfo.icon, { 
                style: { color: "white", fontSize: "20px" } 
              })}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: "11px",
                color: "rgba(8, 19, 49, 0.6)",
                fontWeight: "600",
                marginBottom: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.5px"
              }}>
                Status da Conta
              </div>
              <div style={{
                fontSize: "18px",
                fontWeight: "800",
                color: statusInfo.color,
                lineHeight: "1.2"
              }}>
                {statusInfo.text}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Botões de Ação */}
      <Card
        style={{
          marginBottom: "24px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          border: "none",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          backdropFilter: "blur(10px)"
        }}
        bodyStyle={{ padding: "24px" }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px"
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(8, 19, 49, 0.3)"
          }}>
            <SettingOutlined style={{ color: "white", fontSize: "18px" }} />
          </div>
          <Title level={4} style={{ margin: 0, color: "#081331", fontSize: "18px" }}>
            Ações Administrativas
          </Title>
        </div>

        {profileData?.user?.status === 1 ? (
          <Button
            type="primary"
            size="large"
            block
            onClick={() => handleActivate(profileData?.profile?.user_id)}
            style={{
              height: "52px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
              border: "none",
              fontSize: "15px",
              fontWeight: "700",
              boxShadow: "0 6px 20px rgba(76, 175, 80, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            <CheckCircleOutlined />
            Ativar Usuário
          </Button>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => handleNavigate(`/admin/aporte/${id}`)}
              style={{
                height: "52px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #2196F3 0%, #1976D2 100%)",
                border: "none",
                fontSize: "15px",
                fontWeight: "700",
                boxShadow: "0 6px 20px rgba(33, 150, 243, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}
            >
              <RiseOutlined />
              Realizar Aporte
            </Button>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => handleNavigate(`/admin/saque/${id}`)}
              style={{
                height: "52px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #FF9800 0%, #F57C00 100%)",
                border: "none",
                fontSize: "15px",
                fontWeight: "700",
                boxShadow: "0 6px 20px rgba(255, 152, 0, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}
            >
              <FallOutlined />
              Realizar Saque
            </Button>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => handleNavigate(`/admin/lancamentos/${id}`)}
              style={{
                height: "52px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)",
                border: "none",
                fontSize: "15px",
                fontWeight: "700",
                boxShadow: "0 6px 20px rgba(156, 39, 176, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}
            >
              <CreditCardOutlined />
              Ver Lançamentos
            </Button>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => handleNavigate(`/admin/transfer/${id}`)}
              style={{
                height: "52px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #607D8B 0%, #455A64 100%)",
                border: "none",
                fontSize: "15px",
                fontWeight: "700",
                boxShadow: "0 6px 20px rgba(96, 125, 139, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}
            >
              <GlobalOutlined />
              Transferência
            </Button>
          </div>
        )}
        
        <Divider style={{ margin: "24px 0" }} />
        
        <Button
          type="primary"
          size="large"
          block
          danger
          onClick={() => handleDelete(profileData?.profile?.user_id)}
          style={{
            height: "52px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #F44336 0%, #D32F2F 100%)",
            border: "none",
            fontSize: "15px",
            fontWeight: "700",
            boxShadow: "0 6px 20px rgba(244, 67, 54, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px"
          }}
        >
          {/* <ShieldOutlined /> */}
          Deletar / Bloquear
        </Button>
      </Card>

      {/* Seção de Dados Pessoais */}
      <Card
        style={{
          marginBottom: "20px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          border: "none",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          backdropFilter: "blur(10px)"
        }}
        bodyStyle={{ padding: "0" }}
      >
        <div style={{
          padding: "24px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 16px rgba(8, 19, 49, 0.3)"
            }}>
              <UserOutlined style={{ color: "white", fontSize: "20px" }} />
            </div>
            <div>
              <span style={{ 
                fontSize: "18px", 
                fontWeight: "700", 
                color: "#081331"
              }}>
                Dados Pessoais
              </span>
              <div style={{
                fontSize: "12px",
                color: "rgba(8, 19, 49, 0.6)",
                fontWeight: "500",
                marginTop: "2px"
              }}>
                Informações básicas do cliente
              </div>
            </div>
          </div>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleNavigate(`/admin/edit-profile/${id}`)}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "rgba(8, 19, 49, 0.1)",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(8, 19, 49, 0.2)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(8, 19, 49, 0.1)";
              e.target.style.transform = "scale(1)";
            }}
          />
        </div>
        <List style={{ 
          background: "transparent",
          "--border-top": "none",
          "--border-bottom": "none"
        }}>
          <List.Item 
            title="Login"
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid rgba(0, 0, 0, 0.06)"
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <UserOutlined style={{ color: "rgba(8, 19, 49, 0.6)", fontSize: "14px" }} />
              {profileData?.user?.username || "-"}
            </div>
          </List.Item>
          <List.Item 
            title="Email"
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid rgba(0, 0, 0, 0.06)"
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <MailOutlined style={{ color: "rgba(8, 19, 49, 0.6)", fontSize: "14px" }} />
              {profileData?.profile?.email || "-"}
            </div>
          </List.Item>
          <List.Item 
            title="WhatsApp"
            style={{
              padding: "20px 24px",
              borderBottom: "1px solid rgba(0, 0, 0, 0.06)"
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <PhoneOutlined style={{ color: "rgba(8, 19, 49, 0.6)", fontSize: "14px" }} />
              {profileData?.profile?.whatsapp || "-"}
            </div>
          </List.Item>
          <List.Item 
            title="Telefone"
            style={{
              padding: "20px 24px"
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
              <PhoneOutlined style={{ color: "rgba(8, 19, 49, 0.6)", fontSize: "14px" }} />
              {profileData?.profile?.phone || "-"}
            </div>
          </List.Item>
        </List>
      </Card>

      {/* Seção de Endereço */}
      {profileData?.address?.zip_code === null ? (
        <Card
          style={{
            marginBottom: "20px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.95)",
            border: "none",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            backdropFilter: "blur(10px)"
          }}
          bodyStyle={{ padding: "24px" }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 16px rgba(8, 19, 49, 0.3)"
              }}>
                <HomeOutlined style={{ color: "white", fontSize: "20px" }} />
              </div>
              <div>
                <span style={{ 
                  fontSize: "18px", 
                  fontWeight: "700", 
                  color: "#081331"
                }}>
                  Endereço
                </span>
                <div style={{
                  fontSize: "12px",
                  color: "rgba(8, 19, 49, 0.6)",
                  fontWeight: "500",
                  marginTop: "2px"
                }}>
                  Localização do cliente
                </div>
              </div>
            </div>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleNavigate(`/admin/edit-address/${id}`)}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(8, 19, 49, 0.1)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            />
          </div>
          <Empty 
            description={
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "16px", color: "#666", marginBottom: "8px" }}>
                  Endereço não cadastrado
                </div>
                <div style={{ fontSize: "12px", color: "#999" }}>
                  Clique no botão abaixo para adicionar
                </div>
              </div>
            }
            style={{ margin: "20px 0" }}
          />
          <Button
            type="primary"
            size="large"
            block
            onClick={() => handleNavigate(`/admin/edit-address/${id}`)}
            style={{
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
              border: "none",
              fontSize: "16px",
              fontWeight: "700",
              boxShadow: "0 8px 24px rgba(76, 175, 80, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            <PlusOutlined />
            Adicionar Endereço
          </Button>
        </Card>
      ) : (
        <Card
          style={{
            marginBottom: "20px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.95)",
            border: "none",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            backdropFilter: "blur(10px)"
          }}
          bodyStyle={{ padding: "0" }}
        >
          <div style={{
            padding: "24px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 16px rgba(8, 19, 49, 0.3)"
              }}>
                <HomeOutlined style={{ color: "white", fontSize: "20px" }} />
              </div>
              <div>
                <span style={{ 
                  fontSize: "18px", 
                  fontWeight: "700", 
                  color: "#081331"
                }}>
                  Endereço
                </span>
                <div style={{
                  fontSize: "12px",
                  color: "rgba(8, 19, 49, 0.6)",
                  fontWeight: "500",
                  marginTop: "2px"
                }}>
                  Localização do cliente
                </div>
              </div>
            </div>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleNavigate(`/admin/edit-address/${id}`)}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(8, 19, 49, 0.1)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            />
          </div>
          <List style={{ 
            background: "transparent",
            "--border-top": "none",
            "--border-bottom": "none"
          }}>
            <List.Item 
              title="CEP"
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)"
              }}
            >
              {profileData?.address?.zip_code || "-"}
            </List.Item>
            <List.Item 
              title="Endereço"
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)"
              }}
            >
              {profileData?.address?.address}, {profileData?.address?.number}
            </List.Item>
            <List.Item 
              title="Complemento"
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)"
              }}
            >
              {profileData?.address?.complement || "-"}
            </List.Item>
            <List.Item 
              title="Bairro"
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)"
              }}
            >
              {profileData?.address?.neighborhood || "-"}
            </List.Item>
            <List.Item 
              title="Cidade"
              style={{
                padding: "20px 24px"
              }}
            >
              {profileData?.address?.city} - {profileData?.address?.state}
            </List.Item>
          </List>
        </Card>
      )}

      {/* Seção de Dados Bancários */}
      {profileData?.bank?.bank === null ? (
        <Card
          style={{
            marginBottom: "20px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.95)",
            border: "none",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            backdropFilter: "blur(10px)"
          }}
          bodyStyle={{ padding: "24px" }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 16px rgba(8, 19, 49, 0.3)"
              }}>
                <BankOutlined style={{ color: "white", fontSize: "20px" }} />
              </div>
              <div>
                <span style={{ 
                  fontSize: "18px", 
                  fontWeight: "700", 
                  color: "#081331"
                }}>
                  Dados Bancários
                </span>
                <div style={{
                  fontSize: "12px",
                  color: "rgba(8, 19, 49, 0.6)",
                  fontWeight: "500",
                  marginTop: "2px"
                }}>
                  Informações bancárias
                </div>
              </div>
            </div>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleNavigate(`/admin/edit-bank/${id}`)}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(8, 19, 49, 0.1)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            />
          </div>
          <Empty 
            description={
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "16px", color: "#666", marginBottom: "8px" }}>
                  Dados bancários não cadastrados
                </div>
                <div style={{ fontSize: "12px", color: "#999" }}>
                  Clique no botão abaixo para adicionar
                </div>
              </div>
            }
            style={{ margin: "20px 0" }}
          />
          <Button
            type="primary"
            size="large"
            block
            onClick={() => handleNavigate(`/admin/edit-bank/${id}`)}
            style={{
              height: "56px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
              border: "none",
              fontSize: "16px",
              fontWeight: "700",
              boxShadow: "0 8px 24px rgba(76, 175, 80, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px"
            }}
          >
            <PlusOutlined />
            Adicionar Dados Bancários
          </Button>
        </Card>
      ) : (
        <Card
          style={{
            marginBottom: "20px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.95)",
            border: "none",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
            backdropFilter: "blur(10px)"
          }}
          bodyStyle={{ padding: "0" }}
        >
          <div style={{
            padding: "24px",
            borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 6px 16px rgba(8, 19, 49, 0.3)"
              }}>
                <BankOutlined style={{ color: "white", fontSize: "20px" }} />
              </div>
              <div>
                <span style={{ 
                  fontSize: "18px", 
                  fontWeight: "700", 
                  color: "#081331"
                }}>
                  Dados Bancários
                </span>
                <div style={{
                  fontSize: "12px",
                  color: "rgba(8, 19, 49, 0.6)",
                  fontWeight: "500",
                  marginTop: "2px"
                }}>
                  Informações bancárias
                </div>
              </div>
            </div>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleNavigate(`/admin/edit-bank/${id}`)}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(8, 19, 49, 0.1)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            />
          </div>
          <List style={{ 
            background: "transparent",
            "--border-top": "none",
            "--border-bottom": "none"
          }}>
            <List.Item 
              title="Banco"
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)"
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <BankOutlined style={{ color: "rgba(8, 19, 49, 0.6)", fontSize: "14px" }} />
                {profileData?.bank?.bank || "-"}
              </div>
            </List.Item>
            <List.Item 
              title="Agência"
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)"
              }}
            >
              {profileData?.bank?.bank_agency || "-"}
            </List.Item>
            <List.Item 
              title="Conta"
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)"
              }}
            >
              {profileData?.bank?.bank_account || "-"}
            </List.Item>
            <List.Item 
              title="Tipo de conta"
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)"
              }}
            >
              {profileData?.bank?.bank_account_type || "-"}
            </List.Item>
            <List.Item 
              title="Número da conta"
              style={{
                padding: "20px 24px",
                borderBottom: "1px solid rgba(0, 0, 0, 0.06)"
              }}
            >
              {profileData?.bank?.bank_account_number || "-"}
            </List.Item>
            <List.Item 
              title="PIX"
              style={{
                padding: "20px 24px"
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <DollarOutlined style={{ color: "rgba(8, 19, 49, 0.6)", fontSize: "14px" }} />
                {profileData?.bank?.bank_pix || "-"}
              </div>
            </List.Item>
          </List>
        </Card>
      )}
    </div>
  );
};

export default Description;
