const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");
const refreshTokenModel = require("../models/refreshTokenModel");

const generateAccessToken = (user) =>
  jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });

const generateRefreshToken = (user) =>
  jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });

const register = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user)
      return res.status(403).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const emailObject = { email: req.body.email };

    const accessToken = generateAccessToken(emailObject);
    const refreshToken = generateRefreshToken(emailObject);

    await refreshTokenModel.create({ token: refreshToken });
    await userModel.create({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
    });

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) return res.status(403).json({ message: "Email not registered" });

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch)
      return res.status(409).json({ message: "Incorrect password" });

    const emailObject = { email: user.email };
    const accessToken = generateAccessToken(emailObject);
    const refreshToken = generateRefreshToken(emailObject);

    await refreshTokenModel.create({ token: refreshToken });

    res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

const logout = async (req, res) => {
  try {
    const result = await refreshTokenModel.findOneAndDelete({
      token: req.body.refreshToken,
    });
    console.log(result);
    res.status(200).json({ message: "Successfully logged out" });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error", error: err });
  }
};

module.exports = { register, login, logout };
