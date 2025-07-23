import { Box, Heading, Text } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Flex, Form, Input, notification } from "antd";
import { Button, Card } from "antd-mobile";
import React from "react";
import { useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input";
import { useTransferPost } from "../../hooks/useProfile.query";

const UserTransfer = () => {
  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  // const {} = useTransferGet()

  const { mutate, isLoading, isPending } = useMutation({
    mutationFn: useTransferPost,
    onSuccess: ({ data, status }) => {
      api.success({
        message: data.message,
      });
      let encode = btoa([
        data.id,
        data.account_number,
        data.name,
        data.email,
        data.amount,
        data.user,
      ]);
      if (status === 200) {
        navigate(`confirm-transfer/${encode}`);
      }
    },
  });

  const onFinish = (values) => {
    mutate(values);
  };
  
  return (
    <div style={{
      marginTop: 25,
      background: 'linear-gradient(90deg,rgba(240, 240, 240, 1) 0%, rgba(204, 204, 204, 1) 100%)',
      minHeight: '100vh',
      borderRadius: '25px 25px 0 0',
      paddingTop: 30,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 40,
    }}>
      {contextHolder}
      
      {/* Header Section */}
      <Flex 
        spacing="4" 
        style={{ 
          marginBottom: 20,
          background: 'rgba(255, 255, 255, 0.9)',
          borderRadius: 15,
          padding: 20,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Box>
            <Heading 
              size="lg" 
              style={{ 
                color: '#081331', 
                margin: 0,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                fontWeight: 700,
                fontSize: '28px'
              }}
            >
              Transferência Bancária
            </Heading>
            <Text 
              style={{ 
                color: 'rgba(8, 19, 49, 0.8)', 
                marginTop: 8,
                fontSize: '16px',
                fontWeight: 400
              }}
            >
              Realize transferências de forma segura e instantânea
            </Text>
          </Box>
        </Flex>
      </Flex>

      {/* Form Card */}
      <Card 
        bordered={false} 
        style={{ 
          background: 'rgba(255, 255, 255, 0.5)',
          borderRadius: 20,
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '30px 25px'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <Text 
            style={{ 
              fontSize: '24px', 
              fontWeight: 600, 
              color: '#2d3748',
              margin: 0
            }}
          >
            Nova Transferência
          </Text>
          <Text 
            style={{ 
              fontSize: '14px', 
              color: '#718096', 
              marginTop: 8
            }}
          >
            Preencha os dados para realizar a transferência
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          name="create-user"
          onFinish={onFinish}
          style={{ marginTop: 20 }}
        >
          <Form.Item 
            name="account_number" 
            label={
              <span style={{ 
                fontSize: '16px', 
                fontWeight: 500, 
                color: '#2d3748',
                marginBottom: 8
              }}>
                Número da Conta
              </span>
            }
            style={{ marginBottom: 25 }}
          >
            <Input 
              size="large"
              placeholder="Digite o número da conta"
              style={{
                borderRadius: 12,
                border: '2px solid #e2e8f0',
                padding: '12px 16px',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                background: '#f7fafc'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.background = '#ffffff';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.background = '#f7fafc';
                e.target.style.boxShadow = 'none';
              }}
            />
          </Form.Item>

          <Form.Item 
            name="amount" 
            label={
              <span style={{ 
                fontSize: '16px', 
                fontWeight: 500, 
                color: '#2d3748',
                marginBottom: 8
              }}>
                Valor da Transferência
              </span>
            }
            style={{ marginBottom: 35 }}
          >
            <CurrencyInput
              prefix="R$ "
              placeholder="0,00"
              style={{
                borderRadius: 12,
                border: '2px solid #e2e8f0',
                padding: '12px 16px',
                fontSize: '18px',
                fontWeight: 500,
                transition: 'all 0.3s ease',
                background: '#f7fafc',
                width: '100%',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea';
                e.target.style.background = '#ffffff';
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.background = '#f7fafc';
                e.target.style.boxShadow = 'none';
              }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button
              loading={!!isLoading || !!isPending}
              style={{ 
                width: "100%", 
                height: '50px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                transition: 'all 0.3s ease'
              }}
              type="submit"
              color="primary"
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
              }}
            >
              {isLoading || isPending ? 'Processando...' : '🚀 Enviar Transferência'}
            </Button>
          </Form.Item>
        </Form>

        {/* Security Notice */}
        <div style={{ 
          marginTop: 25, 
          padding: 15, 
          background: 'rgba(102, 126, 234, 0.1)', 
          borderRadius: 10,
          border: '1px solid rgba(102, 126, 234, 0.2)'
        }}>
          <Text style={{ 
            fontSize: '12px', 
            color: '#667eea', 
            textAlign: 'center',
            margin: 0,
            fontWeight: 500
          }}>
            🔒 Sua transferência será processada com segurança
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default UserTransfer;
