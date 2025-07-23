import React, { useState } from "react";
import { Card, Flex, Collapse, Button } from "antd";
import Title from "antd/es/typography/Title";
import { useWalletGet } from "../hooks/useWallet.query";
import { formatCurrency } from "../Helpers/moneyFormat";

const InvestmentSection = () => {
  const [showAmounts, setShowAmounts] = useState(true);
  const { data: walletData } = useWalletGet();

  return (
    <Card
      bordered={false}
      style={{
        background: "#e4e4e4",
        marginBottom: 15,
        marginTop: 15,
        borderRadius: "12px",
        padding: 0
      }}
    >
    <>
      <Collapse
        items={[
          {
            key: "1",
            label: <Title level={4} style={{ margin: 0, left: 0, position: "relative" }}>Investimento</Title>,
            extra: <Title level={5} style={{ margin: 0, color: "#081331" }}>Expandir </Title>,
            children: (
              <div style={{ padding: "0px 0" }}>
                {showAmounts
                  ? formatCurrency(walletData?.amount || 500000, "USD")
                  : "*********"}
              </div>
            ),
          },
        ]}
        expandIconPosition="right"
        bordered={false}
        defaultActiveKey={["1"]}
        style={{ marginBottom: "15px", backgroundColor: "transparent" }}
      />

      <Flex justify="space-between" gap={10}>
        <Button
          type="default"
          block
          style={{ 
            height: 45, 
            borderRadius: "8px",
            borderColor: "#081331",
            color: "#081331",
            backgroundColor: "transparent"
          }}
        >
          Ver
        </Button>
        <Button
          type="default"
          block
          style={{ 
            height: 45, 
            borderRadius: "8px",
            borderColor: "#081331",
            color: "#081331",
            backgroundColor: "transparent"
          }}
        >
          Enviar
        </Button>
      </Flex>
    </>
    </Card>
  );
};

export default InvestmentSection; 