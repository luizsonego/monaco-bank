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
  height: 64,
  flex: 0,
  zIndex: 100,
};

const contentStyle = {
  padding: "16px",
  flex: 1,
  background: "#eee",
  display: "flex",
  flexDirection: "column",
  marginBottom: 64,
};
const layoutStyle = {
  borderRadius: 8,
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
