import React from "react";
import { Flex } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  HomeOutlined, 
  CreditCardOutlined, 
  MessageOutlined, 
  UserOutlined, 
  LogoutOutlined 
} from "@ant-design/icons";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      icon: <HomeOutlined style={{ fontSize: "20px" }} />,
      path: "/",
      label: "Home"
    },
    {
      icon: <CreditCardOutlined style={{ fontSize: "20px" }} />,
      path: "/movements",
      label: "Cartões"
    },
    {
      icon: <MessageOutlined style={{ fontSize: "20px" }} />,
      path: "/messages",
      label: "Chat"
    },
    {
      icon: <UserOutlined style={{ fontSize: "20px" }} />,
      path: "/profile",
      label: "Perfil"
    },
    {
      icon: <LogoutOutlined style={{ fontSize: "20px" }} />,
      path: "/logout",
      label: "Sair"
    }
  ];

  const handleNavigation = (path) => {
    if (path === "/logout") {
      // Implementar logout
      navigate("/signin");
    } else {
      navigate(path);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#ffffff55",
        borderTop: "1px solid #e8e8e8",
        padding: "10px 0",
        zIndex: 1000
      }}
    >
      <Flex justify="space-around" align="center">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavigation(item.path)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              padding: "5px",
              borderRadius: "8px",
              transition: "all 0.2s",
              color: location.pathname === item.path ? "#081331" : "#666",
              minWidth: "60px"
            }}
            onMouseEnter={(e) => {
              e.target.style.color = "#081331";
            }}
            onMouseLeave={(e) => {
              e.target.style.color = location.pathname === item.path ? "#081331" : "#666";
            }}
          >
            <div style={{ marginBottom: "4px" }}>
              {item.icon}
            </div>
            <span style={{ 
              fontSize: "10px", 
              fontWeight: location.pathname === item.path ? "600" : "400"
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </Flex>
    </div>
  );
};

export default BottomNavigation; 