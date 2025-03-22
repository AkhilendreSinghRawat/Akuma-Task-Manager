const userModel = require("../models/userModel.js");
const projectModel = require("../models/projectModel.js");
const taskModel = require("../models/taskModel.js");

const addNewProject = async (req, res) => {
  const { heading, description } = req.body;
  if (!heading || !description)
    return res
      .status(400)
      .json({ message: "Heading and Description are required!" });

  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const existingProject = await projectModel.findOne({ heading });
    if (existingProject)
      return res.status(403).json({ message: "Project already exists" });

    const newProject = new projectModel({
      user,
      heading,
      description,
    });

    const result = await newProject.save();
    console.log(`New Project Created 🎉: ${result.heading}`);

    return res
      .status(200)
      .json({ message: `New Project Created 🎉: ${result.heading}` });
  } catch (err) {
    console.error("Error while adding new project: ", err);
    return res
      .status(500)
      .json({ message: "Error while adding new project", error: err });
  }
};

const getProjectsData = async (req, res) => {
  const { searchValue } = req.query;
  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    let projects = await projectModel.find({ user });

    if (searchValue) {
      projects = projects.filter((item) =>
        item.heading.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    return res.json(projects);
  } catch (err) {
    console.error("Error while fetching project data: ", err);
    return res
      .status(500)
      .json({ message: "Error while fetching project data", error: err });
  }
};

const editProject = async (req, res) => {
  const { _id, heading, description } = req.body;
  if (!_id) return res.status(400).json({ message: "Invalid Id" });

  if (!heading || !description)
    return res
      .status(400)
      .json({ message: "Heading and Description are required!" });

  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const updatedProject = await projectModel.findOneAndUpdate(
      { user, _id },
      { heading, description },
      { new: true }
    );

    if (!updatedProject)
      return res.status(404).json({ message: "Project not found" });

    console.log("Project Edited Successfully: ", updatedProject);
    return res
      .status(200)
      .json({ message: "Project Edited Successfully", updatedProject });
  } catch (err) {
    console.error("Error while editing project: ", err);
    return res
      .status(500)
      .json({ message: "Error while editing project", error: err });
  }
};

const deleteProject = async (req, res) => {
  const { _id } = req.body;
  if (!_id) return res.status(400).json({ message: "Specify Id to delete" });

  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const deletedProject = await projectModel.findOneAndDelete({ _id });

    if (!deletedProject)
      return res.status(404).json({ message: "Project not found" });

    console.log("Project Deleted Successfully:", deletedProject);
    return res.status(200).json({ message: "Project Deleted Successfully" });
  } catch (err) {
    console.error("Error while deleting project: ", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

const getProjectById = async (req, res) => {
  const { _id } = req.params;
  if (!_id) return res.status(400).json({ message: "Specify Id to fetch" });

  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const project = await projectModel.findOne({ _id });

    if (!project) return res.status(404).json({ message: "Project not found" });

    const tasks = await taskModel.find({ project: _id });

    const result = project.toObject();
    result.tasks = tasks;

    console.log("Fetched Project:", result);
    return res.status(200).json({ data: result });
  } catch (err) {
    console.error("Error while fetching project: ", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

module.exports = {
  addNewProject,
  getProjectsData,
  editProject,
  deleteProject,
  getProjectById,
};
