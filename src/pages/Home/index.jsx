import { NavBar, Space, Toast } from "antd-mobile";
import React from "react";
import Header from "../../components/layout/Header";
import { useTransactionsGet, useWalletGet } from "../../hooks/useWallet.query";
// import { Card, CardBody } from "@chakra-ui/react";
import Title from "antd/es/typography/Title";
import { Card, Divider, Statistic } from "antd";
import { formatCurrency } from "../../Helpers/moneyFormat";
import { type_format, type_format_color } from "../../Helpers/typeFormat";
import { date_format } from "../../Helpers/dateFormat";
import HeaderProfile from "../../components/layout/HeaderProfile";

const Home = () => {
  const { data: walletData, isLoading: loadingWallet } = useWalletGet();
  const { data: transactionsData, isLoading: loadingTransactions } =
    useTransactionsGet();

  return (
    <>
      <div
        style={{
          background: "#081331",
          width: "100%",
          height: 350,
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 0,
        }}
      ></div>
      <HeaderProfile color={"#fefefe"} />

      <Card bordered={false} loading={loadingWallet}>
        <Statistic
          title="Valor na carteira"
          value={formatCurrency(walletData?.amount, "USD")}
          valueStyle={{
            color: "#3f8600",
          }}
        />
      </Card>
      <Divider />

      <div>
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
              <span
                style={{
                  fontSize: 18,
                  color: type_format_color(transaction.type_transaction),
                }}
              >
                {type_format(transaction.type_transaction)}
              </span>
              <span style={{ fontSize: 20, color: "#555555" }}>
                {formatCurrency(transaction.amount_money, "USD")}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
