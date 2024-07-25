import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Input } from "antd";
import { Button, Toast } from "antd-mobile";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useApportPut } from "../../hooks/useWallet.query";

const Apport = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate } = useMutation({
    mutationFn: useApportPost,
    onSuccess: (data) => {
      Toast.show({
        content: data.message,
      });
      if (data.status === 201) {
        navigate("/admin");
      }
    },
  });

  const onFinish = (values) => {
    const data = {
      id: id,
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
      >
        <Form.Item name="amount" label="Valor">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Descrição">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            // loading={!!isLoading}
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

export default Apport;
