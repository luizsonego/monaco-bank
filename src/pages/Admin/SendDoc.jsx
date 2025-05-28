import {  Form, Image, Select } from 'antd';
import React, { useState } from 'react'
import { useProfilesGet } from '../../hooks/useProfile.query';
import { IKContext, IKUpload } from 'imagekitio-react';
import { Box, useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useCreateSendDoc } from '../../hooks/useWallet.query';
import generateUuid from '../../Helpers/generateUuid';
import { Button } from 'antd-mobile';

function SendDoc() {
  const [form] = Form.useForm();
  const [selfieUrl, setSelfieUrl] = useState("");
  const toast = useToast();

  const { data: listUsers, isLoading: loadingUser } = useProfilesGet();

    const onSuccess = (res) => {
    setSelfieUrl(res.url);
    toast({
      title: "Documento enviado com sucesso!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const onError = (err) => {
    console.error("Error uploading document:", err);
    toast({
      title: "Erro ao fazer upload do documento",
      description: "Por favor, tente novamente.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const { mutate } = useMutation({
    mutationFn: useCreateSendDoc,
    onSuccess: (data) => {
      if (data.status !== 200) {
        toast({
          title: "Erro!",
          description: "Ocorreu um erro ao enviar a solicitação.",
          status: "error",
          duration: 5000,
        });
      } else {
        toast({
          title: "Sucesso!",
          description: "Solicitação enviada com sucesso!",
          status: "success",
          duration: 5000,
      });
      }
    },
    onError: (error) => {
      toast({
        title: "Erro!",
        description: "Ocorreu um erro ao enviar a solicitação.",
        status: "error",
        duration: 5000,
      });
    },
  });

  const onFinish = (values) => {
    const data = {
      user_id: values.user_id,
      doc_path: selfieUrl,
    };

    mutate(data);
  };

  const authenticator = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/v1/site/auth`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>Enviar Documento</h1>
      
      <Form
          form={form}
          layout="vertical"
          name="create-user"
          onFinish={onFinish}
      >
        <Form.Item name="user_id" label="Usuário">
            <Select
              options={listUsers?.map((user) => ({
                value: user.id,
                label: `${user?.name} - ${user?.account_number}`,
              }))}
            />
        </Form.Item>
        
        <IKContext
          publicKey={process.env.REACT_APP_PUBLIC_KEY}
          urlEndpoint={process.env.REACT_APP_URL_ENDPOINT}
          authenticator={authenticator}
        >
          <IKUpload
            fileName={`documento-${generateUuid()}.jpg`}
            useUniqueFileName={true}
            tags={["selfie"]}
            responseFields={["tags"]}
            folder="monaco/documentos"
            onSuccess={onSuccess}
            onError={onError}
          />
          {selfieUrl && (
            <Box mt={4}>
              <Image
                src={selfieUrl}
                alt="Selfie preview"
                maxH="200px"
                mx="auto"
                borderRadius="md"
              />
            </Box>
          )}
        </IKContext>

        <Form.Item>
          <Button
            // loading={!!isPending}
            style={{ width: "100%", marginRight: 0, backgroundColor: "#000", color: "#fff", marginTop: 10 }}
            type="submit"
          >
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default SendDoc
