import { Form, Input, notification } from "antd";
import { Button } from "antd-mobile";
import React, { useRef, useState } from "react";
import { IKImage, IKVideo, IKContext, IKUpload } from "imagekitio-react";
import { useCreateUserPost } from "../../hooks/useUser.query";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Complete = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const reftest = useRef(null);
  const [api, contextHolder] = notification.useNotification();
  const [progress, setProgress] = useState(0);
  const [startUpload, setStartUpload] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [fields, setFields] = useState("");
  const [doc, setDoc] = useState("");
  const [enabeSendButton, setEnableSendButton] = useState(false);

  const publicKey = "public_Hqt+AgHm0gjcWTX7lFzrSP0QwhE=";
  const urlEndpoint = "https://ik.imagekit.io/qqrtx9mgqo/";
  // const publicKey = "public_Ma7zOpDkuncNc1ETBTRUSNqSmlE=";
  // const urlEndpoint = "https://ik.imagekit.io/dl5o3nmut/";
  const authenticationEndpoint = `${process.env.REACT_APP_API}/v1/site/auth`;

  const { mutate, isPending } = useMutation({
    mutationFn: useCreateUserPost,
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
        navigate("/login");
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
    const imageUrl = res.url;
    api.success({
      message: "Sucesso",
      description: "Arquivo enviado com sucesso.",
    });
    setDoc(imageUrl);
    setEnableSendButton(true);
    setStartUpload(false);
  };

  const onFinish = (value) => {
    const data = {
      selfie: doc,
      ...value,
    };
    mutate(data);
  };
  return (
    <div
      style={{
        background: "#081331",
        width: "100%",
        height: "100vh",
        margin: "0 auto",
      }}
    >
      {contextHolder}{" "}
      <div
        style={{
          maxWidth: 600,
          padding: "100px 25px",
          margin: "0 auto",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="create-user"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label={<span style={{ color: "#fff" }}>Nome</span>}
            onBlur={(e) => {
              setFields(e.target.value);
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#fff" }}>Username</span>}
            name="username"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="apelido"
            label={<span style={{ color: "#fff" }}>Apelido</span>}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label={<span style={{ color: "#fff" }}>Email</span>}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label={<span style={{ color: "#fff" }}>Senha</span>}
          >
            <Input />
          </Form.Item>

          <Form.Item label={<span style={{ color: "#fff" }}>Selfie</span>}>
            <IKContext
              publicKey={publicKey}
              urlEndpoint={urlEndpoint}
              authenticationEndpoint={authenticationEndpoint}
            >
              <IKUpload
                inputRef={reftest}
                fileName={fields}
                useUniqueFileName={true}
                responseFields={["tags"]}
                folder={"/sample-folder/monaco/cadastro"}
                onError={onError}
                onSuccess={onSuccess}
              />
            </IKContext>
          </Form.Item>

          <Form.Item>
            <Button
              disabled={!enabeSendButton}
              loading={!!isPending}
              style={{ width: "100%", marginRight: 0 }}
              type="submit"
              color="primary"
            >
              Criar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Complete;
