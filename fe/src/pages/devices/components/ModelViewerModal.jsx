import React from "react";
import { Modal } from "antd";
import ModelViewer from "../../../components/ModelViewer";

const ModelViewerModal = ({ open, onClose, modelUrl }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Xem mô hình 3D"
      width={800}
      style={{ top: 40 }}
    >
      <ModelViewer modelUrl={modelUrl} />
    </Modal>
  );
};

export default ModelViewerModal;
