import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAdminTransactionsGet,
  useEditTransaction,
  useTransactionIdGet,
} from "../../hooks/useWallet.query";
import { Card, Drawer, Form, Input, notification } from "antd";
import { date_format } from "../../Helpers/dateFormat";
import { type_format, type_format_color } from "../../Helpers/typeFormat";
import { formatCurrency } from "../../Helpers/moneyFormat";
import { ActionSheet, Button } from "antd-mobile";

const Lancamento = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  let { transactionid } = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const { data, isLoading } = useTransactionIdGet(transactionid);

  const { mutate, isPending } = useMutation({
    mutationFn: useEditTransaction,
    onSuccess: (data) => {
      api.success({
        message: data.message,
      });
      queryClient.invalidateQueries("admin-transactions");
      if (data.status === 200 || data.status === 202) {
        navigate(-1);
      }
    },
  });

  const onFinish = (values) => {
    const data = {
      id: transactionid,
      values,
    };
    console.log(data);
    mutate(data);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading...
      </div>
    );
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
          amount_money: data?.amount,
          date: data?.date,
          description: data?.description,
        }}
      >
        <Form.Item name="date" label="Data ">
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Descrição ">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button
            loading={!!isPending}
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

export default Lancamento;
