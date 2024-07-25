import React, { useRef } from "react";
import { Mutation, useMutation } from "@tanstack/react-query";
import { Button, Form, Input, Layout } from "antd";
import { Controller, useForm } from "react-hook-form";
import logo from "../../assets/monaco_bank_logo.png";
import { background } from "@chakra-ui/react";
import { useState } from "react";
import { EyeInvisibleOutline, EyeOutline } from "antd-mobile-icons";
import { useLoginPost } from "../../hooks/useUser.query";
import { Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";

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

const SignIn = () => {
  const { handleSubmit, control } = useForm();
  let navigate = useNavigate();

  const { data, mutate, isLoading } = useMutation({
    mutationFn: useLoginPost,
    onSuccess: (data) => {
      if (data.status === 400 || data.status === 401) {
        Toast.show({
          content: data.message,
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
    <Layout style={layoutStyle} className={`layout-login`}>
      <Content style={contentStyle}>
        <div className="logo">
          <img src={logo} alt="" style={{ height: "290px" }} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={formStyle}>
            <Controller
              name="username"
              control={control}
              render={({ field }) => <Input placeholder="Usuário" {...field} />}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input.Password placeholder="Senha" {...field} />
              )}
            />
            <Button
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
export default SignIn;
