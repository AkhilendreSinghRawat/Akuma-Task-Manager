const userModel = require("../models/userModel.js");
const projectModel = require("../models/projectModel.js");
const taskModel = require("../models/taskModel.js");

const addNewTask = async (req, res) => {
  const { heading, description, project_heading } = req.body;
  if (!heading || !description)
    return res
      .status(400)
      .json({ message: "Heading and Description are required!" });

  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const project = await projectModel.findOne({
      user,
      heading: project_heading,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });

    const existingTask = await taskModel.findOne({ name: heading });
    if (existingTask)
      return res.status(403).json({ message: "Task already exists" });

    const newTask = new taskModel({
      user,
      project,
      name: heading,
      description,
    });

    const result = await newTask.save();
    console.log(`New Task Created 🎉: ${result.name}`);

    return res
      .status(200)
      .json({ message: `New Task Created 🎉: ${result.name}` });
  } catch (err) {
    console.error("Error while adding new task: ", err);
    return res
      .status(500)
      .json({ message: "Error while adding new task", error: err });
  }
};

// const getProjectsData = async (req, res) => {
//   const { searchValue } = req.query;
//   try {
//     const user = await userModel.findOne({ email: req.user.email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     let projects = await projectModel.find({ user });

//     if (searchValue) {
//       projects = projects.filter((item) =>
//         item.heading.toLowerCase().includes(searchValue.toLowerCase())
//       );
//     }

//     return res.json(projects);
//   } catch (err) {
//     console.error("Error while fetching project data: ", err);
//     return res
//       .status(500)
//       .json({ message: "Error while fetching project data", error: err });
//   }
// };

const editTask = async (req, res) => {
  const { _id } = req.params;
  const { name } = req.body;

  if (!_id) return res.status(400).json({ message: "Invalid Id" });

  if (!name)
    return res.status(400).json({ message: "Name of task is required!" });

  try {
    const updatedTask = await taskModel.findOneAndUpdate(
      { _id },
      { $set: { name } },
      { new: true }
    );

    if (!updatedTask)
      return res.status(404).json({ message: "Task not found" });

    console.log("Task Edited Successfully: ", updatedTask);
    return res
      .status(200)
      .json({ message: "Task Edited Successfully", updatedTask });
  } catch (err) {
    console.error("Error while editing task: ", err);
    return res
      .status(500)
      .json({ message: "Error while editing task", error: err });
  }
};

const editTaskStatus = async (req, res) => {
  const { _id } = req.params;
  const { status, orderNumber } = req.body;

  if (!_id) return res.status(400).json({ message: "Invalid Id" });
  if (!orderNumber)
    return res
      .status(400)
      .json({ message: "OrderNumber of task is required!" });
  if (!status)
    return res.status(400).json({ message: "Status of task is required!" });

  try {
    const task = await taskModel.findById(_id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const projectId = task.project;
    const prevStatus = task.status;
    const prevOrderNumber = task.orderNumber;

    if (status === prevStatus && orderNumber !== prevOrderNumber) {
      // Reordering within the same status
      if (orderNumber < prevOrderNumber) {
        // Move up: Shift tasks down
        await taskModel.updateMany(
          {
            project: projectId,
            status,
            orderNumber: { $gte: orderNumber, $lt: prevOrderNumber },
          },
          { $inc: { orderNumber: 1 } }
        );
      } else {
        // Move down: Shift tasks up
        await taskModel.updateMany(
          {
            project: projectId,
            status,
            orderNumber: { $gt: prevOrderNumber, $lte: orderNumber },
          },
          { $inc: { orderNumber: -1 } }
        );
      }

      task.orderNumber = orderNumber;
    } else if (status !== prevStatus) {
      // Status is changing, so we need to insert the task at the new position in the new status group
      await taskModel.updateMany(
        {
          project: projectId,
          status,
          orderNumber: { $gte: orderNumber }, // Shift tasks down in the new status
        },
        { $inc: { orderNumber: 1 } }
      );

      task.status = status;
      task.orderNumber = orderNumber;
    }

    // Save updated task
    await task.save();

    console.log("Task Edited Successfully: ", task);
    return res.status(200).json({ message: "Task Edited Successfully", task });
  } catch (err) {
    console.error("Error while editing task: ", err);
    return res
      .status(500)
      .json({ message: "Error while editing task", error: err });
  }
};

const deleteTask = async (req, res) => {
  const { _id } = req.body;
  if (!_id)
    return res.status(400).json({ message: "Specify Task Id to delete" });

  try {
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const deletedTask = await taskModel.findOneAndDelete({ _id });

    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    console.log("Task Deleted Successfully:", deletedTask);
    return res.status(200).json({ message: "Task Deleted Successfully" });
  } catch (err) {
    console.error("Error while deleting task: ", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err });
  }
};

// const getProjectById = async (req, res) => {
//   const { _id } = req.params;
//   if (!_id) return res.status(400).json({ message: "Specify Id to fetch" });

//   try {
//     const user = await userModel.findOne({ email: req.user.email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const project = await projectModel.findOne({ _id });

//     if (!project) return res.status(404).json({ message: "Project not found" });

//     const tasks = await taskModel.find({ project: _id });

//     const result = project.toObject();
//     result.tasks = tasks;

//     console.log("Fetched Project:", result);
//     return res.status(200).json(result);
//   } catch (err) {
//     console.error("Error while fetching project: ", err);
//     return res
//       .status(500)
//       .json({ message: "Internal Server Error", error: err });
//   }
// };

module.exports = {
  addNewTask,
  deleteTask,
  editTask,
  editTaskStatus,
};
