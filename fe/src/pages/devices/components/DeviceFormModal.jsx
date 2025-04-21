import React from "react";
import { Modal, Form, Input } from "antd";

const DeviceFormModal = ({ open, onOk, onCancel, form, isEdit }) => (
  <Modal
    open={open}
    onOk={onOk}
    onCancel={onCancel}
    title={isEdit ? "Sửa thiết bị" : "Thêm thiết bị"}
    okText="Lưu"
    cancelText="Hủy"
  >
    <Form form={form} layout="vertical">
      <Form.Item
        name="deviceName"
        label="Tên thiết bị"
        rules={[{ required: true, message: "Vui lòng nhập tên thiết bị" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  </Modal>
);

export default DeviceFormModal;
