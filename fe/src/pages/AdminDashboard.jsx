import React from "react";
import { Layout, Menu } from "antd";
import { DesktopOutlined, FileOutlined } from "@ant-design/icons";
import DeviceManager from "../components/DeviceManager";
import DocumentManager from "../components/DocumentManager";

const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = React.useState("devices");

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <div
          style={{
            height: 32,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["devices"]}
          onClick={handleMenuClick}
        >
          <Menu.Item key="devices" icon={<DesktopOutlined />}>
            Devices
          </Menu.Item>
          <Menu.Item key="documents" icon={<FileOutlined />}>
            Documents
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <h2 style={{ margin: "0 16px", lineHeight: "64px" }}>
            Admin Dashboard
          </h2>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            background: "#fff",
            minHeight: 280,
          }}
        >
          {selectedMenu === "devices" && <DeviceManager />}
          {selectedMenu === "documents" && <DocumentManager />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
