import { List, Card, Empty, Avatar, Badge } from "antd-mobile";
import React from "react";
import {
  useDeletedProfilesGet,
  useProfilesGet,
} from "../../hooks/useProfile.query";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Flex, Typography, Spin } from "antd";
import { 
  UserOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  ExclamationCircleOutlined 
} from "@ant-design/icons";

const { Title, Text: AntText } = Typography;

const ListDeletedProfiles = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useDeletedProfilesGet();

  const handleNavigate = (path) => {
    navigate(path);
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
      {/* Header Card */}
      <Card
        style={{
          marginBottom: "24px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, rgba(220, 53, 69, 1) 0%, rgba(255, 73, 97, 1) 100%)",
          border: "none",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(220, 53, 69, 0.3)",
          position: "relative"
        }}
        bodyStyle={{ padding: "28px" }}
      >
        {/* Elemento decorativo de fundo */}
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
            Perfis Excluídos
          </Title>
          <AntText style={{ 
            color: "rgba(255, 255, 255, 0.9)", 
            margin: 0,
            fontSize: "16px",
            fontWeight: "400"
          }}>
            {isLoading ? "Carregando..." : `${data?.length || 0} usuário${data?.length !== 1 ? 's' : ''} excluído${data?.length !== 1 ? 's' : ''}`}
          </AntText>
        </div>
      </Card>

      {/* Lista de Perfis Excluídos */}
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
        {isLoading ? (
          <div style={{
            padding: "40px 20px",
            textAlign: "center"
          }}>
            <Spin size="large" />
            <div style={{
              marginTop: "16px",
              color: "rgba(8, 19, 49, 0.7)",
              fontSize: "16px"
            }}>
              Carregando perfis excluídos...
            </div>
          </div>
        ) : data?.length === 0 ? (
          <Empty
            image={<ExclamationCircleOutlined style={{ fontSize: "64px", color: "rgba(8, 19, 49, 0.3)" }} />}
            description={
              <div style={{
                color: "rgba(8, 19, 49, 0.7)",
                fontSize: "16px",
                marginTop: "16px"
              }}>
                Nenhum perfil excluído encontrado
              </div>
            }
            style={{
              padding: "40px 20px"
            }}
          />
        ) : (
          <List style={{ 
            background: "transparent",
            "--border-top": "none",
            "--border-bottom": "none"
          }}>
            {data?.map((profile, index) => (
              <List.Item
                key={profile.id}
                onClick={() => handleNavigate(`/admin/description/${profile.id}`)}
                style={{
                  padding: "20px 24px",
                  borderBottom: index < data.length - 1 ? "1px solid rgba(0, 0, 0, 0.06)" : "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: "transparent"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(220, 53, 69, 0.05)";
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
                  {/* Avatar do usuário */}
                  <div style={{ position: "relative" }}>
                    <Avatar
                      size={48}
                      src={profile.profile_pic}
                      icon={<UserOutlined />}
                      style={{ 
                        border: "2px solid rgba(220, 53, 69, 0.2)",
                        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
                      }}
                    />
                    {/* Badge de excluído */}
                    <div style={{
                      position: "absolute",
                      bottom: "-4px",
                      right: "-4px",
                      background: "#dc3545",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "2px solid white",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)"
                    }}>
                      <DeleteOutlined style={{ color: "white", fontSize: "10px" }} />
                    </div>
                  </div>
                  
                  {/* Informações do usuário */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#081331",
                      marginBottom: "4px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    }}>
                      {profile.name}
                    </div>
                      <Badge 
                        content="EXCLUÍDO" 
                        color="#dc3545"
                        style={{
                          fontSize: "10px",
                          fontWeight: "700",
                          padding: "2px 6px",
                          borderRadius: "8px"
                        }}
                      />
                    <div style={{
                      fontSize: "14px",
                      color: "rgba(8, 19, 49, 0.7)",
                      fontWeight: "400",
                      marginBottom: "4px"
                    }}>
                      Conta: {profile.account_number}
                    </div>
                    {profile.email && (
                      <div style={{
                        fontSize: "13px",
                        color: "rgba(8, 19, 49, 0.6)",
                        fontWeight: "400"
                      }}>
                        {profile.email}
                      </div>
                    )}
                  </div>
                  
                  {/* Ícone de visualizar */}
                  {/* <div style={{
                    color: "rgba(220, 53, 69, 0.6)",
                    fontSize: "18px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "rgba(220, 53, 69, 0.1)",
                    transition: "all 0.2s ease"
                  }}>
                    <EyeOutlined />
                  </div> */}
                </div>
              </List.Item>
            ))}
          </List>
        )}
      </Card>
    </div>
  );
};

export default ListDeletedProfiles;
