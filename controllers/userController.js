const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(user);
};

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
  res.json(user);
};

const updateUser = async (req, res) => {
  const id = req.params.id;
  const { username, email, password } = req.body;
  const user = await prisma.user.update({
    where: {
      id: parseInt(id),
    },
    data: { username, email, password },
  });
  res.json(user);
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json({ message: "User deleted" });
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
