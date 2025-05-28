import { Box, Flex, Heading, IconButton, Text } from "@chakra-ui/react";
import { Avatar, List } from "antd-mobile";
import React, { useRef, useState } from "react";
import { useProfileGet, useProfilePut } from "../../hooks/useProfile.query";
import { Button, Divider, Drawer, Empty, notification } from "antd";
import { EditSOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";
import { IKContext, IKUpload } from "imagekitio-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ProfileIndex = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const reftest = useRef(null);
  const [api, contextHolder] = notification.useNotification();
  const [progress, setProgress] = useState(0);
  const [startUpload, setStartUpload] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [doc, setDoc] = useState("");

  const publicKey = "public_Hqt+AgHm0gjcWTX7lFzrSP0QwhE=";
  const urlEndpoint = "https://ik.imagekit.io/qqrtx9mgqo/";
  // const publicKey = "public_Ma7zOpDkuncNc1ETBTRUSNqSmlE=";
  // const urlEndpoint = "https://ik.imagekit.io/dl5o3nmut/";
  const authenticationEndpoint = `${process.env.REACT_APP_API}/v1/site/auth`;

  const { data: profileData, isLoading: loadingProfile } = useProfileGet();

  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleOpenChangePic = () => {
    setOpen(true);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: useProfilePut,
    onSuccess: (data) => {
      if (data.status === 500) {
        api.error({
          message: data.message,
        });
        return;
      }
      api.info({
        message: data.message,
      });
      if (data.status === 201) {
        setOpen(false);
        queryClient.invalidateQueries("profile");
        // navigate("/login");
      }
    },
    onError: (data) => {
      if (data.status === 500) {
        api.error({
          message: data.message,
        });
        return;
      }
    },
  });

  const onError = (err) => {
    console.log("error: ", err);
    setUploadError(true);
    setStartUpload(false);
    api.error({
      message: "Error",
      description: err.message,
    });
  };

  const onSuccess = (res) => {
    const values = { profile_pic: res.url };
    const data = {
      id: profileData?.profile?.id,
      values,
    };
    api.success({
      message: "Sucesso",
      description: "Arquivo enviado com sucesso.",
    });
    // setDoc(imageUrl);
    mutate(data);
    setStartUpload(false);
  };

  return (
    <div>
      <Flex spacing="4">
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar
            name=""
            src={profileData?.profile?.profile_pic || ""}
            onClick={handleOpenChangePic}
          />
          {/* <Button onClick={handleOpenChangePic}>foto</Button> */}
          <Box>
            <Heading size="sm">{profileData?.profile.name}</Heading>
            <Text>{profileData?.profile.time_contract}</Text>
          </Box>
        </Flex>
        <IconButton variant="ghost" colorScheme="gray" aria-label="See menu" />
      </Flex>

      <Drawer title="" onClose={onClose} open={open} placement="bottom">
        <Avatar
          name=""
          src={profileData?.profile?.profile_pic || ""}
          style={{ "--size": "200px" }}
        />
        <IKContext
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticationEndpoint={authenticationEndpoint}
        >
          <IKUpload
            inputRef={reftest}
            fileName={profileData?.profile?.name}
            useUniqueFileName={true}
            responseFields={["tags"]}
            folder={"/sample-folder/monaco/picture"}
            onError={onError}
            onSuccess={onSuccess}
          />
        </IKContext>
      </Drawer>

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
        <List.Item onClick={() => handleNavigate("documentos")}>
          Documentos
        </List.Item>
      </List>

      <List header="">
        <List.Item onClick={() => handleNavigate("alterar-senha")}>
          Alterar senha
        </List.Item>
      </List>
    </div>
  );
};

export default ProfileIndex;
