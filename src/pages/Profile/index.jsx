import React, { useRef, useState } from "react";
import { useProfileGet, useProfilePut } from "../../hooks/useProfile.query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { IKContext, IKUpload } from "imagekitio-react";
import { notification, Card, Flex, Avatar, Button, Divider, Empty, List, Drawer } from "antd";
import { EditOutlined, UserOutlined, HomeOutlined, BankOutlined, FileTextOutlined, LockOutlined } from "@ant-design/icons";

const ProfileIndex = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const reftest = useRef(null);
  const [api, contextHolder] = notification.useNotification();
  const [open, setOpen] = useState(false);

  const publicKey = "public_Hqt+AgHm0gjcWTX7lFzrSP0QwhE=";
  const urlEndpoint = "https://ik.imagekit.io/qqrtx9mgqo/";
  const authenticationEndpoint = `${process.env.REACT_APP_API}/v1/site/auth`;

  const { data: profileData, isLoading: loadingProfile } = useProfileGet();

  const onClose = () => setOpen(false);
  const handleNavigate = (path) => navigate(path);
  const handleOpenChangePic = () => setOpen(true);

  const { mutate, isPending } = useMutation({
    mutationFn: useProfilePut,
    onSuccess: (data) => {
      if (data.status === 500) {
        api.error({ message: data.message });
        return;
      }
      api.info({ message: data.message });
      if (data.status === 201) {
        setOpen(false);
        queryClient.invalidateQueries("profile");
      }
    },
    onError: (data) => {
      if (data.status === 500) {
        api.error({ message: data.message });
      }
    },
  });

  const onError = (err) => {
    console.log("error: ", err);
    api.error({
      message: "Erro",
      description: err.message,
    });
  };

  const onSuccess = (res) => {
    const values = { profile_pic: res.url };
    const data = {
      id: profileData?.profile?.id,
      values,
    };
    api.success({
      message: "Sucesso",
      description: "Foto de perfil atualizada com sucesso.",
    });
    mutate(data);
  };

  const ProfileSection = ({ title, icon, children, onEdit, showEdit = true }) => (
    <Card
      style={{
        marginBottom: "20px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
      }}
      bodyStyle={{ padding: "20px" }}
    >
      <Flex justify="space-between" align="center" style={{ marginBottom: "16px" }}>
        <Flex align="center" gap={12}>
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
            {React.cloneElement(icon, { style: { color: "white", fontSize: "18px" } })}
          </div>
          <span style={{ 
            fontSize: "18px", 
            fontWeight: "700", 
            color: "#081331",
            letterSpacing: "0.5px"
          }}>
            {title}
          </span>
        </Flex>
        {showEdit && onEdit && (
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={onEdit}
            style={{ 
              color: "rgba(25, 59, 151, 1)",
              fontSize: "16px",
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(25, 59, 151, 0.1)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.transform = "scale(1)";
            }}
          />
        )}
      </Flex>
      {children}
    </Card>
  );

  const ProfileItem = ({ label, value, placeholder = "-" }) => (
    <div style={{ 
      padding: "16px 0", 
      borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all 0.3s ease",
      borderRadius: "8px",
      marginBottom: "4px"
    }}
    onMouseEnter={(e) => {
      e.target.style.background = "rgba(25, 59, 151, 0.03)";
      e.target.style.paddingLeft = "12px";
      e.target.style.paddingRight = "12px";
    }}
    onMouseLeave={(e) => {
      e.target.style.background = "transparent";
      e.target.style.paddingLeft = "0";
      e.target.style.paddingRight = "0";
    }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <span style={{ 
          color: "#8e8e93", 
          fontSize: "13px", 
          fontWeight: "500",
          textTransform: "uppercase",
          letterSpacing: "0.5px"
        }}>
          {label}
        </span>
        <span style={{ 
          color: "#081331", 
          fontSize: "15px", 
          fontWeight: "600",
          lineHeight: "1.4"
        }}>
          {value || placeholder}
        </span>
      </div>
      <div style={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: value ? "#4CAF50" : "#FF9800",
        opacity: 0.7
      }} />
    </div>
  );

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
      
      {/* Header do Perfil */}
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
        <Flex align="center" gap={20}>
          <div style={{ position: "relative" }}>
            <Avatar
              size={90}
              src={profileData?.profile?.profile_pic}
              icon={<UserOutlined />}
              onClick={handleOpenChangePic}
              style={{ 
                cursor: "pointer",
                border: "4px solid rgba(255, 255, 255, 0.9)",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
                e.target.style.boxShadow = "0 12px 32px rgba(0, 0, 0, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
                e.target.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.2)";
              }}
            />
            <div style={{
              position: "absolute",
              bottom: "2px",
              right: "2px",
              width: "24px",
              height: "24px",
              background: "#4CAF50",
              borderRadius: "50%",
              border: "3px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
            onClick={handleOpenChangePic}
            >
              <EditOutlined style={{ color: "white", fontSize: "12px" }} />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ 
              fontSize: "24px", 
              fontWeight: "800", 
              color: "white", 
              margin: "0 0 6px 0",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }}>
              {profileData?.profile?.name || "Usuário"}
            </h2>
            <p style={{ 
              fontSize: "16px", 
              color: "rgba(255, 255, 255, 0.9)", 
              margin: "0 0 8px 0",
              fontWeight: "500"
            }}>
              {profileData?.profile?.time_contract || "Cliente"}
            </p>
            <div style={{
              display: "inline-block",
              padding: "6px 12px",
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "20px",
              fontSize: "12px",
              color: "white",
              fontWeight: "600",
              backdropFilter: "blur(10px)"
            }}>
              Perfil Ativo
            </div>
          </div>
        </Flex>
      </Card>

      {/* Dados Pessoais */}
      <ProfileSection
        title="Dados Pessoais"
        icon={<UserOutlined style={{ color: "#081331" }} />}
        onEdit={() => handleNavigate("/profile/edit-profile")}
      >
        <ProfileItem label="Email" value={profileData?.profile?.email} />
        <ProfileItem label="WhatsApp" value={profileData?.profile?.whatsapp} />
        <ProfileItem label="Telefone" value={profileData?.profile?.phone} />
      </ProfileSection>

      {/* Endereço */}
      {profileData?.address?.zip_code === null ? (
        <ProfileSection
          title="Endereço"
          icon={<HomeOutlined style={{ color: "#081331" }} />}
          onEdit={() => handleNavigate("/profile/edit-address")}
        >
          <Empty 
            description="Endereço não cadastrado" 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ margin: "20px 0" }}
          />
          <Button
            type="primary"
            onClick={() => handleNavigate("/profile/edit-address")}
            style={{ 
              width: "100%",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
              border: "none",
              fontSize: "16px",
              fontWeight: "600",
              boxShadow: "0 4px 16px rgba(8, 19, 49, 0.3)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(8, 19, 49, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 16px rgba(8, 19, 49, 0.3)";
            }}
          >
            + Adicionar Endereço
          </Button>
        </ProfileSection>
      ) : (
        <ProfileSection
          title="Endereço"
          icon={<HomeOutlined style={{ color: "#081331" }} />}
          onEdit={() => handleNavigate("/profile/edit-address")}
        >
          <ProfileItem label="CEP" value={profileData?.address?.zip_code} />
          <ProfileItem 
            label="Endereço" 
            value={`${profileData?.address?.address}, ${profileData?.address?.number}`} 
          />
          <ProfileItem label="Complemento" value={profileData?.address?.complement} />
          <ProfileItem label="Bairro" value={profileData?.address?.neighborhood} />
          <ProfileItem 
            label="Cidade" 
            value={`${profileData?.address?.city} - ${profileData?.address?.state}`} 
          />
        </ProfileSection>
      )}

      {/* Dados Bancários */}
      {profileData?.bank?.bank === null ? (
        <ProfileSection
          title="Dados Bancários"
          icon={<BankOutlined style={{ color: "#081331" }} />}
          onEdit={() => handleNavigate("/profile/edit-bank")}
        >
          <Empty 
            description="Dados bancários não cadastrados" 
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ margin: "20px 0" }}
          />
          <Button
            type="primary"
            onClick={() => handleNavigate("/profile/edit-bank")}
            style={{ 
              width: "100%",
              height: "48px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
              border: "none",
              fontSize: "16px",
              fontWeight: "600",
              boxShadow: "0 4px 16px rgba(8, 19, 49, 0.3)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(8, 19, 49, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 16px rgba(8, 19, 49, 0.3)";
            }}
          >
            + Adicionar Dados Bancários
          </Button>
        </ProfileSection>
      ) : (
        <ProfileSection
          title="Dados Bancários"
          icon={<BankOutlined style={{ color: "#081331" }} />}
          onEdit={() => handleNavigate("/profile/edit-bank")}
        >
          <ProfileItem label="Banco" value={profileData?.bank?.bank} />
          <ProfileItem label="Agência" value={profileData?.bank?.bank_agency} />
          <ProfileItem label="Conta" value={profileData?.bank?.bank_account} />
          <ProfileItem label="Tipo de conta" value={profileData?.bank?.bank_account_type} />
          <ProfileItem label="Número da conta" value={profileData?.bank?.bank_account_number} />
          <ProfileItem label="PIX" value={profileData?.bank?.bank_pix} />
          <ProfileItem label="IBAN" value={profileData?.bank?.bank_iban} />
          <ProfileItem label="SWIFT" value={profileData?.bank?.bank_swift} />
          <ProfileItem label="Telefone do escritório" value={profileData?.bank?.bank_office_phone} />
        </ProfileSection>
      )}

      {/* Ações */}
      <Card
        style={{
          marginTop: "24px",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
        bodyStyle={{ padding: "0" }}
      >
        <List
          size="large"
          style={{ background: "transparent" }}
        >
          <List.Item
            onClick={() => handleNavigate("documentos")}
            style={{
              padding: "20px",
              cursor: "pointer",
              borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
              transition: "all 0.3s ease",
              borderRadius: "0"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(25, 59, 151, 0.05)";
              e.target.style.paddingLeft = "24px";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.paddingLeft = "20px";
            }}
          >
            <Flex align="center" gap={16}>
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(8, 19, 49, 0.3)"
              }}>
                <FileTextOutlined style={{ color: "white", fontSize: "20px" }} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ 
                  color: "#081331", 
                  fontSize: "16px", 
                  fontWeight: "600",
                  display: "block"
                }}>
                  Documentos
                </span>
                <span style={{ 
                  color: "#8e8e93", 
                  fontSize: "13px",
                  display: "block",
                  marginTop: "2px"
                }}>
                  Visualizar e gerenciar documentos
                </span>
              </div>
            </Flex>
          </List.Item>
          <List.Item
            onClick={() => handleNavigate("alterar-senha")}
            style={{
              padding: "20px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              borderRadius: "0"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(25, 59, 151, 0.05)";
              e.target.style.paddingLeft = "24px";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.paddingLeft = "20px";
            }}
          >
            <Flex align="center" gap={16}>
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 12px rgba(8, 19, 49, 0.3)"
              }}>
                <LockOutlined style={{ color: "white", fontSize: "20px" }} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ 
                  color: "#081331", 
                  fontSize: "16px", 
                  fontWeight: "600",
                  display: "block"
                }}>
                  Alterar Senha
                </span>
                <span style={{ 
                  color: "#8e8e93", 
                  fontSize: "13px",
                  display: "block",
                  marginTop: "2px"
                }}>
                  Atualizar senha de acesso
                </span>
              </div>
            </Flex>
          </List.Item>
        </List>
      </Card>

      {/* Modal para alterar foto */}
      <Drawer
        title={
          <div style={{ 
            fontSize: "20px", 
            fontWeight: "700", 
            color: "#081331",
            textAlign: "center",
            width: "100%"
          }}>
            Alterar Foto de Perfil
          </div>
        }
        placement="bottom"
        onClose={onClose}
        open={open}
        height="auto"
        style={{ 
          borderRadius: "20px 20px 0 0",
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)"
        }}
        headerStyle={{
          borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
          padding: "20px 24px 16px"
        }}
      >
        <div style={{ 
          padding: "32px 24px", 
          textAlign: "center",
          background: "linear-gradient(135deg, rgba(8, 19, 49, 0.05) 0%, rgba(25, 59, 151, 0.05) 100%)"
        }}>
          <div style={{
            position: "relative",
            display: "inline-block",
            marginBottom: "24px"
          }}>
            <Avatar
              size={140}
              src={profileData?.profile?.profile_pic}
              icon={<UserOutlined />}
              style={{ 
                border: "6px solid white",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)"
              }}
            />
            <div style={{
              position: "absolute",
              bottom: "8px",
              right: "8px",
              width: "32px",
              height: "32px",
              background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
              borderRadius: "50%",
              border: "3px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(8, 19, 49, 0.3)"
            }}>
              <EditOutlined style={{ color: "white", fontSize: "14px" }} />
            </div>
          </div>
          
          <div style={{ marginBottom: "24px" }}>
            <h3 style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#081331",
              margin: "0 0 8px 0"
            }}>
              Foto Atual
            </h3>
            <p style={{
              fontSize: "14px",
              color: "#8e8e93",
              margin: 0
            }}>
              Clique no botão abaixo para selecionar uma nova foto
            </p>
          </div>

          <IKContext
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticationEndpoint={authenticationEndpoint}
          >
            <IKUpload
              inputRef={reftest}
              fileName={profileData?.profile?.name}
              useUniqueFileName={true}
              responseFields={["tags"]}
              folder={"/sample-folder/monaco/picture"}
              onError={onError}
              onSuccess={onSuccess}
            />
          </IKContext>
          
          <Button
            type="primary"
            onClick={() => reftest.current?.click()}
            style={{ 
              width: "100%", 
              height: "52px",
              borderRadius: "16px",
              background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
              border: "none",
              fontSize: "16px",
              fontWeight: "600",
              boxShadow: "0 6px 20px rgba(8, 19, 49, 0.3)",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 24px rgba(8, 19, 49, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 6px 20px rgba(8, 19, 49, 0.3)";
            }}
            loading={isPending}
          >
            📷 Selecionar Nova Foto
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default ProfileIndex;
