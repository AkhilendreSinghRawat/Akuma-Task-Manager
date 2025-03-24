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
  description: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: Number,
  },
  status: {
    type: String,
    enum: ["to-do", "in-progress", "on-hold", "completed"],
  },
});

taskSchema.pre("save", async function (next) {
  if (!this.orderNumber) {
    const highestOrderTask = await this.constructor
      .findOne({ project: this.project })
      .sort("-orderNumber")
      .select("orderNumber");

    this.orderNumber = highestOrderTask ? highestOrderTask.orderNumber + 1 : 1;
  }

  if (!this.status) {
    this.status = "to-do";
  }

  next();
});

module.exports = mongoose.model("task", taskSchema);
