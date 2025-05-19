import React from "react";
import { Drawer, List, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const DeviceVideoDrawer = ({
  open,
  onClose,
  videos = [],
  deviceName,
  onDelete,
  onDownload,
  onUpload,
}) => (
  <Drawer
    title={`Video - ${deviceName}`}
    open={open}
    onClose={onClose}
    width={500}
  >
    <List
      dataSource={videos}
      renderItem={(video) => (
        <List.Item
          actions={[
            <Button type="link" onClick={() => onDownload(video.id)}>
              Tải về
            </Button>,
            <Button danger type="link" onClick={() => onDelete(video.id)}>
              Xóa
            </Button>,
          ]}
        >
          {video.path.split("/").pop()}
        </List.Item>
      )}
    />
    <Upload
      accept="video/*"
      beforeUpload={(file) => {
        onUpload(file);
        return false;
      }}
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />}>Upload video</Button>
    </Upload>
  </Drawer>
);

export default DeviceVideoDrawer;
