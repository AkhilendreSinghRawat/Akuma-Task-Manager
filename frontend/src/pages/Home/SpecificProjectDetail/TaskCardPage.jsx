import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import CreateNewModal from "../../../utils/CreateNewModal";
import { useAxios } from "../../../hooks/useAxios";
import { useNavigate } from "react-router";

const TaskCardPage = ({ task, index, getProjectById }) => {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleIconClick = (e, type) => {
    e.stopPropagation();
    if (type === "edit") return setEditing(true);

    setOpenDeleteModal(true);
  };

  const handleEditTaskDetails = (heading, description) => {
    useAxios({
      path: "tasks/editTask",
      type: "put",
      navigate,
      payload: { _id: projectId, heading, description },
      successCb: getProjectById,
      finallyCb: () => setEditing(false),
    });
  };

  const handleDeleteTask = () => {
    if (!task.id) return console.error("Task id not found!!");

    useAxios({
      path: "tasks/deleteTask",
      type: "delete",
      navigate,
      payload: { _id: task.id },
      successCb: getProjectById,
      finallyCb: () => setOpenDeleteModal(false),
    });
  };

  return (
    <Draggable draggableId={task?.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className="boxShadow"
            style={{
              backgroundColor: snapshot.isDragging ? "lightgreen" : "white",
              margin: 10,
              userSelect: "none",
              textOverflow: "ellipsis",
              wordBreak: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "30px 20px",
                }}
              >
                {task?.name}
              </div>
              <CreateNewModal
                isOpen={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                type="Delete"
                name="Task"
                deleteProjectName={task?.name}
                handleSubmit={handleDeleteTask}
              />
              <CreateNewModal
                isOpen={editing}
                onClose={() => setEditing(false)}
                handleSubmit={handleEditTaskDetails}
                type="Edit"
                name="Task"
              />
              <div className="ProjectDataCardIconContainer">
                <AiFillEdit
                  className="ProjectDataCardEditIcon"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleIconClick(e, "edit")}
                />
                <AiFillDelete
                  className="ProjectDataCardDeleteIcon"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleIconClick(e, "delete")}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCardPage;
