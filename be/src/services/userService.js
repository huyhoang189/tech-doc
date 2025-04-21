const prisma = require('../config/database');
const bcrypt = require('bcrypt');

const getAllUsers = () => {
  return prisma.User.findMany({
    select: { id: true, username: true, role: true, createdAt: true },
  });
};

const getUserById = (id) => {
  return prisma.User.findUnique({
    where: { id: Number(id) },
    select: { id: true, username: true, role: true, createdAt: true },
  });
};

const createUser = async (username, password, role) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return prisma.User.create({
    data: { username, password: hashedPassword, role },
    select: { id: true, username: true, role: true, createdAt: true },
  });
};

const updateUser = async (id, data) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return prisma.User.update({
    where: { id: Number(id) },
    data,
    select: { id: true, username: true, role: true, updatedAt: true },
  });
};

const deleteUser = (id) => {
  return prisma.User.delete({ where: { id: Number(id) } });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
