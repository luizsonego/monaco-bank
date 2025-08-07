import React, { useState, useEffect } from "react";
import { Card, Flex, Collapse, Button } from "antd";
import Title from "antd/es/typography/Title";
import { useWalletGet } from "../hooks/useWallet.query";
import { formatCurrency } from "../Helpers/moneyFormat";

const InvestmentSection = () => {
  const [showAmounts, setShowAmounts] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { data: walletData } = useWalletGet();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const cardStyle = {
    background: "#e4e4e4",
    marginBottom: 15,
    marginTop: 15,
    borderRadius: "12px",
    padding: 0,
    width: "100%",
    boxSizing: "border-box"
  };

  const titleStyle = {
    margin: 0,
    fontSize: isMobile ? "16px" : "18px",
    lineHeight: "1.2",
    wordBreak: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };

  const extraTitleStyle = {
    margin: 0,
    color: "#081331",
    fontSize: isMobile ? "14px" : "16px",
    lineHeight: "1.2"
  };

  const contentStyle = {
    padding: "8px 0",
    fontSize: isMobile ? "14px" : "16px",
    wordBreak: "break-word",
    overflow: "hidden",
    textOverflow: "ellipsis"
  };

  const collapseStyle = {
    marginBottom: "15px",
    backgroundColor: "transparent",
    width: "100%"
  };

  const flexStyle = {
    flexDirection: isMobile ? "column" : "row",
    width: "100%",
    gap: isMobile ? 8 : 10
  };

  const buttonStyle = {
    height: isMobile ? 40 : 45,
    borderRadius: "8px",
    borderColor: "#081331",
    color: "#081331",
    backgroundColor: "transparent",
    fontSize: isMobile ? "12px" : "14px",
    width: isMobile ? "100%" : "100%",
    minWidth: isMobile ? "100%" : "auto"
  };

  return (
    <Card
      bordered={false}
      style={cardStyle}
    >
    <>
      <Collapse
        items={[
          {
            key: "1",
            label: (
              <Title level={4} style={titleStyle}>
                Investimento
              </Title>
            ),
            extra: (
              <Title level={5} style={extraTitleStyle}>
                Expandir
              </Title>
            ),
            children: (
              <div style={contentStyle}>
                {showAmounts
                  ? formatCurrency(walletData?.amount || 0, "USD")
                  : "*********"}
              </div>
            ),
          },
        ]}
        expandIconPosition="right"
        bordered={false}
        defaultActiveKey={["1"]}
        style={collapseStyle}
      />

      <Flex 
        justify="space-between" 
        style={flexStyle}
      >
        <Button
          type="default"
          block
          style={buttonStyle}
        >
          Ver
        </Button>
        <Button
          type="default"
          block
          style={buttonStyle}
        >
          Enviar
        </Button>
      </Flex>
    </>
    </Card>
  );
};

export default InvestmentSection; 