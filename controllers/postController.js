const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getPosts = async (req, res) => {
  const posts = await prisma.post.findMany();
  res.json(posts);
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({ where: { id: parseInt(id) } });
  res.json(post);
};

const createPost = async (req, res) => {
  const { title, content, authorId, published } = req.body;
  const post = await prisma.post.create({
    data: { title, content, authorId, published },
  });
  res.json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, published } = req.body;
  const post = await prisma.post.update({
    where: { id: parseInt(id) },
    data: { title, content, published },
  });
  res.json(post);
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  await prisma.post.delete({ where: { id: parseInt(id) } });
  res.json({ message: "Post deleted" });
};

module.exports = { getPosts, getPostById, createPost, updatePost, deletePost };
