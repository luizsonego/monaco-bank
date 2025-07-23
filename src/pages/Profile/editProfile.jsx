import { Form, Input, notification } from "antd";
import React from "react";
import { useProfileGet, useProfilePut } from "../../hooks/useProfile.query";
import { Button, Toast } from "antd-mobile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { data: profileData, isLoading: loadingProfile } = useProfileGet();

  const { mutate } = useMutation({
    mutationFn: useProfilePut,
    onSuccess: (data) => {
      api.success({
        message: data.message,
      });
      queryClient.invalidateQueries("profile");
      if (data.status === 201) {
        navigate("/profile");
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

  return (
    <div style={{
      marginTop: 25,
      backgroundColor: '#F0F0F0',
      background: 'linear-gradient(90deg,rgba(240, 240, 240, 1) 0%, rgba(204, 204, 204, 1) 100%)',
      flex: 1,
      borderRadius: '25px 25px 0 0',
      paddingTop: 30,
      paddingLeft: 15,
      paddingRight: 15,
    }}>
      {contextHolder}
      {}
      <Form
        form={form}
        layout="vertical"
        name="create-user"
        onFinish={onFinish}
        initialValues={{
          name: profileData?.profile.apelido,
          name: profileData?.profile.name,
          email: profileData?.profile.email,
          phone: profileData?.profile.phone,
          whatsapp: profileData?.profile.whatsapp,
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
            style={{ width: "100%", marginRight: 0, backgroundColor: "#1e3a8a", color: "white", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", transition: "background-color 0.2s ease" }}
            type="submit"
          >
            Salvar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfile;
