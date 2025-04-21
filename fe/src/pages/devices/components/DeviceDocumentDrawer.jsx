import React from "react";
import { Drawer, List, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const DeviceDocumentDrawer = ({
  open,
  onClose,
  documents = [],
  deviceName,
  onDelete,
  onDownload,
  onUpload,
}) => (
  <Drawer
    title={`Tài liệu kỹ thuật - ${deviceName}`}
    open={open}
    onClose={onClose}
  >
    <List
      dataSource={documents}
      renderItem={(doc) => (
        <List.Item
          actions={[
            <Button type="link" onClick={() => onDownload(doc.id)}>
              Tải về
            </Button>,
            <Button danger type="link" onClick={() => onDelete(doc.id)}>
              Xóa
            </Button>,
          ]}
        >
          {doc.path.split("/").pop()}
        </List.Item>
      )}
    />
    <Upload
      accept="application/pdf"
      beforeUpload={(file) => {
        onUpload(file);
        return false;
      }}
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />}>Upload PDF</Button>
    </Upload>
  </Drawer>
);

export default DeviceDocumentDrawer;
