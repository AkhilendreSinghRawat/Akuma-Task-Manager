const mongoose = require("mongoose");
const User = require("./userSchema");

const dataFormatSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  },
  discription: {
    type: String,
    required: true,
  },
  taskData:{
    tasks: {
      [String]:{id: String,name: String}
    }
  }
});

const dataSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  data: {
    type: dataFormatSchema,
    required: true,
  },
});

module.exports = mongoose.model("data", dataSchema);
