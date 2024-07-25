import { Avatar, List } from "antd-mobile";
import Title from "antd/es/typography/Title";
import React from "react";
import { useProfileGet } from "../../hooks/useProfile.query";

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
      }}
    >
      <List mode="card" style={{ margin: 0 }}>
        <List.Item prefix={<Avatar src="" />}>
          <Title level={4} style={{ color: color }}>
            {profileData?.profile?.name}
          </Title>
        </List.Item>
      </List>
    </div>
  );
};

export default HeaderProfile;
