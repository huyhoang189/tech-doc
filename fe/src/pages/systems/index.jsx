import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Popconfirm,
  Card,
  Space,
} from "antd";
import {
  getSystems,
  createSystem,
  updateSystem,
  deleteSystem,
} from "../../services/systemService";
import RoleButton from "../../components/RoleButton";

const SystemPage = () => {
  const [systems, setSystems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchSystems = async () => {
    try {
      const data = await getSystems();
      setSystems(data);
    } catch (error) {
      message.error("Không thể tải danh sách hệ thống");
    }
  };

  useEffect(() => {
    fetchSystems();
  }, []);

  const handleAddSystem = () => {
    setSelectedSystem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditSystem = (system) => {
    setSelectedSystem(system);
    form.setFieldsValue({ description: system.description, unit: system.unit });
    setIsModalVisible(true);
  };

  const handleDeleteSystem = async (id) => {
    try {
      await deleteSystem(id);
      message.success("Xóa hệ thống thành công");
      fetchSystems();
    } catch (error) {
      message.error("Không thể xóa hệ thống");
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (selectedSystem) {
        await updateSystem(selectedSystem.id, values);
        message.success("Cập nhật hệ thống thành công");
      } else {
        await createSystem(values);
        message.success("Thêm hệ thống thành công");
      }
      setIsModalVisible(false);
      fetchSystems();
    } catch (error) {
      message.error("Không thể lưu hệ thống");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: 50,
      align: "center",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Số lượng thiết bị",
      key: "deviceCount",
      align: "center",
      render: (_, record) => record.devices?.length || 0,
    },
    {
      title: "Hành động",
      key: "actions",
      align: "center",
      width: 100,
      render: (_, record) => (
        <Space>
          <RoleButton type="update" onClick={() => handleEditSystem(record)}>
            Sửa
          </RoleButton>

          <Popconfirm
            title="Bạn có chắc chắn muốn xóa hệ thống này? Tất cả thiết bị liên quan cũng sẽ bị xóa."
            onConfirm={() => handleDeleteSystem(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <RoleButton type="delete">Xóa</RoleButton>
          </Popconfirm>

          <RoleButton
            type="detail"
            onClick={() => navigate(`/systems/${record.id}`)}
          >
            Chi tiết
          </RoleButton>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f1f1f1",
      }}
    >
      <Card
        title="Danh sách hệ thống"
        extra={
          <RoleButton type="create" onClick={handleAddSystem}>
            Thêm hệ thống
          </RoleButton>
        }
        style={{
          borderRadius: "8px",
        }}
      >
        <Table
          dataSource={systems}
          columns={columns}
          rowKey="id"
          bordered
          pagination={{ pageSize: 10 }}
          style={{ backgroundColor: "#fff", borderRadius: "8px" }}
        />
      </Card>

      <Modal
        title={selectedSystem ? "Sửa hệ thống" : "Thêm hệ thống"}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="unit"
            label="Đơn vị"
            rules={[{ required: true, message: "Vui lòng nhập đơn vị!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SystemPage;
