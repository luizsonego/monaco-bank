import React from "react";
import { Flex } from "antd";
import MainHeader from "../../components/layout/MainHeader";
import QuickActions from "../../components/QuickActions";
import InvestmentSection from "../../components/InvestmentSection";
import GlobalAccountCard from "../../components/GlobalAccountCard";
import BottomNavigation from "../../components/layout/BottomNavigation";
import CardMoeda from "../../components/CardMoeda";
import usaFlag from "../../assets/usa.png";
import unFlag from "../../assets/un.png";

const Home = () => {
  return (
    <div style={{ 
      paddingBottom: "0px",
      display: "flex",
      flexDirection: "column",
      flex: 1,
    }}>
      {/* Header Principal */}
      <MainHeader />

      {/* Conteúdo Principal */}
      <div style={{
        padding: "0 15px",
        backgroundColor: '#F0F0F0',
        background: 'linear-gradient(90deg,rgba(240, 240, 240, 1) 0%, rgba(204, 204, 204, 1) 100%)',
        height: 'auto',
        minHeight: 550,
        borderRadius: '25px 25px 0 0',
        flex: 1,
      }}>
        {/* Ações Rápidas */}
        <QuickActions />

        {/* Seção de Investimento */}
        <InvestmentSection />

        {/* Cards de Moedas */}
        {/* <Flex gap={10} style={{ marginBottom: "15px" }}>
          <CardMoeda moeda={"Dolar"} simb={""} flag={usaFlag} />
          <CardMoeda moeda={"Euro"} simb={""} flag={unFlag} />
        </Flex> */}

        {/* Card Conta Global */}
        <div style={{
          marginTop: 10,
          marginBottom: 100,
        }}>
          <GlobalAccountCard />
        </div>
      </div>

      {/* Navegação Inferior */}
      {/* <BottomNavigation /> */}
    </div>
  );
};

export default Home;
