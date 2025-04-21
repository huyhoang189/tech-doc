import React from "react";
import { Modal } from "antd";

const VideoPlayerModal = ({ open, onClose, videoUrl }) => {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      title="Xem video"
      width={800}
      style={{ top: 40 }}
    >
      {videoUrl ? (
        <video width="100%" height="450" controls autoPlay>
          <source src={videoUrl} type="video/mp4" />
          Trình duyệt không hỗ trợ phát video HTML5.
        </video>
      ) : (
        <p>Không có video để hiển thị</p>
      )}
    </Modal>
  );
};

export default VideoPlayerModal;
