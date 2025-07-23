import { Divider, Form, Input, notification } from "antd";
import React from "react";
import { useProfileGet, useProfilePut } from "../../hooks/useProfile.query";
import { Button, Toast } from "antd-mobile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const EditBank = () => {
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
      paddingBottom: 100,
    }}>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        name="create-user"
        onFinish={onFinish}
        initialValues={{
          bank: profileData?.bank?.bank,
          bank_agency: profileData?.bank?.bank_agency,
          bank_account_type: profileData?.bank?.bank_account_type,
          bank_account_number: profileData?.bank?.bank_account_number,
          bank_pix: profileData?.bank?.bank_pix,
          bank_iban: profileData?.bank?.bank_iban,
          bank_swift: profileData?.bank?.bank_swift,
          bank_office_phone: profileData?.bank?.bank_office_phone,
        }}
      >
        <Form.Item name="bank" label="Banco">
          <Input />
        </Form.Item>
        <Form.Item name="bank_agency" label="Agência">
          <Input />
        </Form.Item>
        <Form.Item name="bank_account_type" label="Tipo de conta">
          <Input />
        </Form.Item>
        <Form.Item name="bank_account_number" label="Numero da conta">
          <Input />
        </Form.Item>
        <Form.Item name="bank_iban" label="Iban">
          <Input />
        </Form.Item>
        <Form.Item name="bank_swift" label="Swift">
          <Input />
        </Form.Item>
        <Form.Item name="bank_office_phone" label="Office">
          <Input />
        </Form.Item>
        <Divider />
        <Form.Item name="bank_pix" label="PIX">
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

export default EditBank;
