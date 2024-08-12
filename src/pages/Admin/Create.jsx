import { Form, Input, notification } from "antd";
import React from "react";
import { Button, Toast } from "antd-mobile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCreateUserPost } from "../../hooks/useUser.query";

const CreateUser = () => {
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isPending } = useMutation({
    mutationFn: useCreateUserPost,
    onSuccess: (data) => {
      api.info({
        message: data.message,
      });
      if (data.status === 201) {
        navigate("/admin");
      }
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <div>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        name="create-user"
        onFinish={onFinish}
      >
        <Form.Item name="apelido" label="Apelido">
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Nome">
          <Input />
        </Form.Item>
        <Form.Item name="username" label="Username">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Senha">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="email">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            loading={!!isPending}
            style={{ width: "100%", marginRight: 0 }}
            type="submit"
            color="primary"
          >
            Criar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateUser;
