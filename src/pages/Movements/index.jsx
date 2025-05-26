import React from "react";
import HeaderProfile from "../../components/layout/HeaderProfile";
import { useTransactionsGet, useTransactionsPrintGet } from "../../hooks/useWallet.query";
import { Card, Flex, List, Table } from "antd";
import { date_format } from "../../Helpers/dateFormat";
import { type_format, type_format_color } from "../../Helpers/typeFormat";
import { formatCurrency } from "../../Helpers/moneyFormat";
import { Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";

const Movements = () => {
  const navigate = useNavigate();
  const { data: transactionsData, isLoading: loadingTransactions } =
    useTransactionsGet();
  
  const handlePrint = () => {
    navigate("/print");
  };

  const handleList = () => {
    navigate("list-extract");
  };

  return (
    <div>
      <HeaderProfile color="#0e0e0e" />
      <Flex justify="end">
        <Button onClick={handlePrint}>Solicitar Extrato</Button>
        <Button onClick={handleList}>Listar Extrato</Button>

      </Flex>
      {transactionsData?.map((transaction) => (
        <div
          style={{
            marginTop: 10,
            minHeight: 60,
            height: "auto",
            background: "#f5f5f5",
            paddingLeft: 5,
            paddingRight: 5,
            paddingBottom: 8,
            paddingTop: 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Flex
            gap={10}
            justifyContent="space-between"
            justify="space-between"
            alignItems="center"
            align="center"
          >
            <span style={{ color: "#797777" }}>
              {date_format(transaction.date)}
            </span>
            <span
              style={{
                color: type_format_color(transaction.type_transaction),
              }}
            >
              {formatCurrency(transaction.amount_money, "USD")}
            </span>
          </Flex>
          <span style={{ color: "#797777", width: "100%" }}>
            {transaction.description}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Movements;
