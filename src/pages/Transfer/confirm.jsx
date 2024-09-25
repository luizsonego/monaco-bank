import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Card,
  Descriptions,
  Flex,
  Form,
  Input,
  notification,
  Typography,
} from "antd";
import { Button, Divider } from "antd-mobile";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTransferPost } from "../../hooks/useWallet.query";
import { formatCurrency } from "../../Helpers/moneyFormat";

const { Title, Text } = Typography;

const Confirm = () => {
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  let { transfer } = useParams();
  let data = atob(transfer);

  const partes = data.split(",");

  // Atribuir cada parte a uma variável para facilitar o uso
  const id = partes[0]; // "01d5d7a7-3b66-45bf-afa0-1270e914e62d"
  const numero = partes[1]; // "79424228-3"
  const nomeCliente = partes[2]; // "Cliente teste 2"
  const email = partes[3]; // "email.email@r.coms"
  const amount = partes[4]; // "2,0000"
  const user_sending = partes[5]; // "01d5d7a7-3b66-45bf-afa0-1270e914e62d"

  const { mutate, isPending } = useMutation({
    mutationFn: useTransferPost,
    onSuccess: (data) => {
      api.info({
        message: data.message,
      });
      if (data.status === 201) {
        navigate("/");
      }
    },
  });

  const onFinish = (values) => {
    const data = {
      id: user_sending,
      values,
    };
    mutate(data);
  };

  return (
    <div>
      <Title level={5} style={{ textAlign: "center" }}>
        Detalhes da transferência
      </Title>{" "}
      <Card style={{ textAlign: "center" }}>
        <Title level={2}>{formatCurrency(amount, "USD")}</Title>
        <Title level={5} style={{ fontWeight: 400 }}>
          valor da transferência
        </Title>
      </Card>
      <br />
      <br />
      <Text>DADOS DO BENEFICIÁRIOS</Text>
      <br />
      <br />
      <Flex justify="space-between">
        <Text strong>Beneficiário</Text>
        <Text>{nomeCliente}</Text>
      </Flex>
      <Divider />
      <Flex justify="space-between">
        <Text strong>Numero da conta</Text>
        <Text>{numero}</Text>
      </Flex>
      <Divider />
      <Flex justify="space-between">
        <Text strong>Email</Text>
        <Text>{email}</Text>
      </Flex>
      <br />
      <br />
      <br />
      <br />
      <Form
        form={form}
        layout="vertical"
        name="create-user"
        onFinish={onFinish}
        initialValues={{
          user_id: id,
          amount: amount,
        }}
      >
        <Form.Item name="user_id" label="" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="amount" label="" hidden>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            loading={!!isPending}
            style={{ width: "100%", marginRight: 0 }}
            type="submit"
            color="primary"
          >
            Confirmar transferência
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Confirm;
