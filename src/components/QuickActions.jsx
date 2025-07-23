import React from "react";
import { Card, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { 
  WalletOutlined, 
  SwapOutlined, 
  MessageOutlined 
} from "@ant-design/icons";

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      icon: <WalletOutlined style={{ fontSize: "24px", color: "#081331" }} />,
      label: "Extrato",
      onClick: () => navigate("/investiment")
    },
    {
      icon: <SwapOutlined style={{ fontSize: "24px", color: "#081331" }} />,
      label: "Transferir",
      onClick: () => navigate("/user-transfer")
    },
    {
      icon: <MessageOutlined style={{ fontSize: "24px", color: "#081331" }} />,
      label: "Chat",
      onClick: () => navigate("/messages")
    }
  ];

  return (
    // <Card
    //   bordered={false}
    //   style={{ 
    //     marginBottom: 15, 
    //     marginTop: 15,
    //     borderRadius: "12px"
    //   }}
    // >
      <Flex justify="space-around" align="center" style={{ padding: "20px 0" }}>
        {actions.map((action, index) => (
          <div
            key={index}
            onClick={action.onClick}
            style={{
              backgroundColor: "#E9E9E9",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              padding: "15px",
              borderRadius: "14px",
              transition: "background-color 0.2s",
              minWidth: "30%",
              height: "103px",
              boxShadow: "3px 4px 4px -3px rgba(0, 0, 0, 0.25)"
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#E9E9E9";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "#E9E9E9";
            }}
          >
            <div style={{ marginBottom: "8px",left: 0, position: "relative" }}>
              {action.icon}
            </div>
            <span style={{ 
              fontSize: "14px", 
              fontWeight: "500", 
              color: "#081331",
              textAlign: "center",
              top: 25,
              position: "relative"
            }}>
              {action.label}
            </span>
          </div>
        ))}
      </Flex>
    // </Card>
  );
};

export default QuickActions; 