import { NavBar, Space, Toast } from "antd-mobile";
import React from "react";
import { CloseOutline, MoreOutline, SearchOutline } from "antd-mobile-icons";
import { useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
import logoB from "../../assets/logo_fundo_claro.png";
import logoP from "../../assets/monaco_bank_logo.png";

const right = (
  <div style={{ fontSize: 24 }}>
    <Space style={{ "--gap": "16px" }}>
      <SearchOutline />
      <MoreOutline />
    </Space>
  </div>
);

const Header = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const back = () => navigate(-1);

  return (
    <NavBar
      back={pathname !== "/" ? back : null}
      onBack={() => {
        navigate(-1);
      }}
      style={{
        zIndex: 1,
        paddingTop: 10,
        background: pathname !== "/" ? "#e1e0e5" : "#081331",
      }}
    >
      <img
        src={pathname !== "/" ? logoB : logoP}
        width={80}
        style={{ textAlign: "center", margin: "0px auto" }}
      />
    </NavBar>
  );
};

export default Header;
