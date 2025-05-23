import api from "./api";

export const createModel = async (deviceId, file) => {
  const formData = new FormData();
  formData.append("deviceId", deviceId);
  formData.append("file", file);

  const response = await api.post("/api/models", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteModel = async (id) => {
  await api.delete(`/api/models/${id}`);
};

export const downloadModel = async (id) => {
  const response = await api.get(`/api/models/${id}/download`, {
    responseType: "blob", // Để tải file
  });
  return response.data;
};
