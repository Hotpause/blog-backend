const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getComments = async (req, res) => {
  const comments = await prisma.comment.findMany();
  res.json(comments);
};

const getCommentById = async (req, res) => {
  const { id } = req.params;
  const comment = await prisma.comment.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(comment);
};

const createComment = async (req, res) => {
  const { postId, author, content } = req.body;
  const comment = await prisma.comment.create({
    data: { postId, author, content },
  });
  res.json(comment);
};

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const comment = await prisma.comment.update({
    where: { id: parseInt(id) },
    data: { content },
  });
  res.json(comment);
};

const deleteComment = async (req, res) => {
  const { id } = req.params;
  await prisma.comment.delete({ where: { id: parseInt(id) } });
  res.json({ message: "Comment deleted" });
};

module.exports = {
  getComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};
