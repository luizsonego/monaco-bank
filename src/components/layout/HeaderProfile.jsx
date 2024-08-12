import { Avatar, List, Switch } from "antd-mobile";
import Title from "antd/es/typography/Title";
import React from "react";
import { useProfileGet } from "../../hooks/useProfile.query";
import { Flex } from "antd";
import { MessageOutline, QuestionCircleOutline } from "antd-mobile-icons";

const HeaderProfile = ({ color }) => {
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
          title="Bem vindo"
          description={profileData?.profile?.account_number}
          extra={
            <Flex gap={8}>
              <QuestionCircleOutline fontSize={22} />
              <MessageOutline fontSize={22} />
            </Flex>
          }
        >
          {profileData?.profile?.aplido || profileData?.profile?.name}
        </List.Item>
      </List>
    </div>
  );
};

export default HeaderProfile;
