const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");

const {
  addNewProject,
  getProjectsData,
  editProject,
  deleteProject,
  getProjectById,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/addNewProject", authenticateToken, addNewProject);
router.get("/getProjectsData", authenticateToken, getProjectsData);
router.get("/getProjectById/:_id", authenticateToken, getProjectById);
router.put("/editProject", authenticateToken, editProject);
router.delete("/deleteProject", authenticateToken, deleteProject);

module.exports = router;
