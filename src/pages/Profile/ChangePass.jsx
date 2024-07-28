import { Divider, Form, Input, notification } from "antd";
import React from "react";
import { Button, Toast } from "antd-mobile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { usePassPost, useUserGet } from "../../hooks/useUser.query";

const ChangePass = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isLoading, isPending } = useMutation({
    mutationFn: usePassPost,
    onSuccess: (data) => {
      console.log(data.message);
      if (data.status === 400 || data.status !== 202) {
        api.error({
          message: data.message,
          placement: "top",
        });
        return;
      }

      api.success({
        message: data.message,
        placement: "top",
      });
      queryClient.invalidateQueries("profile");
      navigate("/profile");
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        name="create-user"
        onFinish={onFinish}
      >
        <Form.Item name="oldPass" label="Senha atual">
          <Input.Password />
        </Form.Item>
        <Form.Item name="password" label="Nova senha">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            loading={!!isLoading || !!isPending}
            style={{ width: "100%", marginRight: 0 }}
            type="submit"
            color="primary"
          >
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangePass;
