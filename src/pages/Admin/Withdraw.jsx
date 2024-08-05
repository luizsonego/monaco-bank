import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DatePicker, Form, Input } from "antd";
import { Button, Toast } from "antd-mobile";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWithdrawPost } from "../../hooks/useWallet.query";
import CurrencyInput from "react-currency-input";

const Withdraw = () => {
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
      values: {
        amount: values.amount,
        date: dateInput,
        description: values.description,
      },
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

        <Form.Item name="date" label="Descrição">
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
    </div>
  );
};

export default Withdraw;
