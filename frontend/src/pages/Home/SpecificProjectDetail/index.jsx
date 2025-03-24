import React from "react";

import Navbar from "../../../utils/Navbar";
import SideBar from "../SideBar";
import ListPage from "./ListPage";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import {
  setIsHomePage,
  setSelectedCardIndex,
} from "../../../redux/slices/sideBarSlice";
import CreateNewModal from "../../../utils/CreateNewModal";
import { useAxios } from "../../../hooks/useAxios";

const defaultTasksData = {
  tasks: {},
  columns: {
    "to-do": {
      id: "to-do",
      name: "TO DO",
      taskIds: [],
    },
    "in-progress": { id: "in-progress", name: "IN PROGRESS", taskIds: [] },
    "on-hold": { id: "on-hold", name: "ON HOLD", taskIds: [] },
    completed: { id: "completed", name: "COMPLETED ✔️", taskIds: [] },
  },
  columnOrder: ["to-do", "in-progress", "on-hold", "completed"],
};

const SpecificProjectDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createTaskNameRef = React.useRef();
  const createTaskDiscriptionRef = React.useRef();
  const { selectedCardIndex } = useSelector((state) => state.sideBarData);
  const [showError, setShowError] = React.useState(false);
  const [heading, setHeading] = React.useState("");
  const [tasksData, setTasksData] = React.useState(defaultTasksData);

  React.useEffect(() => {
    dispatch(setIsHomePage(false));
  }, []);

  const handleProjectData = ({ data }) => {
    setHeading(data?.heading);
    const newTasksData = JSON.parse(JSON.stringify(defaultTasksData));

    data.tasks.sort((a, b) => a.orderNumber - b.orderNumber);

    for (const task of data.tasks) {
      newTasksData.tasks[task._id] = {
        id: task._id,
        name: task.name,
      };
      newTasksData.columns[task.status].taskIds.push(task._id);
    }

    setTasksData(newTasksData);
  };

  const getProjectById = () => {
    useAxios({
      path: `projects/getProjectById/${id}`,
      navigate,
      successCb: handleProjectData,
    });
  };

  React.useEffect(() => {
    if (!id) return;

    getProjectById();
  }, [id]);

  const handleBackArrowClick = () => {
    navigate("/home");
  };

  const dispatchIndexZero = () => {
    dispatch(setSelectedCardIndex(0));
  };

  const handleCreateTask = (taskHeading, taskDescription) => {
    useAxios({
      path: "tasks/addNewTask",
      type: "post",
      navigate,
      payload: {
        heading: taskHeading,
        description: taskDescription,
        project_heading: heading,
      },
      successCb: getProjectById,
      finallyCb: dispatchIndexZero,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          borderTop: "solid 1px skyblue",
        }}
      >
        <SideBar />
        <div
          style={{
            backgroundColor: "white",
            display: "flex",
            flex: 5,
            minHeight: "93vh",
            height: "100%",
            flexDirection: "column",
          }}
        >
          <CreateNewModal
            isOpen={selectedCardIndex === 3}
            onClose={dispatchIndexZero}
            handleSubmit={handleCreateTask}
            name={"Task"}
          />
          <div style={{ display: "flex" }} className="headingCSS">
            <div
              onClick={handleBackArrowClick}
              style={{ marginRight: "1vw", color: "black", cursor: "pointer" }}
            >
              <BiArrowBack />
            </div>
            {heading}
          </div>
          <div className="grayLine" />
          <ListPage
            tasksData={tasksData}
            setTasksData={setTasksData}
            getProjectById={getProjectById}
          />
        </div>
      </div>
    </div>
  );
};

export default SpecificProjectDetail;
