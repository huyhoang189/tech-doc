import api from "./api";

export const getSystems = async () => {
  const response = await api.get("/api/systems");
  return response.data;
};

export const getSystemById = async (id) => {
  const response = await api.get(`/api/systems/${id}`);
  return response.data;
};

export const createSystem = async (systemData) => {
  const response = await api.post("/api/systems", systemData);
  return response.data;
};

export const updateSystem = async (id, systemData) => {
  const response = await api.put(`/api/systems/${id}`, systemData);
  return response.data;
};

export const deleteSystem = async (id) => {
  await api.delete(`/api/systems/${id}`);
};
