import { List } from "antd-mobile";
import React from "react";
import {
  useNewProfilesGet,
  useProfilesGet,
} from "../../hooks/useProfile.query";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Flex } from "antd";

const ListNewProfiles = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useNewProfilesGet();

  const handleNavigate = (path) => {
    navigate(path);
  };
  
  return (
    <div style={{
      backgroundColor: '#F0F0F0',
      background: 'linear-gradient(90deg,rgba(240, 240, 240, 1) 0%, rgba(204, 204, 204, 1) 100%)',
      minHeight: "100vh",
      flex: 1,
      borderRadius: '25px 25px 0 0',
      paddingTop: 30,
      paddingLeft: 15,
      paddingRight: 15,
      paddingBottom: 100,
      marginTop: 20,
    }}>
      {/* Header Section */}
      <Flex spacing="4" style={{ marginBottom: 20 }}>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Box>
            <Heading size="sm">Novos Perfis</Heading>
          </Box>
        </Flex>
      </Flex>

      {/* Profiles List */}
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
    </div>
  );
};

export default ListNewProfiles;
