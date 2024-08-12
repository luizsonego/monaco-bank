import { Form, Input, notification } from "antd";
import React from "react";

import { Button, Toast } from "antd-mobile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAdminProfileGet,
  useProfilePut,
} from "../../../hooks/useProfile.query";

const AdminEditProfile = () => {
  let { id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { data: profileData, isLoading: loadingProfile } =
    useAdminProfileGet(id);

  console.log(profileData?.profile?.name);
  const { mutate } = useMutation({
    mutationFn: useProfilePut,
    onSuccess: (data) => {
      api.success({
        message: data.message,
      });
      queryClient.invalidateQueries("profile");
      if (data.status === 201) {
        navigate(-1);
      }
    },
  });

  const onFinish = (values) => {
    const data = {
      id: profileData?.profile?.id,
      values,
    };
    mutate(data);
  };

  if (loadingProfile) {
    return "carregando...";
  }
  return (
    <div>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        name="create-user"
        onFinish={onFinish}
        initialValues={{
          apelido: profileData?.profile?.apelido,
          name: profileData?.profile?.name,
          email: profileData?.profile?.email,
          phone: profileData?.profile?.phone,
          whatsapp: profileData?.profile?.whatsapp,
        }}
      >
        <Form.Item name="apelido" label="Apelido">
          <Input />
        </Form.Item>
        <Form.Item name="name" label="Nome">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Telefone">
          <Input />
        </Form.Item>
        <Form.Item name="whatsapp" label="Whatsapp">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            // loading={!!isLoading}
            style={{ width: "100%", marginRight: 0 }}
            type="submit"
            color="primary"
          >
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminEditProfile;
