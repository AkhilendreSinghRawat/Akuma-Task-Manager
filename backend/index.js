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
mongoose.connect("mongodb://localhost:27017/TaskManager", () => {
  console.log("Connected to MongoDB");
});

const userModel = require("./Schemas/userSchema.js");
const dataModel = require("./Schemas/dataSchema.js");
const refreshTokenModel = require("./Schemas/refreshTokenSchema.js");

const DATA = [
  {
    heading: "Dashboard",
    discription:
      "salkdjflkdsajfldsa;kjfsalkdjfldsakjflksajflkdsajf;lsakjflkdsajflkdsanvkdsadnv;lsan./asndlkfnsav.dsanvlkdsanv",
    id: 0,
  },
  {
    heading:
      "Dashboardsadjflkdsajflkdssadkfm;ksdaf;sadfk;sldkf;dslkfajflkdsjflkdsjflksdjf",
    discription: "salkdjflkdsajfldsa;kjf",
    id: 1,
  },
  {
    heading: "Dashboard",
    discription: "salkdjflkdsajfldsa;kjf",
    id: 2,
  },
  {
    heading: "Dashboard",
    discription: "salkdjflkdsajfldsa;kjf",
    id: 3,
  },
  {
    heading: "Dashboard",
    discription: "salkdjflkdsajfldsa;kjf",
    id: 4,
  },
  {
    heading: "Dashboard",
    discription: "salkdjflkdsajfldsa;kjf",
    id: 5,
  },
  {
    heading: "Dashboard",
    discription: "salkdjflkdsajfldsa;kjf",
    id: 6,
  },
  {
    heading: "Dashboard",
    discription: "salkdjflkdsajfldsa;kjf",
    id: 7,
  },
  {
    heading: "Dashboard",
    discription: "salkdjflkdsajfldsa;kjf",
    id: 8,
  },
  {
    heading: "akhilendre",
    discription: "salkdjflkdsajfldsa;kjf",
    id: 9,
  },
];

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
};

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

      data.save((err, result) => {
        if (err) {
          console.error("Error on saving project data: ", err);
          return res
            .status(409)
            .json({ message: "Error while saving token", error: err });
        }

        console.info("Result on saving project data: ", result);
        return res.status(200).json({ message: "New Project Created 🎉" });
      });
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
    const data = await dataModel.find();
    console.log("Data model ", data);

    return res.json(data);
  } catch (err) {
    console.error("Error while adding new project: ", err);
    return res
      .status(500)
      .json({ message: "Error while adding new project:", error: err });
  }
});

app.post("/addNewTask", authenticateToken, (req, res) => {});

app.delete("/logout", (req, res) => {
  refreshTokenModel.findOneAndDelete(
    { token: req.body.refreshToken },
    (err, result) => {
      if (err) {
        console.log(err);
        res
          .status(409)
          .json({ message: "Error while deleting token", error: err });
        return;
      }
      console.log(result);
    }
  );
  res.status(204).json({ message: "Successfully logged out" });
});

app.post("/token", (req, res) => {
  if (req.body.refreshToken == null) return res.sendStatus(401);
  const refreshToken = refreshTokenModel.find((token) => {
    return token === req.body.refreshToken;
  });
  if (!refreshToken) {
    res.status(403).json({ message: "Invalid Refresh Token" });
    return;
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "Error generating access token", err });
    const accessToken = generateAccessToken({ email: user.email });
    res.status(200).json({ accessToken: accessToken });
  });
});

app.post("/register", (req, res) => {
  userModel.findOne({ email: req.body.email }, (err, result) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err });
    }
    if (result) {
      return res.status(403).json({ message: "Email already registered" });
    }
    bcrypt
      .hash(req.body.password, 10)
      .then((hashedPassword) => {
        const emailObject = {
          email: req.body.email,
        };
        const accessToken = generateAccessToken(emailObject);
        const refreshToken = generateRefreshToken(emailObject);
        const newRefreshToken = new refreshTokenModel({ token: refreshToken });
        newRefreshToken.save((err, result) => {
          if (err) {
            console.log(err);
            res
              .status(409)
              .json({ message: "Error while saving token", error: err });
            return;
          }
          console.log(result);
        });
        const newUser = new userModel({
          email: req.body.email,
          password: hashedPassword,
          name: req.body.name,
        });
        newUser.save((err, result) => {
          if (err) {
            console.log(err);
            res
              .status(409)
              .json({ message: "Error while saving user", error: err });
            return;
          }
          console.log(result);
          res
            .status(200)
            .json({ accessToken: accessToken, refreshToken: refreshToken });
        });
      })
      .catch((err) =>
        res.status(500).json({ message: "Internal Server Error", error: err })
      );
  });
});

app.post("/login", (req, res) => {
  userModel.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: err });
    }
    if (!user) {
      return res.status(403).json({ message: "Email not registered" });
    }
    bcrypt
      .compare(req.body.password, user.password)
      .then((isMatch) => {
        if (isMatch) {
          const emailObject = { email: user.email };
          const accessToken = generateAccessToken(emailObject);
          const refreshToken = generateRefreshToken(emailObject);
          const newRefreshToken = new refreshTokenModel({
            token: refreshToken,
          });
          newRefreshToken.save((err, result) => {
            if (err) {
              console.log(err);
              res
                .status(409)
                .json({ message: "Error while saving token", error: err });
              return;
            }
            console.log(result);
          });
          res
            .status(200)
            .json({ accessToken: accessToken, refreshToken: refreshToken });
        } else {
          res.status(409).json({ message: "Incorrect password" });
        }
      })
      .catch((err) =>
        res.status(500).json({ message: "Internal Server Error", error: err })
      );
  });
});

app.listen(process.env.PORT, () => {
  console.log("server listening on port", process.env.PORT);
});
