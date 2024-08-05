import React from "react";
import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Avatar, List } from "antd-mobile";
import { Button, Card, Divider, Empty, Statistic } from "antd";
import { EditSOutline } from "antd-mobile-icons";
import { useProfileDescriptionGet } from "../../hooks/useProfile.query";
import { useNavigate, useParams } from "react-router-dom";
import { formatCurrency } from "../../Helpers/moneyFormat";

const Description = () => {
  const navigate = useNavigate();
  let { id } = useParams();
  const { data: profileData, isLoading } = useProfileDescriptionGet(id);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <Flex spacing="4">
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar name="" src="" />

          <Box>
            <Heading size="sm">{profileData?.profile.name}</Heading>
            <Text>{profileData?.profile.time_contract}</Text>
          </Box>
        </Flex>
        <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" />
      </Flex>

      <Card bordered={false} loading={isLoading} style={{ marginTop: 20 }}>
        <Statistic
          title="Valor na carteira"
          value={formatCurrency(profileData?.wallet?.amount, "USD")}
          valueStyle={{
            color: "#3f8600",
          }}
        />
      </Card>
      <Button
        type="dashed"
        style={{ margin: "10px 0", display: "block", width: "100%" }}
        onClick={() => handleNavigate(`/admin/aporte/${id}`)}
      >
        Realizar aporte
      </Button>
      <Button
        type="dashed"
        style={{ margin: "10px 0", display: "block", width: "100%" }}
        onClick={() => handleNavigate(`/admin/saque/${id}`)}
      >
        Realizar saque
      </Button>
      <Button
        type="dashed"
        style={{ margin: "10px 0", display: "block", width: "100%" }}
        onClick={() => handleNavigate(`/admin/lancamentos/${id}`)}
      >
        Lançamentos
      </Button>
      <Divider />

      <List
        mode="card"
        header={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Text>Dados Pessoais</Text>
            <Button
              type="text"
              onClick={() => handleNavigate(`/admin/edit-profile/${id}`)}
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
                onClick={() => handleNavigate(`/admin/edit-address/${id}`)}
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
            <div onClick={() => handleNavigate(`/admin/edit-address/${id}`)}>
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
                onClick={() => handleNavigate(`/admin/edit-bank/${id}`)}
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
            onClick={() => handleNavigate(`/admin/edit-bank/${id}`)}
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
                onClick={() => handleNavigate(`/admin/edit-bank/${id}`)}
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
        </List>
      )}
    </div>
  );
};

export default Description;
