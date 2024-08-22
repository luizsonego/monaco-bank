import { Box, Heading, Text } from "@chakra-ui/react";
import { Flex, Form, Input, notification, Select } from "antd";
import { Button, Card } from "antd-mobile";
import React from "react";
import {
  useProfileDescriptionGet,
  useProfilesGet,
} from "../../hooks/useProfile.query";
import { useNavigate, useParams } from "react-router-dom";
import CurrencyInput from "react-currency-input";
import { useTransferPost } from "../../hooks/useWallet.query";
import { useMutation } from "@tanstack/react-query";

const Transfer = () => {
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  let { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useProfileDescriptionGet(id);
  const { data: listUsers, isLoading: loadingUser } = useProfilesGet();
  const { mutate, isPending } = useMutation({
    mutationFn: useTransferPost,
    onSuccess: (data) => {
      api.info({
        message: data.message,
      });
      if (data.status === 201) {
        navigate(-1);
      }
    },
  });
  console.log(listUsers);

  const onFinish = (values) => {
    const data = {
      id: id,
      values,
    };
    mutate(data);
  };
  return (
    <div>
      <Flex spacing="4">
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Box>
            <Heading size="sm">{"Transferencia bancaria"}</Heading>
          </Box>
        </Flex>
      </Flex>

      <Card bordered={false} style={{ marginTop: 20 }}>
        <Text align={"center"}>
          Transferência do usuário: {data?.profile.name}
        </Text>
        <br />
        <Form
          form={form}
          layout="vertical"
          name="create-user"
          onFinish={onFinish}
        >
          <Form.Item name="amount" label="Valor a ser transferido">
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
          <Form.Item name="user_id" label="Para o usuário">
            <Select
              // defaultValue="lucy"
              // style={{ width: 120 }}
              // onChange={handleChange}
              options={listUsers?.map((user) => ({
                value: user.id,
                label: `${user?.name} - ${user?.account_number}`,
              }))}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={!!isPending}
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

export default Transfer;
