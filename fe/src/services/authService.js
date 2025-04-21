import api from "./api";

export const login = async (values) => {
  const response = await api.post("/api/auth/login", values);
  return response.data;
};
