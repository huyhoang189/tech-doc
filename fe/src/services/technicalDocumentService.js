import api from "./api";

export const createDocument = async (deviceId, file) => {
  const formData = new FormData();
  formData.append("deviceId", deviceId);
  formData.append("file", file);

  const response = await api.post("/api/documents", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteDocument = async (id) => {
  await api.delete(`/api/documents/${id}`);
};

export const downloadDocument = async (id) => {
  const response = await api.get(`/api/documents/${id}/download`, {
    responseType: "blob", // Để tải file
  });
  return response.data;
};
