const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, expires: "30d", default: Date.now },
});

module.exports = mongoose.model("refreshToken", refreshTokenSchema);
