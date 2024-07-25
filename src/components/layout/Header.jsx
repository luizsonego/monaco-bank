import { NavBar, Space, Toast } from "antd-mobile";
import React from "react";
import { CloseOutline, MoreOutline, SearchOutline } from "antd-mobile-icons";
import { useLocation, useNavigate } from "react-router-dom";

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
      style={{ zIndex: 1 }}
    ></NavBar>
  );
};

export default Header;
