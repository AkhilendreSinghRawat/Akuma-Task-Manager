const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");

const {
  addNewTask,
  editTask,
  deleteTask,
  editTaskStatus,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/addNewTask", authenticateToken, addNewTask);
router.put("/editProject", authenticateToken, editTask);
router.put("/editTaskStatus/:_id", authenticateToken, editTaskStatus);
router.delete("/deleteTask", authenticateToken, deleteTask);

module.exports = router;
