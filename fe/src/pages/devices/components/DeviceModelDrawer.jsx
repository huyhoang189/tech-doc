import React from "react";
import { Drawer, List, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const DeviceModelDrawer = ({
  open,
  onClose,
  models = [],
  deviceName,
  onDelete,
  onUpload,
}) => (
  <Drawer
    title={`Mô hình 3D - ${deviceName}`}
    open={open}
    onClose={onClose}
    width={500}
  >
    <List
      dataSource={models}
      renderItem={(model) => (
        <List.Item
          actions={[
            <Button danger type="link" onClick={() => onDelete(model.id)}>
              Xóa
            </Button>,
          ]}
        >
          {model.path.split("/").pop()}
        </List.Item>
      )}
    />
    <Upload
      accept=".glb"
      beforeUpload={(file) => {
        onUpload(file);
        return false;
      }}
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />}>Upload mô hình 3D</Button>
    </Upload>
  </Drawer>
);

export default DeviceModelDrawer;
