import { List } from "antd-mobile";

import React from "react";
import { useProfilesGet } from "../../hooks/useProfile.query";
import { useNavigate } from "react-router-dom";

const ListProfiles = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useProfilesGet();

  const handleNavigate = (path) => {
    navigate(path);
  };
  return (
    <div>
      <List>
        {isLoading && <List.Item>Carregando...</List.Item>}
        {data?.map((profile) => (
          <List.Item
            onClick={() => handleNavigate(`/admin/description/${profile.id}`)}
            key={profile.id}
          >
            {profile.name}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default ListProfiles;
