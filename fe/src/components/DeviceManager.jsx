import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Drawer,
  List,
  Flex,
} from "antd";
import {
  getDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../services/deviceService";
import { createModel, deleteModel } from "../services/modelService";
import {
  createDocument,
  deleteDocument,
} from "../services/technicalDocumentService";

const DeviceManager = () => {
  const [devices, setDevices] = useState([]);
  const [isDeviceModalVisible, setIsDeviceModalVisible] = useState(false);
  const [isModelDrawerVisible, setIsModelDrawerVisible] = useState(false);
  const [isDocumentDrawerVisible, setIsDocumentDrawerVisible] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [deviceForm] = Form.useForm();
  const [modelForm] = Form.useForm();
  const [documentForm] = Form.useForm();

  const fetchDevices = async () => {
    try {
      const data = await getDevices();
      setDevices(data);
    } catch (error) {
      message.error("Không thể tải danh sách thiết bị");
    }
  };

  // Hàm làm mới selectedDevice sau khi thêm hoặc xóa
  const refreshSelectedDevice = async (deviceId) => {
    try {
      const updatedDevice = await getDeviceById(deviceId);
      setSelectedDevice(updatedDevice);
    } catch (error) {
      message.error("Không thể làm mới thông tin thiết bị");
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  // Quản lý thiết bị
  const handleAddDevice = () => {
    setSelectedDevice(null);
    deviceForm.resetFields();
    setIsDeviceModalVisible(true);
  };

  const handleEditDevice = (device) => {
    setSelectedDevice(device);
    deviceForm.setFieldsValue({ deviceName: device.deviceName });
    setIsDeviceModalVisible(true);
  };

  const handleDeleteDevice = async (id) => {
    try {
      await deleteDevice(id);
      message.success("Xóa thiết bị thành công");
      fetchDevices();
    } catch (error) {
      message.error("Không thể xóa thiết bị");
    }
  };

  const handleDeviceOk = async () => {
    try {
      const values = await deviceForm.validateFields();
      if (selectedDevice) {
        await updateDevice(selectedDevice.id, values);
        message.success("Cập nhật thiết bị thành công");
      } else {
        await createDevice(values);
        message.success("Thêm thiết bị thành công");
      }
      setIsDeviceModalVisible(false);
      fetchDevices();
    } catch (error) {
      message.error("Không thể lưu thiết bị");
    }
  };

  // Quản lý Mô hình 3D
  const handleOpenModelDrawer = (device) => {
    setSelectedDevice(device);
    setIsModelDrawerVisible(true);
  };

  const handleAddModel = async () => {
    try {
      const values = await modelForm.validateFields();
      const modelData = {
        deviceId: selectedDevice.id,
        path: values.newModelPath,
      };
      await createModel(modelData);
      message.success("Thêm mô hình 3D thành công");
      modelForm.resetFields();
      await refreshSelectedDevice(selectedDevice.id); // Làm mới selectedDevice
      fetchDevices(); // Làm mới bảng chính
    } catch (error) {
      message.error("Không thể thêm mô hình 3D");
    }
  };

  const handleDeleteModel = async (id) => {
    try {
      await deleteModel(id);
      message.success("Xóa mô hình 3D thành công");
      await refreshSelectedDevice(selectedDevice.id); // Làm mới selectedDevice
      fetchDevices(); // Làm mới bảng chính
    } catch (error) {
      message.error("Không thể xóa mô hình 3D");
    }
  };

  // Quản lý Tài liệu kỹ thuật
  const handleOpenDocumentDrawer = (device) => {
    setSelectedDevice(device);
    setIsDocumentDrawerVisible(true);
  };

  const handleAddDocument = async () => {
    try {
      const values = await documentForm.validateFields();
      const documentData = {
        deviceId: selectedDevice.id,
        path: values.newDocumentPath,
      };
      await createDocument(documentData);
      message.success("Thêm tài liệu kỹ thuật thành công");
      documentForm.resetFields();
      await refreshSelectedDevice(selectedDevice.id); // Làm mới selectedDevice
      fetchDevices(); // Làm mới bảng chính
    } catch (error) {
      message.error("Không thể thêm tài liệu kỹ thuật");
    }
  };

  const handleDeleteDocument = async (id) => {
    try {
      await deleteDocument(id);
      message.success("Xóa tài liệu kỹ thuật thành công");
      await refreshSelectedDevice(selectedDevice.id); // Làm mới selectedDevice
      fetchDevices(); // Làm mới bảng chính
    } catch (error) {
      message.error("Không thể xóa tài liệu kỹ thuật");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 50,
    },
    {
      title: "Tên thiết bị",
      dataIndex: "deviceName",
      key: "deviceName",
    },
    {
      title: "Mô hình 3D",
      dataIndex: "models",
      key: "models",
      width: "20%",
      render: (_, record) => {
        return (
          <Flex gap={10} vertical>
            {record?.models?.map((e) => (
              <a href={e?.path} target="_blank" key={e.id}>
                {e?.path}
              </a>
            ))}
          </Flex>
        );
      },
    },
    {
      title: "Tài liệu kỹ thuật",
      dataIndex: "documents",
      key: "documents",
      width: "20%",
      render: (_, record) => {
        return (
          <Flex gap={10} vertical>
            {record?.documents?.map((e) => (
              <a href={e?.path} target="_blank" key={e.id}>
                {e?.path}
              </a>
            ))}
          </Flex>
        );
      },
    },
    {
      title: "Hành động",
      key: "actions",
      align: "center",
      width: "120px",
      render: (_, record) => (
        <Flex vertical gap={10}>
          <Flex gap={10} justify="center" align="center">
            <Button type="primary" onClick={() => handleEditDevice(record)}>
              Sửa
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => handleDeleteDevice(record.id)}
            >
              Xóa
            </Button>
          </Flex>
          <Button
            type="primary"
            onClick={() => handleOpenModelDrawer(record)}
            style={{}}
          >
            Quản lý mô hình 3D
          </Button>

          <Button
            type="primary"
            onClick={() => handleOpenDocumentDrawer(record)}
            style={{}}
          >
            Quản lý tài liệu kỹ thuật
          </Button>
        </Flex>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        onClick={handleAddDevice}
        style={{ marginBottom: 16 }}
      >
        Thêm thiết bị
      </Button>
      <Table dataSource={devices} columns={columns} rowKey="id" bordered />

      {/* Modal để thêm hoặc chỉnh sửa thiết bị */}
      <Modal
        title={selectedDevice ? "Sửa thiết bị" : "Thêm thiết bị"}
        visible={isDeviceModalVisible}
        onOk={handleDeviceOk}
        onCancel={() => setIsDeviceModalVisible(false)}
        okText="Lưu"
        cancelText="Hủy"
      >
        <Form form={deviceForm} layout="vertical">
          <Form.Item
            name="deviceName"
            label="Tên thiết bị"
            rules={[{ required: true, message: "Vui lòng nhập tên thiết bị!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Drawer để quản lý Mô hình 3D */}
      <Drawer
        title={`Quản lý mô hình 3D cho ${selectedDevice?.deviceName}`}
        placement="right"
        onClose={() => setIsModelDrawerVisible(false)}
        visible={isModelDrawerVisible}
        width={400}
      >
        <List
          dataSource={selectedDevice?.models || []}
          renderItem={(model) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  danger
                  onClick={() => handleDeleteModel(model.id)}
                >
                  Xóa
                </Button>,
              ]}
            >
              {model.path}
            </List.Item>
          )}
        />
        <Form form={modelForm} layout="vertical">
          <Form.Item
            name="newModelPath"
            label="Thêm đường dẫn mô hình 3D mới"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đường dẫn mô hình 3D!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" onClick={handleAddModel}>
            Thêm mô hình 3D
          </Button>
        </Form>
      </Drawer>

      {/* Drawer để quản lý Tài liệu kỹ thuật */}
      <Drawer
        title={`Quản lý tài liệu kỹ thuật cho ${selectedDevice?.deviceName}`}
        placement="right"
        onClose={() => setIsDocumentDrawerVisible(false)}
        visible={isDocumentDrawerVisible}
        width={400}
      >
        <List
          dataSource={selectedDevice?.documents || []}
          renderItem={(doc) => (
            <List.Item
              actions={[
                <Button
                  type="link"
                  danger
                  onClick={() => handleDeleteDocument(doc.id)}
                >
                  Xóa
                </Button>,
              ]}
            >
              {doc.path}
            </List.Item>
          )}
        />
        <Form form={documentForm} layout="vertical">
          <Form.Item
            name="newDocumentPath"
            label="Thêm đường dẫn tài liệu kỹ thuật mới"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập đường dẫn tài liệu kỹ thuật!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" onClick={handleAddDocument}>
            Thêm tài liệu kỹ thuật
          </Button>
        </Form>
      </Drawer>
    </div>
  );
};

export default DeviceManager;
