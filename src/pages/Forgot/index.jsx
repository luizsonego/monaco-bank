import { Button, Input, Layout, notification } from "antd";
import React from "react";
import logo from "../../assets/monaco_bank_logo.png";
import { useMutation } from "@tanstack/react-query";
import { Toast } from "@chakra-ui/react";
import { useForgotPost, useLoginPost } from "../../hooks/useUser.query";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

const { Content } = Layout;

const contentStyle = {
  padding: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  margin: "0 auto",
};
const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  minHeight: "100vh",
  display: "flex",
};
const formStyle = {
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  input: {
    color: "#0e0e0e",
  },
};
const buttonStyle = {
  backgroundColor: "rgb(11 113 224)",
  color: "#fff",
  borderRadius: "0",
  height: "40px",
  fontSize: "14px",
  fontWeight: "bold",
  borderRadius: "8px",
  width: "100%",
  padding: "0 16px",
  "&:hover": {
    backgroundColor: "#000",
  },
};

const Forgot = () => {
  const [api, contextHolder] = notification.useNotification();
  const { handleSubmit, control } = useForm();
  let navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const { data, mutate, isLoading } = useMutation({
    mutationFn: useForgotPost,
    onSuccess: (data) => {
      if (data.status === 400 || data.status === 401) {
        api.error({
          message: data.message,
          placement: "top",
        });
        return;
      }
      api.success({
        message: "Solicitação enviada com sucesso!",
        placement: "top",
      });
      setTimeout(1000);
      navigate("/login");
    },
    onError: (error) => {
      console.log("error: ", error);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <Layout style={layoutStyle} className={`layout-login`}>
      {contextHolder}
      <Content style={contentStyle}>
        <div className="logo">
          <img
            src={logo}
            alt=""
            style={{ height: "180px", marginBottom: 30 }}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={formStyle}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => <Input placeholder="Usuario" {...field} />}
            />
            <Button
              type="primary"
              style={buttonStyle}
              size="xs"
              htmlType="submit"
              loading={!!isLoading}
            >
              Entrar
            </Button>
          </div>
        </form>
      </Content>
    </Layout>
  );
};

export default Forgot;
