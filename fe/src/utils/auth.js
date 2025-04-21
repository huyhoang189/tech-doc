// src/utils/auth.js

export const getToken = () => localStorage.getItem("token");
export const getRole = () => localStorage.getItem("role");
export const getUsername = () => localStorage.getItem("username");

export const isLoggedIn = () => !!getToken();
export const isAdmin = () => getRole() === "ADMIN";
export const isUser = () => getRole() === "USER";

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("username");
};
