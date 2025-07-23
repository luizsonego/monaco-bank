import React, { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Layout, Modal, Typography, Divider } from "antd";
import { Controller, useForm } from "react-hook-form";
import logo from "../../assets/monaco_bank_logo.png";
import { EyeInvisibleOutline, EyeOutline, LockOutline, UserOutline } from "antd-mobile-icons";
import { useLoginPost } from "../../hooks/useUser.query";
import { Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import Message from "./Message";
import "./styles.css";

const { Content } = Layout;
const { Title, Text } = Typography;

const SignIn = () => {
  const { handleSubmit, control } = useForm();
  const [visible, setVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  let navigate = useNavigate();
  const [message, setMessage] = useState([]);
  
  const handleNavigate = (path) => {
    navigate(path);
  };

  const { data, mutate, isLoading } = useMutation({
    mutationFn: useLoginPost,
    onSuccess: (data) => {
      if (data.status === 400 || data.status === 401) {
        Toast.show({
          content: data.message,
          icon: "fail",
        });
        setVisible(true);
        setMessage(data.data);
        console.log("data: ", data.data);
        return;
      }
      if (data.status === 404) {
        Toast.show({
          content: "Usuário ou senha inválidos",
          icon: "fail",
        });
        return;
      }
      Toast.show({
        content: "Login realizado com sucesso!",
        icon: "success",
      });
      localStorage.setItem(process.env.REACT_APP_ACCESS_TOKEN, data.data.token);
      setTimeout(1000);
      navigate("/");
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="login-container">
      {visible && <Message message={message} />}
      
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
            Bem-vindo ao Monaco Bank
          </Title>
          <Text className="welcome-subtitle">
            Acesse sua conta com segurança
          </Text>
        </div>

        {/* Form Section */}
        <div className="form-section">
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="input-group">
              <label className="input-label">Usuário</label>
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <div className="input-wrapper">
                    <UserOutline className="input-icon" />
                    <Input
                      {...field}
                      placeholder="Digite seu usuário"
                      className="custom-input"
                      size="large"
                    />
                  </div>
                )}
              />
            </div>

            <div className="input-group">
              <label className="input-label">Senha</label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div className="input-wrapper">
                    <LockOutline className="input-icon" />
                    <Input.Password
                      {...field}
                      placeholder="Digite sua senha"
                      className="custom-input"
                      size="large"
                      visibilityToggle={{
                        visible: passwordVisible,
                        onVisibleChange: setPasswordVisible,
                      }}
                      iconRender={(visible) =>
                        visible ? <EyeOutline /> : <EyeInvisibleOutline />
                      }
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
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <Divider className="divider">
            <Text className="divider-text">ou</Text>
          </Divider>

          <div className="additional-options">
            <Button
              type="link"
              className="forgot-password-link"
              onClick={() => handleNavigate("/recuperar-senha")}
            >
              Esqueceu sua senha?
            </Button>
          </div>
        </div>

        {/* Security Notice */}
        <div className="security-notice">
          <div className="security-icon">🔒</div>
          <Text className="security-text">
            Suas informações estão protegidas com criptografia de ponta a ponta
          </Text>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
