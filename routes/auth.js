const express = require("express");
const { generateToken } = require("../utils/jwt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    if (!email || !password || !username) {
      return res
        .status(400)
        .json({ error: "Email, password, and username are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Failed to sign up" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user);
      res.json({ token, userId: user.id });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
});

module.exports = router;
