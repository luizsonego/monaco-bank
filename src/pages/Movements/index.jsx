import React from "react";
import HeaderProfile from "../../components/layout/HeaderProfile";
import { useTransactionsGet, useTransactionsPrintGet } from "../../hooks/useWallet.query";
import { Card, Flex, List, Table } from "antd";
import { date_format, formatDateShort } from "../../Helpers/dateFormat";
import { type_format, type_format_color, type_format_color_ARROW } from "../../Helpers/typeFormat";
import { formatCurrency } from "../../Helpers/moneyFormat";
import { Button } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { getTypeArrow } from "../../Helpers/statusExtract";

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
    <div style={{
      marginTop: 25,
      backgroundColor: '#F0F0F0',
      background: 'linear-gradient(90deg,rgba(240, 240, 240, 1) 0%, rgba(204, 204, 204, 1) 100%)',
      flex: 1,
      borderRadius: '25px 25px 0 0',
      paddingTop: 30,
      paddingLeft: 15,
      paddingRight: 15,
    }}>
      {/* <HeaderProfile color="#0e0e0e" /> */}
      
      <h1 style={{ fontSize: 20, fontWeight: "bold", marginBottom: 20, textAlign: "center" }}>Transações</h1>
      {transactionsData?.map((transaction) => (
        <div
          style={{
            marginTop: 10,
            minHeight: 60,
            height: "auto",
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
            <span style={{ color: "#797777", fontSize: 14 }}>
              {formatDateShort(transaction.date)}
            </span>
            <span
              style={{
                color: type_format_color(transaction.type_transaction),
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {formatCurrency(transaction.amount_money, "USD")}
            </span>
          </Flex>
          <span style={{ color: "#797777", width: "100%" }}>
            <span style={{
              color: type_format_color_ARROW(transaction.type_transaction),
              fontWeight: "extrabold",
              fontSize: 25,
            }}>
            {getTypeArrow(transaction.type_transaction)} 
            </span>
            {transaction.description}
            
          </span>
        </div>
      ))}
      <Flex justify="center" style={{
        marginBottom: 25,
        bottom: 80,
        left: 0,
        right: 0,
        position: "fixed",
      }} gap={10}
      >
        <Button style={{borderColor: "#232323", borderWidth: 1, borderStyle: "solid"}} onClick={handlePrint}>Solicitar Extrato</Button>
        <Button style={{borderColor: "#232323", borderWidth: 1, borderStyle: "solid"}} onClick={handleList}>Listar Extrato</Button>
      </Flex>
    </div>
  );
};

export default Movements;