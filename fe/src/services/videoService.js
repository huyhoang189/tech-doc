import api from "./api";

export const createVideo = async (deviceId, file) => {
  const formData = new FormData();
  formData.append("deviceId", deviceId);
  formData.append("file", file);

  const response = await api.post("/api/videos", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteVideo = async (id) => {
  await api.delete(`/api/videos/${id}`);
};

export const downloadVideo = async (id) => {
  const response = await api.get(`/api/videos/${id}/download`, {
    responseType: "blob", // Để tải file
  });
  return response.data;
};
