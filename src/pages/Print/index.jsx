import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IKImage, IKContext, IKUpload } from "imagekitio-react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  Text,
  useToast,
  Container,
  Heading,
  Image,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
} from "@chakra-ui/react";
import { Form } from "antd";
import { useMutation } from "@tanstack/react-query";
import { usePrintPost } from "../../hooks/useWallet.query";
import DefaultUpload from "../../components/DefaultUpload";
import generateUuid from "../../Helpers/generateUuid";

function Print() {
    const [form] = Form.useForm();
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: "",
    passport: "",
    accountNumber: "",
    password: "",
  });
  const [selfieUrl, setSelfieUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [activeTab, setActiveTab] = useState(0);
  const [callbackResponse, setCallbackResponse] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSuccess = (res) => {
    setSelfieUrl(res.url);
    toast({
      title: "Selfie enviada com sucesso!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const onError = (err) => {
    console.error("Error uploading selfie:", err);
    toast({
      title: "Erro ao fazer upload da selfie",
      description: "Por favor, tente novamente.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

    const { mutate } = useMutation({
    mutationFn: usePrintPost,
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
              // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            navigate("/");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
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


  const handleSubmit = async (e) => {
    const data = {
      ...formData,
      selfie: callbackResponse.imageUrl,
    }
    setIsSubmitting(true);
    try {
      mutate(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = () => {
    return (
      formData.name &&
      formData.passport &&
      formData.accountNumber &&
      formData.password &&
      selfieUrl
    );
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

    const handleUploadComplete = (data) => {
    setCallbackResponse(data);
  };

  return (
    <Box
      minH="100vh"
      bg="gray.50"
      py={8}
    >
      <Container maxW="container.sm">
        <Box
          bg="white"
          p={8}
          borderRadius="lg"
          boxShadow="lg"
        >
          <Heading as="h1" size="xl" textAlign="center" mb={8}>
            Solicitar Extrato
          </Heading>

          <Form onFinish={handleSubmit} form={form}>
            <Tabs 
              variant="soft-rounded" 
              colorScheme="blue"
              onChange={handleTabChange}
              index={activeTab}
              mb={6}
            >
              <TabList 
                display="flex" 
                justifyContent="center" 
                gap={4}
                borderColor="gray.200"
              >
                <Tab 
                  _selected={{ 
                    color: 'white', 
                    bg: 'blue.500',
                    boxShadow: 'md'
                  }}
                  borderRadius="lg"
                  px={6}
                >
                  Dados Pessoais
                </Tab>
                <Tab 
                  _selected={{ 
                    color: 'white', 
                    bg: 'blue.500',
                    boxShadow: 'md'
                  }}
                  borderRadius="lg"
                  px={6}
                >
                  Selfie
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={0}>
                  <VStack >
                    <Form.Item name="name" label="Nome">
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </Form.Item>

                    <Form.Item name="passport" label="Passaporte">
                      <Input
                        name="passport"
                        value={formData.passport}
                        onChange={handleInputChange}
                      />
                    </Form.Item>

                    <Form.Item name="account_number" label="Número da Conta">
                      <Input
                        name="account_number"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                      />
                    </Form.Item>

                    <Form.Item name="password" label="Senha">
                      <Input
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </Form.Item>

                    <Button
                      type="button"
                      colorScheme="blue"
                      size="lg"
                      width="full"
                      onClick={() => setActiveTab(1)}
                      mt={4}
                    >
                      Próximo
                    </Button>
                  </VStack>
                </TabPanel>

                <TabPanel px={0}>
                  <VStack spacing={4}>
                    <IKContext
                        publicKey={process.env.REACT_APP_PUBLIC_KEY}
                        urlEndpoint={process.env.REACT_APP_URL_ENDPOINT}
                        authenticationEndpoint={`${process.env.REACT_APP_API}/${process.env.REACT_APP_AUTH_ENDPOINT}`}
                      >
                        <IKUpload
                          fileName={`${formData.name}-${generateUuid()}.jpg`}
                          useUniqueFileName={true}
                          tags={["selfie"]}
                          responseFields={["tags"]}
                          folder="monaco/selfie"
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
                      {/* <DefaultUpload
                        title={`${formData.name}-${generateUuid()}`}
                        id="selfie"
                        label="Enviar Selfie"
                        folder="texte/selfie"
                        controller="selfie"
                        action="selfie"
                        callback={handleUploadComplete}
                      /> */}

                    <Button
                      type="button"
                      colorScheme="gray"
                      size="lg"
                      width="full"
                      onClick={() => setActiveTab(0)}
                      mt={4}
                    >
                      Voltar
                    </Button>

                    <Form.Item>
                      <Button
                        type="submit"
                        colorScheme="blue"
                        size="lg"
                        width="full"
                        isLoading={isSubmitting}
                        mt={4}
                      >
                        Solicitar Transações
                      </Button>
                    </Form.Item>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Form>

          {countdown > 0 && countdown < 5 && (
            <Text textAlign="center" mt={4} color="gray.600">
              Redirecionando em {countdown} segundos...
            </Text>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default Print;
