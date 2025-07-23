import React, { useState, useMemo } from "react";
import { 
  List, 
  Card, 
  SearchBar, 
  Button, 
  Empty,
  Avatar,
  Tag
} from "antd-mobile";
import { 
  PhoneOutlined,
  MailOutlined,
  BankOutlined
} from "@ant-design/icons";
import { Typography, Flex, Badge, Spin } from "antd";
import { useProfilesGet } from "../../hooks/useProfile.query";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header";


const { Title, Text } = Typography;

const ListProfiles = () => {
  const navigate = useNavigate();
  const { data: profiles, isLoading, error } = useProfilesGet();
  const [searchText, setSearchText] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filtros disponíveis
  const filterOptions = [
    { key: "all", label: "Todos", color: "default" },
    { key: "active", label: "Ativos", color: "success" },
    { key: "inactive", label: "Inativos", color: "warning" },
    { key: "new", label: "Novos", color: "processing" }
  ];

  // Filtrar e buscar usuários
  const filteredProfiles = useMemo(() => {
    if (!profiles) return [];
    
    return profiles.filter((profile) => {
      const matchesSearch = 
        profile.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        profile.account_number?.includes(searchText) ||
        profile.email?.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesFilter = filterStatus === "all" || 
        (filterStatus === "active" && profile.status === 10) ||
        (filterStatus === "inactive" && profile.status === 1) ||
        (filterStatus === "blocked" && profile.status === 0) ||
        (filterStatus === "new" && profile.is_new);
      
      return matchesSearch && matchesFilter;
    });
  }, [profiles, searchText, filterStatus]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '10': return "success";
      case '1': return "warning";
      case '0': return "danger";
      default: return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case '10': return "Ativo";
      case '1': return "Inativo";
      case '0': return "Bloqueado";
      default: return "Desconhecido";
    }
  };



  if (error) {
    return (
      <div style={{
        backgroundColor: '#F0F0F0',
        background: 'linear-gradient(90deg,rgba(240, 240, 240, 1) 0%, rgba(204, 204, 204, 1) 100%)',
        minHeight: "100vh",
        paddingTop: 20,
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}>
        {/* <Header /> */}
        <div style={{
          padding: "20px",
          textAlign: "center",
          marginTop: 20,
        }}>
          <Card style={{
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.9)",
            border: "none",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}>
            <Empty
              description="Erro ao carregar usuários"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
            <Button 
              color="primary" 
              onClick={() => window.location.reload()}
              style={{ marginTop: 16 }}
            >
              Tentar Novamente
            </Button>
          </Card>
        </div>
      </div>
    );
  }

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
      width: "100%",
      maxWidth: "100vw",
      overflowX: "hidden",
      boxSizing: "border-box",
    }}>
      {/* Header */}
      {/* <Header /> */}

      {/* Card de Estatísticas */}
      <Card
        style={{
          marginBottom: "24px",
          borderRadius: "20px",
          background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
          border: "none",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(8, 19, 49, 0.3)",
          position: "relative",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box"
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
            Lista de Investidores
          </Title>
          <Text style={{ 
            color: "rgba(255, 255, 255, 0.9)", 
            margin: 0,
            fontSize: "16px",
            fontWeight: "400"
          }}>
            {isLoading ? "Carregando..." : `${filteredProfiles.length} usuário${filteredProfiles.length !== 1 ? 's' : ''} encontrado${filteredProfiles.length !== 1 ? 's' : ''}`}
          </Text>
        </div>
      </Card>

      {/* Barra de Busca */}
      <Card
        style={{
          marginBottom: "16px",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.9)",
          border: "none",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box"
        }}
        bodyStyle={{ padding: "16px" }}
      >
        <SearchBar
          placeholder="Buscar por nome, conta ou email..."
          value={searchText}
          onChange={handleSearch}
          style={{
            "--border-radius": "12px",
            "--background-color": "rgba(8, 19, 49, 0.05)",
            "--placeholder-color": "rgba(8, 19, 49, 0.5)",
          }}
        />
      </Card>

      {/* Filtros */}
      {/* <Card
        style={{
          marginBottom: "16px",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.9)",
          border: "none",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box"
        }}
        bodyStyle={{ padding: "16px" }}
      >
        <Flex gap={8} wrap="wrap" style={{ width: "100%" }}>
          {filterOptions.map((option) => (
            <Tag
              key={option.key}
              color={filterStatus === option.key ? "primary" : option.color}
              style={{
                cursor: "pointer",
                padding: "8px 12px",
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: "500",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
                flexShrink: 0
              }}
              onClick={() => handleFilterChange(option.key)}
            >
              {option.label}
            </Tag>
          ))}
        </Flex>
      </Card> */}

      {/* Lista de Usuários */}
      <Card
        style={{
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.9)",
          border: "none",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          width: "100%",
          maxWidth: "100%",
          boxSizing: "border-box"
        }}
        bodyStyle={{ padding: "0" }}
      >
        {isLoading ? (
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "60px 20px",
            flexDirection: "column",
            gap: "16px"
          }}>
            <Spin size="large" />
            <Text style={{ color: "rgba(8, 19, 49, 0.7)", fontSize: "16px" }}>
              Carregando usuários...
            </Text>
          </div>
        ) : filteredProfiles.length === 0 ? (
          <div style={{ padding: "60px 20px", textAlign: "center" }}>
            <Empty
              description={
                <div>
                  <Text style={{ color: "#666", fontSize: "16px", marginBottom: "8px" }}>
                    {searchText || filterStatus !== "all" 
                      ? "Nenhum usuário encontrado" 
                      : "Nenhum usuário cadastrado"
                    }
                  </Text>
                  {(searchText || filterStatus !== "all") && (
                    <Button 
                      color="primary" 
                      fill="outline"
                      onClick={() => {
                        setSearchText("");
                        setFilterStatus("all");
                      }}
                      style={{ marginTop: 8 }}
                    >
                      Limpar filtros
                    </Button>
                  )}
                </div>
              }
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          </div>
        ) : (
          <List style={{ 
            background: "transparent",
            "--border-top": "none",
            "--border-bottom": "none"
          }}>
            {filteredProfiles.map((profile, index) => (
              <List.Item
                key={profile.id}
                onClick={() => handleNavigate(`/admin/description/${profile.id}`)}
                style={{
                  padding: "16px 20px",
                  borderBottom: index < filteredProfiles.length - 1 ? "1px solid rgba(0, 0, 0, 0.06)" : "none",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  background: "transparent",
                  width: "100%",
                  boxSizing: "border-box"
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
                  gap: "12px",
                  width: "100%",
                  minWidth: 0
                }}>
                  {/* Avatar */}
                  {/* <Avatar
                    src={profile.avatar || profile.profile_image}
                    style={{
                      "--size": "48px",
                      "--border-radius": "50%",
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "white",
                      flexShrink: 0
                    }}
                  >
                    {profile.name?.charAt(0)?.toUpperCase() || "U"}
                  </Avatar> */}

                  {/* Informações do Usuário */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}>
                      <Text style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#081331",
                        margin: 0,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}>
                        {profile.name || "Nome não informado"}
                        
                      </Text>
                      
                      {profile.is_new && (
                        <Badge count="NOVO" style={{ 
                          backgroundColor: "#52c41a",
                          fontSize: "9px",
                          padding: "1px 4px"
                        }} />
                      )}

                      
                    </div>

                    <div>
                      <Tag
                        color={getStatusColor(profile.status)}
                        style={{
                          fontSize: "10px",
                          padding: "2px 5px",
                          borderRadius: "8px",
                          fontWeight: "500",
                          marginLeft: "auto"
                        }}
                      >
                        {getStatusText(profile.status)}
                      </Tag>
                    </div>
                    
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "3px"
                    }}>
                      <Text style={{
                        fontSize: "13px",
                        color: "rgba(8, 19, 49, 0.7)",
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        gap: "4px"
                      }}>
                        <BankOutlined style={{ fontSize: "11px" }} />
                        {profile.account_number || "Conta não informada"}
                      </Text>
                    </div>

                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      flexWrap: "wrap"
                    }}>
                      
                      {profile.email && (
                        <Text style={{
                          fontSize: "11px",
                          color: "rgba(8, 19, 49, 0.6)",
                          margin: 0,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}>
                          <MailOutlined style={{ fontSize: "9px" }} />
                          {profile.email}
                        </Text>
                      )}
                      {profile.phone && (
                        <Text style={{
                          fontSize: "11px",
                          color: "rgba(8, 19, 49, 0.6)",
                          margin: 0,
                          display: "flex",
                          alignItems: "center",
                          gap: "4px"
                        }}>
                          <PhoneOutlined style={{ fontSize: "9px" }} />
                          {profile.phone}
                        </Text>
                      )}
                    </div>
                  </div>


                </div>
              </List.Item>
            ))}
          </List>
        )}
      </Card>
    </div>
  );
};

export default ListProfiles;
