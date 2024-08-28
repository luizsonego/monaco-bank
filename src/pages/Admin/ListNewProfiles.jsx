import { List } from "antd-mobile";

import React from "react";
import {
  useNewProfilesGet,
  useProfilesGet,
} from "../../hooks/useProfile.query";
import { useNavigate } from "react-router-dom";

const ListNewProfiles = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useNewProfilesGet();

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
            {profile.name} - {profile.account_number}
          </List.Item>
        ))}
      </List>
    </div>
  );
};

export default ListNewProfiles;
