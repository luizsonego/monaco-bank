import { Flex, notification, Progress, Row } from "antd";
import { Button } from "antd-mobile";
import { IKContext, IKUpload } from "imagekitio-react";
import { useRef, useState } from "react";

const DefaultUpload = ({
  title,
  id,
  label,
  folder,
  controller,
  action,
  callback,
  ...props
}) => {
  const reftest = useRef(null);
  const [api, contextHolder] = notification.useNotification();
  const [progress, setProgress] = useState(0);
  const [startUpload, setStartUpload] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const publicKey = process.env.REACT_APP_PUBLIC_KEY;
  const urlEndpoint = process.env.REACT_APP_URL_ENDPOINT;
  const authenticationEndpoint = `${process.env.REACT_APP_API}/${process.env.REACT_AUTH_ENDPOINT}`;

  const handleClick = () => {
    if (reftest.current) {
      reftest.current.click();
    }
  };

  const onError = (err) => {
    console.log("error: ", err);
    setUploadError(true);
    setStartUpload(false);
    api.error({
      message: "Error",
      description: err.message
    });
  };

  const onSuccess = (res) => {
    const imageUrl = res.url;
    const dataDocument = {
      imageUrl,
      id,
      controller,
      action,
      imagekitData: res,
      ...props
    };
    callback(dataDocument);
    api.success({
      message: "Sucesso",
      description: "Arquivo enviado com sucesso."
    });
    setStartUpload(false);
    setIsOk(true);
  };

  const onUploadStart = (evt) => {
    console.log("evt", evt);
    setStartUpload(true);
  };

  const onUploadProgress = (event) => {
    const percent = Math.floor((event.loaded / event.total) * 100);
    setProgress(percent);
    setUploadError(false);
    setUploadSuccess(false);
    if (percent === 100) {
      setProgress(0);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsOk(true);
      // Notify parent component about file selection without uploading
      callback({
        file,
        id,
        controller,
        action,
        ...props
      });
    }
  };

  return <Row>
      {contextHolder}{" "}
      <div>
      <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          style={{ display: "none" }}
          ref={reftest}
        />
        <Flex justifyContent="center" alignItems="center">
          <Button
            type="primary"
            size="large"
            loading={startUpload && !uploadSuccess}
            onClick={handleClick}
          >
            {label} {isOk && "[ARQUIVO SELECIONADO]"}
          </Button>
          {uploadSuccess && "sucesso"}
          {uploadError && "error"}
          {progress > 0 ? (
            <>
              <Progress
                style={{ marginTop: "20px" }}
                type="linear"
                percent={progress}
                size={20}
              />
            </>
          ) : (
            <></>
          )}
          {uploadSuccess && (
            <h1>Sucesso</h1>
          )}
          {uploadError && (
            <h1>Error</h1>
          )}
        </Flex>
      </div>
    </Row>
};

export default DefaultUpload;
