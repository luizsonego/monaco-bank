import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatePicker, Form, Input, notification } from "antd";
import { Button, Card } from "antd-mobile";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWithdrawPost } from "../../hooks/useWallet.query";
import CurrencyInput from "react-currency-input";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Flex } from "antd";

const Withdraw = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  let { id } = useParams();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [dateInput, setDateInput] = useState();

  const onChange = (date, dateString) => {
    setDateInput(dateString);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: useWithdrawPost,
    onSuccess: (data) => {
      api.info({
        message: data.message,
      });
      if (data.status === 201) {
        navigate("/admin");
      }
    },
  });

  const onFinish = (values) => {
    const data = {
      id: id,
      values: {
        amount: values.amount,
        date: dateInput,
        description: values.description,
      },
    };
    mutate(data);
  };

  return (
    <div style={{
      backgroundColor: '#F0F0F0',
      background: 'linear-gradient(90deg,rgba(240, 240, 240, 1) 0%, rgba(204, 204, 204, 1) 100%)',
      minHeight: "100vh",
      flex: 1,
      borderRadius: '25px 25px 0 0',
      paddingTop: 30,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 100,
      marginTop: 20,
    }}>
      {contextHolder}
      
      {/* Header Section */}
      <Flex spacing="4" style={{ marginBottom: 20 }}>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Box>
            <Heading size="sm">Saque Bancário</Heading>
          </Box>
        </Flex>
      </Flex>

      {/* Form Card */}
      <Card bordered={false} style={{ marginTop: 20 }}>
        <Text align={"center"} style={{ marginBottom: 20 }}>
          Realizar saque para o usuário
        </Text>
        
        <Form
          form={form}
          layout="vertical"
          name="create-user"
          onFinish={onFinish}
        >
          <Form.Item name="amount" label="Valor">
            <CurrencyInput
              prefix="$ "
              style={{
                boxSizing: "border-box",
                margin: 0,
                padding: "4px 11px",
                color: "rgba(0, 0, 0, 0.88)",
                fontSize: "14px",
                lineHeight: 1.5714285714285714,
                listStyle: "none",
                position: "relative",
                display: "inline-block",
                width: "100%",
                minWidth: 0,
                borderRadius: " 6px",
                transition: " all 0.2s",
                background: "#ffffff",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#d9d9d9",
              }}
            />
          </Form.Item>

          <Form.Item name="date" label="Data">
            <DatePicker
              onChange={onChange}
              needConfirm
              style={{
                boxSizing: "border-box",
                margin: 0,
                padding: "4px 11px",
                color: "rgba(0, 0, 0, 0.88)",
                fontSize: "14px",
                lineHeight: 1.5714285714285714,
                listStyle: "none",
                position: "relative",
                display: "inline-block",
                width: "100%",
                minWidth: 0,
                borderRadius: " 6px",
                transition: " all 0.2s",
                background: "#ffffff",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "#d9d9d9",
              }}
            />
          </Form.Item>

          <Form.Item name="description" label="Descrição">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              loading={!!isPending}
              style={{ width: "100%", marginRight: 0 }}
              type="submit"
              color="primary"
            >
              Criar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Withdraw;
