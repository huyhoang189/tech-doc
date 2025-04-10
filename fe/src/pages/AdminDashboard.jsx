import React from "react";
import { Layout, Menu } from "antd";
import { DesktopOutlined, FileOutlined } from "@ant-design/icons";
import DeviceManager from "../components/DeviceManager";

const { Header, Content } = Layout;

const AdminDashboard = () => {
  const [selectedMenu, setSelectedMenu] = React.useState("devices");

  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529", padding: 5, height: "50px" }}>
        <Menu
          theme="dark"
          mode="horizontal" // Chuyển sang mode ngang
          defaultSelectedKeys={["devices"]}
          onClick={handleMenuClick}
          style={{ lineHeight: "40px" }}
        >
          <Menu.Item key="devices" icon={<DesktopOutlined />}>
            Quản lý Thiết bị
          </Menu.Item>
          <Menu.Item key="documents" icon={<FileOutlined />}>
            Tài liệu kỹ thuật
          </Menu.Item>
          <Menu.Item key="model3d" icon={<FileOutlined />}>
            Mô hình 3D
          </Menu.Item>
        </Menu>
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
  );
};

export default AdminDashboard;
