const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["to-do", "in-progress", "on-hold", "completed"],
    required: true,
  },
});

module.exports = mongoose.model("task", taskSchema);
