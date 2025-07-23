import { Form, Input, message, notification } from "antd";
import React from "react";
import { useProfileGet, useProfilePut } from "../../hooks/useProfile.query";
import { Button, Toast } from "antd-mobile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const EditAddress = () => {
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { data: profileData, isLoading: loadingProfile } = useProfileGet();

  const { mutate, isLoading } = useMutation({
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
      paddingBottom: 100,
    }}>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        name="create-user"
        onFinish={onFinish}
        initialValues={{
          zip_code: profileData?.address.zip_code,
          address: profileData?.address.address,
          number: profileData?.address.number,
          complement: profileData?.address.complement,
          neighborhood: profileData?.address.neighborhood,
          city: profileData?.address.city,
          state: profileData?.address.state,
        }}
      >
        <Form.Item name="zip_code" label="Cep">
          <Input />
        </Form.Item>
        <Form.Item name="address" label="Endereço">
          <Input />
        </Form.Item>
        <Form.Item name="number" label="Numero">
          <Input />
        </Form.Item>
        <Form.Item name="complement" label="Complemento">
          <Input />
        </Form.Item>
        <Form.Item name="neighborhood" label="Bairro">
          <Input />
        </Form.Item>
        <Form.Item name="city" label="Cidade">
          <Input />
        </Form.Item>
        <Form.Item name="state" label="Estado">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button
            loading={!!isLoading}
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

export default EditAddress;
