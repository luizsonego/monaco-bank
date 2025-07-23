import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminTransactionsGet } from "../../hooks/useWallet.query";
import { Button, Card, Drawer, Form, Input } from "antd";
import { date_format } from "../../Helpers/dateFormat";
import { type_format, type_format_color } from "../../Helpers/typeFormat";
import { formatCurrency } from "../../Helpers/moneyFormat";
import { ActionSheet } from "antd-mobile";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Flex } from "antd";

const Lancamentos = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [openDrawerEditTransaction, setOpenDrawerEditTransaction] =
    useState(false);
  const [dataDrawerEditTransaction, setDataDrawerEditTransaction] = useState(
    {}
  );

  const { data, isLoading } = useAdminTransactionsGet(id);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Formato yyyy-mm-dd, ajustável conforme necessário
  };

  const handleOpenEditTransaction = (id) => {
    const selectedTransaction = data.find((item) => item.id === id);
    if (selectedTransaction) {
      // Garantir que a data está correta antes de definir no estado
      const transactionWithFormattedDate = {
        ...selectedTransaction,
        date: formatDate(selectedTransaction.date), // Formatando a data conforme necessário
      };
      setDataDrawerEditTransaction(transactionWithFormattedDate);
      setOpenDrawerEditTransaction(true);
    }
  };

  const handleCloseDrawerEditTransaction = () => {
    form.resetFields();
    setDataDrawerEditTransaction({});
    setOpenDrawerEditTransaction(false);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      // Atualizar o estado conforme necessário quando os dados estiverem disponíveis
      setDataDrawerEditTransaction(data[0]); // Exemplo, pode ser ajustado conforme necessário
    }
  }, [data]);

  // const handleOpenEditTransaction = (id) => {
  //   setDataDrawerEditTransaction(data.find((item) => item.id === id));
  //   setOpenDrawerEditTransaction(!openDrawerEditTransaction);
  // };

  // const handleCloseDrawerEditTransaction = () => {
  //   form.resetFields();
  //   setDataDrawerEditTransaction({});
  //   setOpenDrawerEditTransaction(!openDrawerEditTransaction);
  // };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  if (isLoading) {
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        Loading...
      </div>
    );
  }
  
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
      {/* Header Section */}
      <Flex spacing="4" style={{ marginBottom: 20 }}>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Box>
            <Heading size="sm">Lançamentos</Heading>
          </Box>
        </Flex>
      </Flex>

      {/* Transactions List */}
      <div>
        {data?.map((transaction) => (
          <Card
            key={transaction.id}
            bordered={false}
            loading={isLoading}
            style={{ marginBottom: 10 }}
          >
            <span style={{ color: "#797777", fontSize: 12 }}>
              {date_format(transaction.date)}
            </span>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: 18, color: "#555555" }}>
                {type_format(transaction.type_transaction)}
              </span>
              <span
                style={{
                  fontSize: 20,
                  color: type_format_color(transaction.type_transaction),
                }}
              >
                {formatCurrency(transaction.amount_money, "USD")}
              </span>
            </div>
            <span style={{ color: "#797777", fontSize: 12 }}>
              {transaction.description}
            </span>
            <span style={{ color: "#797777", fontSize: 12 }}>
              <Button
                type="dashed"
                style={{
                  margin: "25px 0 -20px 0",
                  display: "block",
                  width: "100%",
                }}
                onClick={() =>
                  handleNavigate(`/admin/lancamento/${transaction.id}`)
                }
                // onClick={() => handleOpenEditTransaction(transaction.id)}
              >
                Editar
              </Button>
            </span>
          </Card>
        ))}
      </div>
      
      <Drawer
        title="Editar lançamento"
        destroyOnClose={true}
        open={openDrawerEditTransaction}
        onClose={handleCloseDrawerEditTransaction}
        placement="bottom"
      >
        <Form
          form={form}
          layout="vertical"
          name="create-user"
          onFinish={onFinish}
          initialValues={{
            ...dataDrawerEditTransaction,
          }}
        >
          <Form.Item name="date" label="Data">
            <Input />
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default Lancamentos;
