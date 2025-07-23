import { Form, Image, Select, Card, Typography, notification, Spin, Flex, Divider } from 'antd';
import React, { useState } from 'react'
import { useProfilesGet } from '../../hooks/useProfile.query';
import { IKContext, IKUpload } from 'imagekitio-react';
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useCreateSendDoc } from '../../hooks/useWallet.query';
import generateUuid from '../../Helpers/generateUuid';
import { Button } from 'antd';
import { 
  SendOutlined, 
  UploadOutlined, 
  UserOutlined, 
  FileTextOutlined,
  CheckCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

function SendDoc() {
  const [form] = Form.useForm();
  const [selfieUrl, setSelfieUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const toast = useToast();
  const [api, contextHolder] = notification.useNotification();

  const { data: listUsers, isLoading: loadingUser } = useProfilesGet();

  const onSuccess = (res) => {
    setSelfieUrl(res.url);
    setIsUploading(false);
    setUploadProgress(0);
    toast({
      title: "Documento enviado com sucesso!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const onError = (err) => {
    console.error("Error uploading document:", err);
    setIsUploading(false);
    setUploadProgress(0);
    toast({
      title: "Erro ao fazer upload do documento",
      description: "Por favor, tente novamente.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const onUploadStart = () => {
    setIsUploading(true);
    setUploadProgress(0);
  };

  const onUploadProgress = (event) => {
    const percent = Math.floor((event.loaded / event.total) * 100);
    setUploadProgress(percent);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: useCreateSendDoc,
    onSuccess: (data) => {
      if (data.status !== 200) {
        api.error({
          message: "Erro!",
          description: "Ocorreu um erro ao enviar a solicitação.",
        });
      } else {
        api.success({
          message: "Sucesso!",
          description: "Documento enviado com sucesso!",
        });
        form.resetFields();
        setSelfieUrl("");
      }
    },
    onError: (error) => {
      api.error({
        message: "Erro!",
        description: "Ocorreu um erro ao enviar a solicitação.",
      });
    },
  });

  const onFinish = (values) => {
    if (!selfieUrl) {
      api.warning({
        message: "Atenção!",
        description: "Por favor, faça o upload de um documento.",
      });
      return;
    }

    const data = {
      user_id: values.user_id,
      doc_path: selfieUrl,
    };

    mutate(data);
  };

  const authenticator = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/v1/site/auth`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
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
      
      {/* Header Card */}
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
              <SendOutlined style={{ fontSize: 24, color: 'white' }} />
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
                Enviar Documento
              </Title>
              <Text style={{ 
                color: "rgba(255, 255, 255, 0.9)", 
                margin: 0,
                fontSize: "16px",
                fontWeight: "400"
              }}>
                Envie documentos para usuários específicos
              </Text>
            </div>
          </Flex>
        </div>
      </Card>

      {/* Form Card */}
      <Card
        style={{
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.9)",
          border: "none",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)"
        }}
        bodyStyle={{ padding: "32px" }}
      >
        <Form
          form={form}
          layout="vertical"
          name="send-document"
          onFinish={onFinish}
          requiredMark={false}
        >
          {/* Seleção de Usuário */}
          <Form.Item 
            name="user_id" 
            label={
              <span style={{ 
                fontSize: '16px', 
                fontWeight: 600, 
                color: '#2d3748',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <UserOutlined style={{ color: '#667eea' }} />
                Selecionar Usuário
              </span>
            }
            rules={[{ required: true, message: 'Por favor, selecione um usuário' }]}
            style={{ marginBottom: 24 }}
          >
            <Select
              placeholder="Escolha o usuário para enviar o documento"
              loading={loadingUser}
              size="large"
              style={{
                borderRadius: 12,
                border: '2px solid #e2e8f0',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                background: '#f7fafc'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.background = '#ffffff';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.background = '#f7fafc';
                e.target.style.boxShadow = 'none';
              }}
              options={listUsers?.map((user) => ({
                value: user.id,
                label: (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UserOutlined style={{ color: '#667eea' }} />
                    <div>
                      <div style={{ fontWeight: 500 }}>{user?.name}</div>
                      <div style={{ fontSize: '12px', color: '#718096' }}>
                        Conta: {user?.account_number}
                      </div>
                    </div>
                  </div>
                ),
              }))}
            />
          </Form.Item>

          <Divider style={{ margin: '32px 0' }} />

          {/* Upload de Documento */}
          <Form.Item 
            label={
              <span style={{ 
                fontSize: '16px', 
                fontWeight: 600, 
                color: '#2d3748',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FileTextOutlined style={{ color: '#667eea' }} />
                Upload do Documento
              </span>
            }
            style={{ marginBottom: 24 }}
          >
            <IKContext
              publicKey={process.env.REACT_APP_PUBLIC_KEY}
              urlEndpoint={process.env.REACT_APP_URL_ENDPOINT}
              authenticator={authenticator}
            >
              <div style={{ position: 'relative' }}>
                <IKUpload
                  fileName={`documento-${generateUuid()}.jpg`}
                  useUniqueFileName={true}
                  tags={["documento"]}
                  responseFields={["tags"]}
                  folder="monaco/documentos"
                  onSuccess={onSuccess}
                  onError={onError}
                  onUploadStart={onUploadStart}
                  onUploadProgress={onUploadProgress}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer',
                    zIndex: 2
                  }}
                />
                
                <div
                  style={{
                    border: '2px dashed #cbd5e0',
                    borderRadius: 16,
                    padding: '40px 20px',
                    textAlign: 'center',
                    background: isUploading ? '#f7fafc' : '#ffffff',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (!isUploading) {
                      e.target.style.borderColor = '#667eea';
                      e.target.style.background = '#f0f4ff';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isUploading) {
                      e.target.style.borderColor = '#cbd5e0';
                      e.target.style.background = '#ffffff';
                    }
                  }}
                  onClick={() => {
                    const uploadElement = document.querySelector('input[type="file"]');
                    if (uploadElement) uploadElement.click();
                  }}
                >
                  {isUploading ? (
                    <div>
                      <Spin 
                        indicator={<LoadingOutlined style={{ fontSize: 32, color: '#667eea' }} spin />} 
                      />
                      <div style={{ marginTop: 16, color: '#667eea', fontWeight: 500 }}>
                        Enviando documento... {uploadProgress}%
                      </div>
                    </div>
                  ) : selfieUrl ? (
                    <div>
                      <CheckCircleOutlined style={{ fontSize: 48, color: '#48bb78' }} />
                      <div style={{ marginTop: 16, color: '#48bb78', fontWeight: 500 }}>
                        Documento enviado com sucesso!
                      </div>
                    </div>
                  ) : (
                    <div>
                      <UploadOutlined style={{ fontSize: 48, color: '#667eea' }} />
                      <div style={{ marginTop: 16, color: '#2d3748', fontWeight: 500 }}>
                        Clique para fazer upload do documento
                      </div>
                      <div style={{ marginTop: 8, color: '#718096', fontSize: '14px' }}>
                        JPG, PNG ou PDF (máx. 10MB)
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </IKContext>

            {/* Preview da imagem */}
            {selfieUrl && (
              <div style={{ marginTop: 16 }}>
                <div style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: 12,
                  padding: 16,
                  background: '#f7fafc'
                }}>
                  <Text style={{ 
                    fontSize: '14px', 
                    fontWeight: 500, 
                    color: '#2d3748',
                    marginBottom: 12,
                    display: 'block'
                  }}>
                    Preview do documento:
                  </Text>
                  <Image
                    src={selfieUrl}
                    alt="Documento preview"
                    style={{
                      maxHeight: 200,
                      borderRadius: 8,
                      border: '1px solid #e2e8f0'
                    }}
                    fallback="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3Ik1RnG4W+FgYxN"
                  />
                </div>
              </div>
            )}
          </Form.Item>

          {/* Botão de Envio */}
          <Form.Item style={{ marginTop: 32, marginBottom: 0 }}>
            <Button
              loading={isPending}
              style={{ 
                width: "100%", 
                height: "52px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)",
                border: "none",
                fontSize: "16px",
                fontWeight: "600",
                color: "#fff",
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
              htmlType="submit"
              disabled={!selfieUrl || isPending}
            >
              {isPending ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LoadingOutlined style={{ fontSize: 16 }} />
                  Enviando...
                </span>
              ) : (
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <SendOutlined style={{ fontSize: 16 }} />
                  Enviar Documento
                </span>
              )}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default SendDoc
