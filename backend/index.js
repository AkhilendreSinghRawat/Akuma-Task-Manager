require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  })
);

const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/TaskManager").then(() => {
  console.log("Connected to MongoDB");
});

const userModel = require("./Schemas/userSchema.js");
const dataModel = require("./Schemas/dataSchema.js");
const refreshTokenModel = require("./Schemas/refreshTokenSchema.js");

const generateAccessToken = (user) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

const generateRefreshToken = (user) =>
  jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({ message: "Token Not Found" }); //no token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: "Token Is Nolonger Valid" }); //token is nolonger invalid
    req.user = user;
    next();
  });
};

app.post("/addNewProject", authenticateToken, async (req, res) => {
  const { heading, discription } = req.body;
  if (!heading || !discription)
    return res
      .status(400)
      .json({ message: "Heading and Discription are requried!" });

  try {
    const user = await userModel.findOne({ email: req.user.email });

    if (user) {
      const data = new dataModel({
        user,
        data: { heading, discription },
      });

      const result = await data.save();
      console.log(`New Project Created 🎉: ${result.data.heading}`);

      return res
        .status(200)
        .json({ message: `New Project Created 🎉: ${result.data.heading}` });
    }
  } catch (err) {
    console.error("Error while adding new project: ", err);
    return res
      .status(500)
      .json({ message: "Error while adding new project:", error: err });
  }
});

app.get("/getProjectsData", authenticateToken, async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    const data = await dataModel.find({ user });

    return res.json(data);
  } catch (err) {
    console.error("Error while fetching project data: ", err);
    return res
      .status(500)
      .json({ message: "Error while fetching project data:", error: err });
  }
});

app.post("/addNewTask", authenticateToken, (req, res) => {});

app.delete("/logout", async (req, res) => {
  try {
    const result = await refreshTokenModel.findOneAndDelete({
      token: req.body.refreshToken,
    });
    console.log(result);
    res.status(204).json({ message: "Successfully logged out" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

app.post("/token", async (req, res) => {
  if (req.body.refreshToken == null)
    return res.status(401).json({ message: "Token Not Found" });

  try {
    const refreshToken = await refreshTokenModel.find(
      (token) => token === req.body.refreshToken
    );
    if (!refreshToken) {
      return res.status(403).json({ message: "Invalid Refresh Token" });
    }

    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken({ email: user.email });
    res.status(200).json({ accessToken: accessToken });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

app.post("/register", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user)
      return res.status(403).json({ message: "Email already registered" });

    const hashedPassword = bcrypt.hash(req.body.password, 10);
    const emailObject = {
      email: req.body.email,
    };
    const accessToken = generateAccessToken(emailObject);
    const refreshToken = generateRefreshToken(emailObject);
    const newRefreshToken = new refreshTokenModel({ token: refreshToken });
    const newRefreshTokenResult = await newRefreshToken.save();
    console.log(newRefreshTokenResult);

    const newUser = new userModel({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });
    const result = await newUser.save();
    console.log(`New User Register ${result}`);
    res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(403).json({ message: "Email not registered" });

    const isMatch = bcrypt.compare(req.body.password, user.password);
    if (isMatch) {
      const emailObject = { email: user.email };
      const accessToken = generateAccessToken(emailObject);
      const refreshToken = generateRefreshToken(emailObject);
      const newRefreshToken = new refreshTokenModel({
        token: refreshToken,
      });

      const refreshTokenResult = await newRefreshToken.save();
      console.log(refreshTokenResult);

      console.log(`User logged in: ${user}`);
      res
        .status(200)
        .json({ accessToken: accessToken, refreshToken: refreshToken });
    } else {
      res.status(409).json({ message: "Incorrect password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
});

app.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT);
});
