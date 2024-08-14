import { Avatar, List, Switch } from "antd-mobile";
import Title from "antd/es/typography/Title";
import React from "react";
import { useProfileGet } from "../../hooks/useProfile.query";
import { Flex } from "antd";
import { MessageOutline, QuestionCircleOutline } from "antd-mobile-icons";
import { useLocation } from "react-router-dom";

const HeaderProfile = ({ color }) => {
  const location = useLocation();
  const { pathname } = location;

  const pathColor = pathname !== "/" ? "#081331" : "#e1e0e5";

  const { data: profileData, isLoading: loadingProfile } = useProfileGet();

  return (
    <div
      style={{
        bottom: 0,
        left: 0,
        width: "100%",
        zIndex: 100,
        height: 75,
        marginTop: 30,
        marginBottom: 30,
      }}
    >
      <List mode="card" style={{ margin: 0 }}>
        <List.Item
          prefix={
            <Avatar
              src=""
              style={{ "--size": "60px", "--border-radius": "50%" }}
            />
          }
          title={<span style={{ color: pathColor }}>Bem vindo</span>}
          description={
            <span style={{ color: pathColor }}>
              {profileData?.profile?.account_number}
            </span>
          }
          extra={
            <Flex gap={8}>
              <QuestionCircleOutline fontSize={22} />
              <MessageOutline fontSize={22} />
            </Flex>
          }
          style={{ color: pathColor }}
        >
          {profileData?.profile?.aplido || profileData?.profile?.name} NOME
        </List.Item>
      </List>
    </div>
  );
};

export default HeaderProfile;
