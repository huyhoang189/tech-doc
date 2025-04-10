import api from "./api";

export const createModel = async (modelData) => {
  const response = await api.post("/api/models", modelData);
  return response.data;
};

export const deleteModel = async (id) => {
  await api.delete(`/api/models/${id}`);
};
