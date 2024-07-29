import { Form, Input, message, notification } from "antd";
import React from "react";
import { Button, Toast } from "antd-mobile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAdminProfileGet,
  useProfilePut,
} from "../../../hooks/useProfile.query";

const AdminEditAddress = () => {
  let { id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { data: profileData, isLoading: loadingProfile } =
    useAdminProfileGet(id);

  const { mutate, isLoading } = useMutation({
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
          zip_code: profileData?.address?.zip_code,
          address: profileData?.address?.address,
          number: profileData?.address?.number,
          complement: profileData?.address?.complement,
          neighborhood: profileData?.address?.neighborhood,
          city: profileData?.address?.city,
          state: profileData?.address?.state,
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

export default AdminEditAddress;
