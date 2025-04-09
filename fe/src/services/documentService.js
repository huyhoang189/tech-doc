import api from "./api";

export const getDocuments = async () => {
  const response = await api.get("/api/documents");
  return response.data;
};

export const getDocumentById = async (id) => {
  const response = await api.get(`/api/documents/${id}`);
  return response.data;
};

export const createDocument = async (documentData) => {
  const response = await api.post("/api/documents", documentData);
  return response.data;
};

export const updateDocument = async (id, documentData) => {
  const response = await api.put(`/api/documents/${id}`, documentData);
  return response.data;
};

export const deleteDocument = async (id) => {
  await api.delete(`/api/documents/${id}`);
};
