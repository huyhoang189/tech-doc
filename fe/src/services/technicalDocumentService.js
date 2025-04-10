import api from "./api";

export const createDocument = async (documentData) => {
  const response = await api.post("/api/documents", documentData);
  return response.data;
};

export const deleteDocument = async (id) => {
  await api.delete(`/api/documents/${id}`);
};
