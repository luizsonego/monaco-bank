import React from "react";
import { TabBar } from "antd-mobile";
import { Layout } from "antd";
import {
  AiFillHome,
  AiOutlineBars,
  AiOutlineAppstore,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { position } from "@chakra-ui/react";
import {
  Route,
  Switch,
  useNavigate,
  useLocation,
  MemoryRouter as Router,
} from "react-router-dom";
import { useRoleGet } from "../../hooks/useUser.query";

const { Footer } = Layout;

const footerStyle = {
  padding: "15px 0",
  flex: 1,
  position: "fixed",
  width: "100%",
  bottom: 0,
};

const FooterComponent = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const { data } = useRoleGet();

  const setRouteActive = (value) => {
    navigate(value);
  };

  const tabs = [
    {
      key: "/",
      title: "",
      icon: <AiFillHome />,
    },
    {
      key: "/investiment",
      title: "",
      icon: <AiOutlineBars />,
      badge: "5",
    },
    data === 99
      ? {
          key: "/admin",
          title: "",
          icon: <AiOutlineAppstore />,
        }
      : null,
    {
      key: "/profile",
      title: "",
      icon: <AiOutlineUser />,
    },
    {
      key: "/login",
      title: "",
      icon: <AiOutlineLogout onClick={() => localStorage.clear()} />,
    },
  ].filter(Boolean);

  return (
    <Footer style={footerStyle}>
      <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
        {tabs.map((item) => (
          <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
        ))}
      </TabBar>
    </Footer>
  );
};

export default FooterComponent;
