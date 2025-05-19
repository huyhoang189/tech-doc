import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Button, Space, message, Form } from "antd";
import {
  getDevices,
  getDeviceById,
  createDevice,
  updateDevice,
  deleteDevice,
} from "../../services/deviceService";
import { createModel, deleteModel } from "../../services/modelService";
import {
  createDocument,
  deleteDocument,
  downloadDocument,
} from "../../services/technicalDocumentService";
import {
  createVideo,
  deleteVideo,
  downloadVideo,
} from "../../services/videoService";

import DeviceFormModal from "./components/DeviceFormModal";
import DeviceModelDrawer from "./components/DeviceModelDrawer";
import DeviceDocumentDrawer from "./components/DeviceDocumentDrawer";
import DeviceVideoDrawer from "./components/DeviceVideoDrawer";
import DeviceTable from "./components/DeviceTable";
import ModelViewerModal from "./components/ModelViewerModal";
import VideoPlayerModal from "./components/VideoPlayerModal";
import RoleButton from "../../components/RoleButton";

const DevicePage = () => {
  const { systemId } = useParams();
  const navigate = useNavigate();

  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);

  const [isDeviceModalVisible, setIsDeviceModalVisible] = useState(false);
  const [isModelDrawerVisible, setIsModelDrawerVisible] = useState(false);
  const [isDocumentDrawerVisible, setIsDocumentDrawerVisible] = useState(false);
  const [isVideoDrawerVisible, setIsVideoDrawerVisible] = useState(false);

  const [isModelViewerOpen, setIsModelViewerOpen] = useState(false);
  const [currentModelUrl, setCurrentModelUrl] = useState(null);

  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);

  const [deviceForm] = Form.useForm();

  const fetchDevices = async () => {
    try {
      const data = await getDevices(systemId);
      setDevices(data);
    } catch {
      message.error("Không thể tải danh sách thiết bị");
    }
  };

  const refreshSelectedDevice = async (id) => {
    const device = await getDeviceById(id);
    setSelectedDevice(device);
  };

  useEffect(() => {
    fetchDevices();
  }, [systemId]);

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
    await deleteDevice(id);
    message.success("Đã xóa thiết bị");
    fetchDevices();
    setIsModelDrawerVisible(false);
    setIsDocumentDrawerVisible(false);
    setIsVideoDrawerVisible(false);
    setSelectedDevice(null);
  };

  const handleDeviceOk = async () => {
    const values = await deviceForm.validateFields();
    if (selectedDevice) {
      await updateDevice(selectedDevice.id, values);
      message.success("Đã cập nhật thiết bị");
    } else {
      await createDevice({ ...values, systemId: parseInt(systemId) });
      message.success("Đã thêm thiết bị");
    }
    setIsDeviceModalVisible(false);
    fetchDevices();
  };

  const handleAddModel = (file) =>
    createModel(selectedDevice.id, file)
      .then(() => {
        message.success("Đã thêm mô hình 3D");
        refreshSelectedDevice(selectedDevice.id);
        fetchDevices();
      })
      .catch(() => message.error("Không thể thêm mô hình"));

  const handleDeleteModel = (id) =>
    deleteModel(id)
      .then(() => {
        message.success("Đã xóa mô hình");
        refreshSelectedDevice(selectedDevice.id);
        fetchDevices();
      })
      .catch(() => message.error("Không thể xóa mô hình"));

  const handleAddDocument = (file) =>
    createDocument(selectedDevice.id, file)
      .then(() => {
        message.success("Đã thêm tài liệu");
        refreshSelectedDevice(selectedDevice.id);
        fetchDevices();
      })
      .catch(() => message.error("Không thể thêm tài liệu"));

  const handleDeleteDocument = (id) =>
    deleteDocument(id)
      .then(() => {
        message.success("Đã xóa tài liệu");
        refreshSelectedDevice(selectedDevice.id);
        fetchDevices();
      })
      .catch(() => message.error("Không thể xóa tài liệu"));

  const handleDownloadDocument = async (path) => {
    try {
      window.open(`http://localhost:3000${path}`, "_blank");
    } catch {
      message.error("Không thể tải tài liệu");
    }
  };

  const handleAddVideo = (file) =>
    createVideo(selectedDevice.id, file)
      .then(() => {
        message.success("Đã thêm video");
        refreshSelectedDevice(selectedDevice.id);
        fetchDevices();
      })
      .catch(() => message.error("Không thể thêm video"));

  const handleDeleteVideo = (id) =>
    deleteVideo(id)
      .then(() => {
        message.success("Đã xóa video");
        refreshSelectedDevice(selectedDevice.id);
        fetchDevices();
      })
      .catch(() => message.error("Không thể xóa video"));

  const handleDownloadVideo = async (id) => {
    try {
      const blob = await downloadVideo(id);
      const url = window.URL.createObjectURL(new Blob([blob]));
      window.open(url, "_blank");
    } catch {
      message.error("Không thể tải video");
    }
  };

  return (
    <div>
      <Card
        title="Quản lý thiết bị"
        extra={
          <Space>
            <Button onClick={() => navigate("/")}>Quay lại</Button>
            <RoleButton type="create" onClick={handleAddDevice}>
              Thêm thiết bị
            </RoleButton>
          </Space>
        }
      >
        <DeviceTable
          devices={devices}
          onEdit={handleEditDevice}
          onDelete={handleDeleteDevice}
          onManageModel={(d) => {
            setSelectedDevice(d);
            setIsModelDrawerVisible(true);
          }}
          onManageDocument={(d) => {
            setSelectedDevice(d);
            setIsDocumentDrawerVisible(true);
          }}
          onManageVideo={(d) => {
            setSelectedDevice(d);
            setIsVideoDrawerVisible(true);
          }}
          onDownloadDoc={handleDownloadDocument}
          onDownloadVid={handleDownloadVideo}
          onPreviewModel={(url) => {
            setCurrentModelUrl(`http://localhost:3000${url}`);
            setIsModelViewerOpen(true);
          }}
          onPreviewVideo={(url) => {
            setCurrentVideoUrl(`http://localhost:3000${url}`);
            setIsVideoModalOpen(true);
          }}
        />
      </Card>

      <DeviceFormModal
        systemId={systemId}
        open={isDeviceModalVisible}
        onOk={handleDeviceOk}
        onCancel={() => setIsDeviceModalVisible(false)}
        form={deviceForm}
        isEdit={!!selectedDevice}
      />

      <DeviceModelDrawer
        open={isModelDrawerVisible}
        onClose={() => setIsModelDrawerVisible(false)}
        deviceName={selectedDevice?.deviceName}
        models={selectedDevice?.models}
        onDelete={handleDeleteModel}
        onUpload={handleAddModel}
      />

      <DeviceDocumentDrawer
        open={isDocumentDrawerVisible}
        onClose={() => setIsDocumentDrawerVisible(false)}
        deviceName={selectedDevice?.deviceName}
        documents={selectedDevice?.documents}
        onDelete={handleDeleteDocument}
        onDownload={handleDownloadDocument}
        onUpload={handleAddDocument}
      />

      <DeviceVideoDrawer
        open={isVideoDrawerVisible}
        onClose={() => setIsVideoDrawerVisible(false)}
        deviceName={selectedDevice?.deviceName}
        videos={selectedDevice?.videos}
        onDelete={handleDeleteVideo}
        onDownload={handleDownloadVideo}
        onUpload={handleAddVideo}
      />

      <ModelViewerModal
        open={isModelViewerOpen}
        onClose={() => setIsModelViewerOpen(false)}
        modelUrl={currentModelUrl}
      />

      <VideoPlayerModal
        open={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={currentVideoUrl}
      />
    </div>
  );
};

export default DevicePage;
