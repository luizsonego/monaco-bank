import { Card } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";

const Shortcuts = ({ icon, label }) => {
  return (
    <Card
      bordered
      style={{
        width: 130,
        height: 120,
        borderColor: "#ccc",
        borderWidth: 3,
      }}
    >
      {icon}
      <Title
        level={5}
        style={{ textAlign: "center", marginTop: 10 }}
        color="#081331"
      >
        {label}
      </Title>
    </Card>
  );
};

export default Shortcuts;
