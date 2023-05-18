import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import IndexHeader from "./Header";
import { Layout, Menu, theme } from "antd/es";
const { Header, Content, Sider } = Layout;
import services from "../../framework/request";

const menu = [
  {
    key: "/console",
    // icon: React.createElement(icon),
    label: "User",
  },
  {
    key: "/console/book",
    // icon: React.createElement(icon),
    label: "Book",
  },
  {
    key: "/console/Course",
    // icon: React.createElement(icon),
    label: "Course",
  },
  {
    key: "logout",
    // icon: React.createElement(icon),
    label: "Logout",
  },
];

const Index = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();
  const handleClick = (item) => {
    if (item.key === "logout") {
      navigate("/login");
    } else {
      navigate(item.key);
    }
  };
  return (
    <Layout className="min-h-[100vh]">
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <IndexHeader />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={location.pathname}
            style={{
              height: "100%",
              borderRight: 0,
            }}
            onClick={handleClick}
            items={menu}
          />
        </Sider>
        <Layout className="p-10">
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default Index;
