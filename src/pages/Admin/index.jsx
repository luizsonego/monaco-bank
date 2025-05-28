import { List } from "antd-mobile";
import React from "react";
import { useNavigate } from "react-router-dom";

const AdminIndex = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div>
      <List header="">
        <List.Item onClick={() => handleNavigate("create-user")}>
          Cadastrar Novo Investidor
        </List.Item>
        <List.Item onClick={() => handleNavigate("list-users")}>
          Listar Investidores
        </List.Item>
        <List.Item onClick={() => handleNavigate("list-new-users")}>
          Novos Usuários
        </List.Item>
        <List.Item onClick={() => handleNavigate("list-deleted-users")}>
          Usuarios excluidos
        </List.Item>
        <List.Item onClick={() => handleNavigate("request-movimentation")}>
          Solicitação de extrato
        </List.Item>
        <List.Item onClick={() => handleNavigate("enviar-documento")}>Enviar Documento</List.Item>
      </List>
    </div>
  );
};

export default AdminIndex;
