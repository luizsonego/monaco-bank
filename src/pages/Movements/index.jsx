import React from "react";
import HeaderProfile from "../../components/layout/HeaderProfile";
import { useTransactionsGet } from "../../hooks/useWallet.query";
import { Card } from "antd";
import { date_format } from "../../Helpers/dateFormat";
import { type_format } from "../../Helpers/typeFormat";
import { formatCurrency } from "../../Helpers/moneyFormat";

const Movements = () => {
  const { data: transactionsData, isLoading: loadingTransactions } =
    useTransactionsGet();

  return (
    <div>
      <HeaderProfile color="#0e0e0e" />

      {transactionsData?.map((transaction) => (
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
            <span style={{ fontSize: 20, color: "#555555" }}>
              {formatCurrency(transaction.amount_money, "BRL")}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Movements;
