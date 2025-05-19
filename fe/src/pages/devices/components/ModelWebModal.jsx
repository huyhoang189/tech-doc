import React from "react";
import { Modal } from "antd";

const ModelWebModal = ({ open, onClose, modelUrl }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Xem tất cả mô hình 3D"
      width={800}
      style={{ top: 40 }}
    ></Modal>
  );
};

export default ModelWebModal;
