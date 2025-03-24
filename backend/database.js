const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://0.0.0.0:27017/TaskManager", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
