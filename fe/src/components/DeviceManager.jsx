import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import {
  getDevices,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../services/deviceService";

const DeviceManager = () => {
  const [devices, setDevices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [form] = Form.useForm();

  const fetchDevices = async () => {
    try {
      const data = await getDevices();
      setDevices(data);
    } catch (error) {
      message.error("Failed to fetch devices");
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleAdd = () => {
    setEditingDevice(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (device) => {
    setEditingDevice(device);
    form.setFieldsValue(device);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDevice(id);
      message.success("Device deleted successfully");
      fetchDevices();
    } catch (error) {
      message.error("Failed to delete device");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingDevice) {
        await updateDevice(editingDevice.id, values);
        message.success("Device updated successfully");
      } else {
        await createDevice(values);
        message.success("Device created successfully");
      }
      setIsModalVisible(false);
      fetchDevices();
    } catch (error) {
      message.error("Failed to save device");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Device Name",
      dataIndex: "deviceName",
      key: "deviceName",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Device
      </Button>
      <Table dataSource={devices} columns={columns} rowKey="id" />

      <Modal
        title={editingDevice ? "Edit Device" : "Add Device"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="deviceName"
            label="Device Name"
            rules={[
              { required: true, message: "Please input the device name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DeviceManager;
