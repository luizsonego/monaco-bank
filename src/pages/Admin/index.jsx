import { List, Card } from "antd-mobile";
import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  UserAddOutlined, 
  UserOutlined, 
  UserSwitchOutlined, 
  DeleteOutlined, 
  FileTextOutlined, 
  SendOutlined, 
  CreditCardOutlined
} from "@ant-design/icons";
import { Typography } from "antd";

const { Title } = Typography;

const AdminIndex = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const adminOptions = [
    {
      title: "Cadastrar Novo Investidor",
      path: "create-user",
      icon: <UserAddOutlined style={{ fontSize: "20px", color: "#4CAF50" }} />,
      description: "Criar nova conta de investidor"
    },
    {
      title: "Listar Investidores",
      path: "list-users",
      icon: <UserOutlined style={{ fontSize: "20px", color: "#2196F3" }} />,
      description: "Visualizar todos os investidores"
    },
    {
      title: "Novos Usuários",
      path: "list-new-users",
      icon: <UserSwitchOutlined style={{ fontSize: "20px", color: "#FF9800" }} />,
      description: "Usuários recentemente cadastrados"
    },
    {
      title: "Usuários Excluídos",
      path: "list-deleted-users",
      icon: <DeleteOutlined style={{ fontSize: "20px", color: "#F44336" }} />,
      description: "Contas removidas do sistema"
    },
    {
      title: "Listar Cartões Solicitados",
      path: "list-cards-requested",
      icon: <CreditCardOutlined style={{ fontSize: "20px", color: "#081331" }} />,
      description: "Gerenciar solicitações de cartões"
    },
    {
      title: "Solicitação de Extrato",
      path: "request-movimentation",
      icon: <FileTextOutlined style={{ fontSize: "20px", color: "#9C27B0" }} />,
      description: "Gerenciar solicitações de movimentação"
    },
    {
      title: "Enviar Documento",
      path: "enviar-documento",
      icon: <SendOutlined style={{ fontSize: "20px", color: "#607D8B" }} />,
      description: "Enviar documentos para usuários"
    }
  ];

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
      {/* Header da Seção Admin */}
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
            Painel Administrativo
          </Title>
          <p style={{ 
            color: "rgba(255, 255, 255, 0.9)", 
            margin: 0,
            fontSize: "16px",
            fontWeight: "400"
          }}>
            Gerencie usuários e funcionalidades do sistema
          </p>
        </div>
      </Card>

      {/* Lista de Opções */}
      <Card
        style={{
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.9)",
          border: "none",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)"
        }}
        bodyStyle={{ padding: "0" }}
      >
        <List style={{ 
          background: "transparent",
          "--border-top": "none",
          "--border-bottom": "none"
        }}>
          {adminOptions.map((option, index) => (
            <List.Item
              key={index}
              onClick={() => handleNavigate(option.path)}
              style={{
                padding: "20px 24px",
                borderBottom: index < adminOptions.length - 1 ? "1px solid rgba(0, 0, 0, 0.06)" : "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                background: "transparent"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(8, 19, 49, 0.05)";
                e.currentTarget.style.transform = "translateX(4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.transform = "translateX(0)";
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "16px"
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(255, 255, 255, 0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
                }}>
                  {option.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#081331",
                    marginBottom: "4px"
                  }}>
                    {option.title}
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: "rgba(8, 19, 49, 0.7)",
                    fontWeight: "400"
                  }}>
                    {option.description}
                  </div>
                </div>
                {/* <div style={{
                  color: "rgba(8, 19, 49, 0.4)",
                  fontSize: "16px"
                }}>
                  ›
                </div> */}
              </div>
            </List.Item>
          ))}
        </List>
      </Card>
    </div>
  );
};

export default AdminIndex;
