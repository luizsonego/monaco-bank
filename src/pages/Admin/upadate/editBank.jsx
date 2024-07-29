import { Divider, Form, Input, notification } from "antd";
import React from "react";
import { Button, Toast } from "antd-mobile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAdminProfileGet,
  useProfilePut,
} from "../../../hooks/useProfile.query";

const AdminEditBank = () => {
  let { id } = useParams();
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { data: profileData, isLoading: loadingProfile } =
    useAdminProfileGet(id);

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

export default AdminEditBank;
