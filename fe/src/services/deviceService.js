import api from "./api";

export const getDevices = async () => {
  const response = await api.get("/api/devices");
  return response.data;
};

export const getDeviceById = async (id) => {
  const response = await api.get(`/api/devices/${id}`);
  return response.data;
};

export const createDevice = async (deviceData) => {
  const response = await api.post("/api/devices", deviceData);
  return response.data;
};

export const updateDevice = async (id, deviceData) => {
  const response = await api.put(`/api/devices/${id}`, deviceData);
  return response.data;
};

export const deleteDevice = async (id) => {
  await api.delete(`/api/devices/${id}`);
};
