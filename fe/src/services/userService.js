import api from "./api";

export const getUsers = async () => {
  const response = await api.get("/api/users");
  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`/api/users/${id}`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await api.post("/api/users", userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/api/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  await api.delete(`/api/users/${id}`);
};
