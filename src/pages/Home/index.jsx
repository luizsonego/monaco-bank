import { NavBar, Space, Toast } from "antd-mobile";
import React, { useState } from "react";
import Header from "../../components/layout/Header";
import { useTransactionsGet, useWalletGet } from "../../hooks/useWallet.query";
// import { Card, CardBody } from "@chakra-ui/react";
import Title from "antd/es/typography/Title";
import { Card, Divider, Flex, Statistic } from "antd";
import { formatCurrency } from "../../Helpers/moneyFormat";
import { type_format, type_format_color } from "../../Helpers/typeFormat";
import { date_format } from "../../Helpers/dateFormat";
import HeaderProfile from "../../components/layout/HeaderProfile";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const Home = () => {
  const [showAmounts, setShowAmounts] = useState(true);
  const { data: walletData, isLoading: loadingWallet } = useWalletGet();
  const { data: transactionsData, isLoading: loadingTransactions } =
    useTransactionsGet();

  const handleShowAmount = () => {
    setShowAmounts(!showAmounts);
  };

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
          title={
            <Flex justify={"space-between"}>
              <div>Valor na carteira</div>
              <div onClick={handleShowAmount}>
                {showAmounts ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              </div>
            </Flex>
          }
          value={
            showAmounts
              ? formatCurrency(walletData?.amount, "USD")
              : "*********"
          }
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
              <span style={{ fontSize: 16, fontWeight: 500, color: "#555555" }}>
                {type_format(transaction.type_transaction)}
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: type_format_color(transaction.type_transaction),
                }}
              >
                {showAmounts
                  ? formatCurrency(transaction.amount_money, "USD")
                  : "*********"}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
