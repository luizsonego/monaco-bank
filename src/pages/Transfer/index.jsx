import { Box, Heading, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Flex, Form, Input, notification } from "antd";
import { Button, Card } from "antd-mobile";
import React from "react";
import { useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input";
import { useTransferPost } from "../../hooks/useProfile.query";

const UserTransfer = () => {
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  // const {} = useTransferGet()

  const { mutate, isLoading, isPending } = useMutation({
    mutationFn: useTransferPost,
    onSuccess: ({ data, status }) => {
      api.success({
        message: data.message,
      });
      let encode = btoa([
        data.id,
        data.account_number,
        data.name,
        data.email,
        data.amount,
        data.user,
      ]);
      if (status === 200) {
        navigate(`confirm-transfer/${encode}`);
      }
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };
  return (
    <div>
      <Flex spacing="4">
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Box>
            <Heading size="sm">{"Transferência bancaria"}</Heading>
          </Box>
        </Flex>
      </Flex>

      <Card bordered={false} style={{ marginTop: 20 }}>
        <Text align={"center"}>Transferência</Text>
        <br />
        <Form
          form={form}
          layout="vertical"
          name="create-user"
          onFinish={onFinish}
        >
          <Form.Item name="account_number" label="Numero de conta">
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="Valor">
            <CurrencyInput
              // prefix="$ "
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

          <Form.Item>
            <Button
              loading={!!isLoading || !!isPending}
              style={{ width: "100%", marginRight: 0 }}
              type="submit"
              color="primary"
            >
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserTransfer;
