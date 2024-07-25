import { Form, Input } from "antd";
import React from "react";
import { useProfileGet, useProfilePut } from "../../hooks/useProfile.query";
import { Button, Toast } from "antd-mobile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { data: profileData, isLoading: loadingProfile } = useProfileGet();

  const { mutate } = useMutation({
    mutationFn: useProfilePut,
    onSuccess: (data) => {
      Toast.show({
        content: data.message,
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
    <div>
      <Form
        form={form}
        layout="vertical"
        name="create-user"
        onFinish={onFinish}
        initialValues={{
          name: profileData?.profile.name,
          email: profileData?.profile.email,
          phone: profileData?.profile.phone,
          whatsapp: profileData?.profile.whatsapp,
        }}
      >
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

export default EditProfile;
