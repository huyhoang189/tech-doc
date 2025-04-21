import React from "react";
import { Layout, Menu, Avatar, Dropdown, Typography, Flex } from "antd";
import {
  DashboardOutlined,
  TeamOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { isLoggedIn, getUsername, logout, getRole } from "../utils/auth";
import { useEffect } from "react";

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adminMenuItems = [
    { key: "systems", icon: <DashboardOutlined />, label: "Dashboard" },
    { key: "users", icon: <TeamOutlined />, label: "Users" },
  ];

  const userMenuItems = [
    { key: "systems", icon: <DashboardOutlined />, label: "Dashboard" },
  ];

  const routeMap = {
    systems: "/systems",
    users: "/users",
  };

  const handleMenuClick = ({ key }) => {
    const path = routeMap[key];
    if (path) navigate(path);
  };

  const getSelectedKey = () => {
    const match = Object.entries(routeMap).find(([key, path]) =>
      location.pathname.startsWith(path)
    );
    return match ? match[0] : "systems";
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const userMenu = (
    <Menu>
      <Menu.Item icon={<UserOutlined />}>Thông tin</Menu.Item>
      <Menu.Item icon={<LogoutOutlined />} onClick={handleLogout}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={240} style={{ background: "#1e1e2d" }}>
        <div
          style={{
            color: "#fff",
            fontSize: "20px",
            padding: "20px",
            fontWeight: "bold",
            textAlign: "center",
            borderBottom: "1px solid #333",
          }}
        >
          Dashboard
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={getRole() === "ADMIN" ? adminMenuItems : userMenuItems}
          onClick={handleMenuClick}
          style={{ backgroundColor: "#1e1e2d" }}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#f1f1f1",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "0 24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.20)",
          }}
        >
          <Dropdown overlay={userMenu}>
            <Flex align="center" gap={10}>
              <Avatar
                style={{ backgroundColor: "#1890ff", cursor: "pointer" }}
                icon={<UserOutlined />}
              />
              <Typography.Title level={5} style={{ padding: 0, margin: 0 }}>
                {getUsername() || "Non-information"}
              </Typography.Title>
            </Flex>
          </Dropdown>
        </Header>

        <Content
          style={{
            margin: "0px 0px",
            padding: 24,
            background: "#f0f2f5",
            borderRadius: 8,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
