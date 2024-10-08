import React from "react";
import HeaderProfile from "../../components/layout/HeaderProfile";
import { useTransactionsGet } from "../../hooks/useWallet.query";
import { Card, Flex, List, Table } from "antd";
import { date_format } from "../../Helpers/dateFormat";
import { type_format, type_format_color } from "../../Helpers/typeFormat";
import { formatCurrency } from "../../Helpers/moneyFormat";

const Movements = () => {
  const { data: transactionsData, isLoading: loadingTransactions } =
    useTransactionsGet();

  return (
    <div>
      <HeaderProfile color="#0e0e0e" />

      {/* {transactionsData?.map((transaction) => (
        <Card
          bordered={false}
          loading={loadingTransactions}
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
        </Card>
      ))} */}

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
