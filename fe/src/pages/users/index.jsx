import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  message,
  Card,
  Space,
  Flex,
} from "antd";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";
import RoleButton from "../../components/RoleButton";

const { Option } = Select;

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch {
      message.error("Không thể tải danh sách người dùng");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setSelectedUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    form.setFieldsValue({ ...user, password: "" });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      message.success("Xóa người dùng thành công");
      fetchUsers();
    } catch {
      message.error("Không thể xóa người dùng");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (selectedUser) {
        await updateUser(selectedUser.id, values);
        message.success("Cập nhật người dùng thành công");
      } else {
        await createUser(values);
        message.success("Thêm người dùng thành công");
      }
      setIsModalVisible(false);
      fetchUsers();
    } catch {
      message.error("Không thể lưu người dùng");
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
      title: "Tên đăng nhập",
      dataIndex: "username",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      render: (role) => (role === "ADMIN" ? "Quản trị" : "Người dùng"),
    },
    {
      title: "Hành động",
      key: "actions",
      align: "center",
      width: 100,
      render: (_, record) => (
        <Space>
          <RoleButton type="update" onClick={() => handleEdit(record)}>
            Sửa
          </RoleButton>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa người dùng này?"
            onConfirm={() => handleDelete(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <RoleButton type="delete" danger>
              Xóa
            </RoleButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "#f1f1f1" }}>
      <Card
        title="Quản lý người dùng"
        extra={
          <RoleButton type="create" onClick={handleAdd}>
            Thêm người dùng
          </RoleButton>
        }
        style={{ borderRadius: "8px" }}
      >
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          bordered
        />
      </Card>

      <Modal
        title={selectedUser ? "Sửa người dùng" : "Thêm người dùng"}
        open={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => setIsModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="username"
            label="Tên đăng nhập"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Mật khẩu"
            rules={[
              { required: !selectedUser, message: "Vui lòng nhập mật khẩu" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="role"
            label="Quyền"
            rules={[{ required: true, message: "Vui lòng chọn quyền" }]}
          >
            <Select placeholder="Chọn quyền">
              <Option value="ADMIN">Quản trị</Option>
              <Option value="USER">Người dùng</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserPage;
