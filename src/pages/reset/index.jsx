import { Button, Input, Layout, notification, Typography, Divider, Modal } from "antd";
import React, { useState } from "react";
import logo from "../../assets/monaco_bank_logo.png";
import { useMutation } from "@tanstack/react-query";
import { useResetPost } from "../../hooks/useUser.query";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { LockOutline } from "antd-mobile-icons";
import { TiArrowLeftOutline } from "react-icons/ti";
import { CheckCircleOutline } from "antd-mobile-icons";
import "./styles.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const Reset = () => {
  let { token } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const { handleSubmit, control, reset } = useForm();
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  let navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };
  
  console.log(token);
  
  const { data, mutate, isLoading } = useMutation({
    mutationFn: useResetPost,
    onSuccess: (data) => {
      if (data.status === 400 || data.status === 401) {
        api.error({
          message: "Erro na redefinição",
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
        message: "Erro na redefinição",
        description: "Ocorreu um erro ao redefinir sua senha. Tente novamente.",
        placement: "top",
      });
    },
  });

  const onSubmit = (data) => {
    const values = {
      token: token,
      pass: data,
    };
    mutate(values);
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
            Redefinir Senha
          </Title>
          <Text className="welcome-subtitle">
            Digite sua nova senha para continuar
          </Text>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="input-group">
              <label className="input-label">Nova Senha</label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div className="input-wrapper">
                    <LockOutline className="input-icon" />
                    <Input.Password
                      {...field}
                      placeholder="Digite sua nova senha"
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
              {isLoading ? "Redefinindo..." : "Redefinir Senha"}
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
          <div className="security-icon">🔒</div>
          <Text className="security-text">
            Sua nova senha deve ter pelo menos 8 caracteres
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
            Senha Redefinida!
          </Title>
          <Text className="success-description">
            Sua senha foi alterada com sucesso. 
            Agora você pode fazer login com sua nova senha.
          </Text>
          <div className="success-tips">
            <Text className="success-tip">
              🔐 Sua conta está segura e protegida
            </Text>
          </div>
          <Button
            key="ok"
            type="primary"
            onClick={handleSuccessModalOk}
            className="success-modal-button"
            style={{marginTop: "20px"}}
          >
            Fazer Login
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Reset;
