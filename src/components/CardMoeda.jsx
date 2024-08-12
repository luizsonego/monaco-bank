import { Modal } from "antd";
import React from "react";

const CardMoeda = ({ moeda, simb, flag }) => {
  return (
    <div
      style={{
        width: 200,
        background: "#fff",
        minHeight: 120,
        padding: 10,
        borderRadius: 10,
        margin: "15px 5px",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              width: 25,
              height: 25,
              background: "#999",
              marginRight: 10,
              borderRadius: "50%",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={flag} style={{ height: 40 }} />
          </div>
          <span style={{ color: "#0a164a", fontSize: 18, fontWeight: 600 }}>
            {moeda}
          </span>
        </div>
        <div
          style={{
            color: "#0a164a",
            fontSize: 18,
            fontWeight: 500,
            marginTop: 10,
          }}
        >
          {simb} .....
        </div>
      </div>
      <div
        style={{
          background: "#0a164a",
          width: "100%",
          height: 35,
          position: "absolute",
          left: 0,
          bottom: 0,
          color: "#bb9f73",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          fontSize: 16,
          borderRadius: "0 0 10px 10px",
        }}
        onClick={() => {
          Modal.info({
            content: "Função indisponível",
            centered: true,
            footer: null,
            closable: true,
          });
        }}
      >
        <span>Abrir conta</span>
        <span> {">"} </span>
      </div>
    </div>
  );
};

export default CardMoeda;
