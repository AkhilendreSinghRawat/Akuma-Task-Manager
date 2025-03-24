require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database");

const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL }));

connectDB();

app.use("/auth", authRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port", process.env.PORT);
});
