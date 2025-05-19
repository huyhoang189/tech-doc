import React from "react";
import { Table, Button, Flex, Popconfirm } from "antd";
import RoleButton from "../../../components/RoleButton";

const DeviceTable = ({
  devices,
  onEdit,
  onDelete,
  onManageModel,
  onManageDocument,
  onManageVideo,
  onDownloadDoc,
  onDownloadVid,
  onPreviewModel,
  onPreviewVideo,
  onPreviewWebModel,
}) => {
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
    },
    {
      title: "Mô hình 3D",
      dataIndex: "models",
      render: (_, record) => (
        <Flex gap={10} vertical>
          {(record.models || []).map((m) => (
            <a
              key={m.id}
              onClick={() => onPreviewModel?.(m.path)}
              style={{ cursor: "pointer" }}
            >
              {m.path.split("/").pop()}
            </a>
          ))}

          <Button style={{ maxWidth: 150 }} onClick={() => onPreviewWebModel()}>
            Xem tất cả
          </Button>
        </Flex>
      ),
    },
    {
      title: "Tài liệu",
      dataIndex: "documents",
      render: (_, record) => (
        <Flex gap={10} vertical>
          {(record.documents || []).map((d) => (
            <a
              key={d.id}
              onClick={() => onDownloadDoc(d.path)}
              style={{ cursor: "pointer" }}
            >
              {d.path.split("/").pop()}
            </a>
          ))}
        </Flex>
      ),
    },
    {
      title: "Video",
      dataIndex: "videos",
      render: (_, record) => (
        <Flex gap={10} vertical>
          {(record.videos || []).map((v) => (
            <a key={v.id} onClick={() => onPreviewVideo(v.path)}>
              {v.path.split("/").pop()}
            </a>
          ))}
        </Flex>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      align: "center",
      width: "200px",
      render: (_, record) => (
        <Flex vertical gap={10}>
          <Flex gap={10} justify="center">
            <RoleButton type="update" onClick={() => onEdit(record)}>
              Sửa
            </RoleButton>
            <Popconfirm
              title="Xóa thiết bị sẽ xóa toàn bộ dữ liệu liên quan. Xác nhận?"
              onConfirm={() => onDelete(record.id)}
            >
              <RoleButton type="delete">Xóa</RoleButton>
            </Popconfirm>
          </Flex>
          <RoleButton type="create" onClick={() => onManageDocument(record)}>
            Quản lý tài liệu
          </RoleButton>
          <RoleButton type="create" onClick={() => onManageModel(record)}>
            Quản lý mô hình 3D
          </RoleButton>
          <RoleButton type="create" onClick={() => onManageVideo(record)}>
            Quản lý video
          </RoleButton>
        </Flex>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={devices}
      rowKey="id"
      bordered
      pagination={{ pageSize: 10 }}
    />
  );
};

export default DeviceTable;
