import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import {
  getDocuments,
  createDocument,
  updateDocument,
  deleteDocument,
} from "../services/documentService";
import { getDevices } from "../services/deviceService";

const { Option } = Select;

const DocumentManager = () => {
  const [documents, setDocuments] = useState([]);
  const [devices, setDevices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDocument, setEditingDocument] = useState(null);
  const [form] = Form.useForm();

  const fetchDocuments = async () => {
    try {
      const data = await getDocuments();
      setDocuments(data);
    } catch (error) {
      message.error("Failed to fetch documents");
    }
  };

  const fetchDevices = async () => {
    try {
      const data = await getDevices();
      setDevices(data);
    } catch (error) {
      message.error("Failed to fetch devices");
    }
  };

  useEffect(() => {
    fetchDocuments();
    fetchDevices();
  }, []);

  const handleAdd = () => {
    setEditingDocument(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (document) => {
    setEditingDocument(document);
    form.setFieldsValue(document);
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDocument(id);
      message.success("Document deleted successfully");
      fetchDocuments();
    } catch (error) {
      message.error("Failed to delete document");
    }
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingDocument) {
        await updateDocument(editingDocument.id, values);
        message.success("Document updated successfully");
      } else {
        await createDocument(values);
        message.success("Document created successfully");
      }
      setIsModalVisible(false);
      fetchDocuments();
    } catch (error) {
      message.error("Failed to save document");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Document Name",
      dataIndex: "documentName",
      key: "documentName",
    },
    {
      title: "Device",
      dataIndex: "device",
      key: "device",
      render: (device) => device?.deviceName || "N/A",
    },
    {
      title: "File Path",
      dataIndex: "filePath",
      key: "filePath",
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
        Add Document
      </Button>
      <Table dataSource={documents} columns={columns} rowKey="id" />

      <Modal
        title={editingDocument ? "Edit Document" : "Add Document"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="deviceId"
            label="Device"
            rules={[{ required: true, message: "Please select a device!" }]}
          >
            <Select placeholder="Select a device">
              {devices.map((device) => (
                <Option key={device.id} value={device.id}>
                  {device.deviceName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="documentName"
            label="Document Name"
            rules={[
              { required: true, message: "Please input the document name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="filePath"
            label="File Path"
            rules={[{ required: true, message: "Please input the file path!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DocumentManager;
