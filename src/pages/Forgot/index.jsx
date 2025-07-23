import { Button, Input, Layout, notification, Typography, Divider, Modal } from "antd";
import React, { useState } from "react";
import logo from "../../assets/monaco_bank_logo.png";
import { useMutation } from "@tanstack/react-query";
import { useForgotPost } from "../../hooks/useUser.query";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { UserOutline} from "antd-mobile-icons";
import { TiArrowLeftOutline } from "react-icons/ti";
import { CheckCircleOutline } from "antd-mobile-icons";
import "./styles.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const Forgot = () => {
  const [api, contextHolder] = notification.useNotification();
  const { handleSubmit, control, reset } = useForm();
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  let navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const { data, mutate, isLoading } = useMutation({
    mutationFn: useForgotPost,
    onSuccess: (data) => {
      if (data.status === 400 || data.status === 401) {
        api.error({
          message: "Erro na solicitação",
          description: data.message,
          placement: "top",
        });
        return;
      }
      
      // Mostrar modal de sucesso
      setSuccessModalVisible(true);
      reset(); // Limpar o formulário
    },
    onError: (error) => {
      console.log("error: ", error);
      api.error({
        message: "Erro na solicitação",
        description: "Ocorreu um erro ao processar sua solicitação. Tente novamente.",
        placement: "top",
      });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  const handleSuccessModalOk = () => {
    setSuccessModalVisible(false);
    navigate("/login");
  };

  return (
    <div className="login-container">
      {contextHolder}
      
      {/* Background Pattern */}
      <div className="background-pattern">
        <div className="pattern-circle pattern-circle-1"></div>
        <div className="pattern-circle pattern-circle-2"></div>
        <div className="pattern-circle pattern-circle-3"></div>
        <div className="pattern-line pattern-line-1"></div>
        <div className="pattern-line pattern-line-2"></div>
      </div>

      <div className="login-card">
        {/* Logo Section */}
        <div className="logo-section">
          <div className="logo-container">
            <img src={logo} alt="Monaco Bank" className="logo-image" />
          </div>
          <Title level={2} className="welcome-title">
            Recuperar Senha
          </Title>
          <Text className="welcome-subtitle">
            Digite seu email para receber instruções de recuperação
          </Text>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="input-group">
              <label className="input-label">Email</label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div className="input-wrapper">
                    <UserOutline className="input-icon" />
                    <Input
                      {...field}
                      placeholder="Digite seu email"
                      className="custom-input"
                      size="large"
                    />
                  </div>
                )}
              />
            </div>

            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              className="login-button"
              size="large"
            >
              {isLoading ? "Enviando..." : "Enviar Solicitação"}
            </Button>
          </form>

          <Divider className="divider">
            <Text className="divider-text">ou</Text>
          </Divider>

          <div className="additional-options">
            <Button
              type="link"
              className="forgot-password-link"
              onClick={() => handleNavigate("/login")}
              icon={<TiArrowLeftOutline />}
            >
              Voltar para o login
            </Button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="security-notice">
          <div className="security-icon">🔐</div>
          <Text className="security-text">
            Enviaremos um link seguro para redefinir sua senha
          </Text>
        </div>
      </div>

      {/* Success Modal */}
      <Modal
        open={successModalVisible}
        onOk={handleSuccessModalOk}
        onCancel={handleSuccessModalOk}
        footer={null}
        closable={false}
        centered
        className="success-modal"
      >
        <div className="success-modal-content">
          <div className="success-icon-container">
            <CheckCircleOutline className="success-icon" />
          </div>
          <Title level={3} className="success-title">
            Solicitação Enviada!
          </Title>
          <Text className="success-description">
            Enviamos um email com instruções para redefinir sua senha. 
            Verifique sua caixa de entrada e siga os passos indicados.
          </Text>
          <div className="success-tips">
            <Text className="success-tip">
              💡 Dica: Verifique também sua pasta de spam
            </Text>
          </div>
          <Button
            key="ok"
            type="primary"
            onClick={handleSuccessModalOk}
            className="success-modal-button"
            style={{marginTop: "20px"}}
          >
            Entendi
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Forgot;
