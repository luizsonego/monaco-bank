import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Avatar, List } from "antd-mobile";
import React from "react";
import { useProfileGet } from "../../hooks/useProfile.query";
import { Button, Divider, Empty } from "antd";
import { EditSOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

const ProfileIndex = () => {
  const navigate = useNavigate();
  const { data: profileData, isLoading: loadingProfile } = useProfileGet();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Flex spacing="4">
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar name="Segun Adebayo" src="" />

          <Box>
            <Heading size="sm">{profileData?.profile.name}</Heading>
            <Text>{profileData?.profile.time_contract}</Text>
          </Box>
        </Flex>
        <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" />
      </Flex>

      <List
        mode="card"
        header={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Dados Pessoais</Text>
            <Button
              type="text"
              onClick={() => handleNavigate("/profile/edit-profile")}
            >
              <EditSOutline />
            </Button>
          </div>
        }
      >
        <List.Item title="Email">{profileData?.profile.email}</List.Item>
        <List.Item title="Whatsapp">
          {profileData?.profile.whatsapp || "-"}
        </List.Item>
        <List.Item title="Telefone">
          {profileData?.profile.phone || "-"}
        </List.Item>
      </List>
      <Divider />
      {profileData?.address?.zip_code === null ? (
        <List
          mode="card"
          header={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Endereço</Text>
              <Button
                type="text"
                onClick={() => handleNavigate("/profile/edit-address")}
              >
                <EditSOutline />
              </Button>
            </div>
          }
        >
          <Empty description="Endereço não cadastrado" />
          <Button
            type="dashed"
            style={{
              margin: "10px auto",
              textAlign: "center",
              display: "block",
            }}
          >
            <div onClick={() => handleNavigate("/profile/edit-address")}>
              Adicionar
            </div>
          </Button>
        </List>
      ) : (
        <List mode="card" header="Endereço">
          <List.Item title="CEP">{profileData?.address?.zip_code}</List.Item>
          <List.Item title="Endereço">
            {profileData?.address?.address}, {profileData?.address?.number}
          </List.Item>
          <List.Item title="Complemento">
            {profileData?.address?.complement}
          </List.Item>
          <List.Item title="Bairro">
            {profileData?.address?.neighborhood}
          </List.Item>
          <List.Item title="Cidade">
            {profileData?.address?.city} - {profileData?.address?.state}
          </List.Item>
        </List>
      )}
      {profileData?.bank?.bank === null ? (
        <List
          mode="card"
          header={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Dados Bancarios</Text>
              <Button
                type="text"
                onClick={() => handleNavigate("/profile/edit-bank")}
              >
                <EditSOutline />
              </Button>
            </div>
          }
        >
          <Empty description="Dados bancarios não cadastrados" />
          <Button
            type="dashed"
            style={{
              margin: "10px auto",
              textAlign: "center",
              display: "block",
            }}
            onClick={() => handleNavigate("/profile/edit-bank")}
          >
            Adicionar
          </Button>
        </List>
      ) : (
        <List
          mode="card"
          header={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text>Dados Bancarios</Text>
              <Button
                type="text"
                onClick={() => handleNavigate("/profile/edit-bank")}
              >
                <EditSOutline />
              </Button>
            </div>
          }
        >
          <List.Item title="CEP">{profileData?.bank?.bank}</List.Item>
          <List.Item title="Agência">
            {profileData?.bank?.bank_agency}
          </List.Item>
          <List.Item title="Conta">{profileData?.bank?.bank_account}</List.Item>
          <List.Item title="Tipo de conta">
            {profileData?.bank?.bank_account_type}
          </List.Item>
          <List.Item title="Numero da conta">
            {profileData?.bank?.bank_account_number}
          </List.Item>
          <List.Item title="Pix">{profileData?.bank?.bank_pix}</List.Item>

          <List.Item title="Iban">{profileData?.bank?.bank_iban}</List.Item>
          <List.Item title="Swift">{profileData?.bank?.bank_swift}</List.Item>
          <List.Item title="Office">
            {profileData?.bank?.bank_office_phone}
          </List.Item>
        </List>
      )}

      <Divider />

      <List header="">
        <List.Item onClick={() => handleNavigate("alterar-senha")}>
          Alterar senha
        </List.Item>
      </List>
    </div>
  );
};

export default ProfileIndex;
