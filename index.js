const express = require("express");
const passport = require("passport");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const authRoutes = require("./routes/auth");
const cors = require("cors");

require("./config/passport");

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/users", userRoutes);
app.use("/posts", passport.authenticate("jwt", { session: false }), postRoutes);
app.use(
  "/comments",
  passport.authenticate("jwt", { session: false }),
  commentRoutes
);
app.use("/auth", authRoutes);

// Basic routes for testing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
