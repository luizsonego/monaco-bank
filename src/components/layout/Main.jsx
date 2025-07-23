import React from "react";
import { Affix, Drawer, Flex, Layout } from "antd";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "antd-mobile";
import { background, border, position } from "@chakra-ui/react";
import FooterComponent from "./Footer";
import HeaderProfile from "./HeaderProfile";

const { Content } = Layout;

const headerStyle = {
  background: "#000",
  position: "absolute",
  width: "100%",
  height: 300,
  flex: 0,
  zIndex: 100,
};

const contentStyle = {
  backgroundColor: '#081331',
  background: 'linear-gradient(180deg,rgba(8, 19, 49, 1) 0%, rgba(25, 59, 151, 1) 100%)',
  flex: 1,
  display: "flex",
  flexDirection: "column",
};
const layoutStyle = {
  overflow: "hidden",
  minHeight: "100vh",
  display: "flex",
};

const Main = () => {
  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}></Header>
      <Content style={contentStyle}>
        <Outlet />
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default Main;
