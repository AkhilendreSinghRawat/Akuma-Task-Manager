import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import CreateNewModal from "../../../utils/CreateNewModal";
import { useAxios } from "../../../hooks/useAxios";

const ProjectDataCard = ({
  projectId,
  heading,
  description,
  getProjectsData,
}) => {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleProjectClick = () => {
    navigate(`/home/project/${projectId}`);
  };

  const handleEditProjectDetails = (heading, description) => {
    useAxios({
      path: "projects/editProject",
      type: "put",
      navigate,
      payload: { _id: projectId, heading, description },
      successCb: getProjectsData,
      finallyCb: () => setEditing(false),
    });
  };

  const handleDeleteProject = () => {
    useAxios({
      path: "projects/deleteProject",
      type: "delete",
      navigate,
      payload: { _id: projectId },
      successCb: getProjectsData,
      finallyCb: () => setOpenDeleteModal(false),
    });
  };

  const handleIconClick = (e, type) => {
    e.stopPropagation();
    if (type === "edit") return setEditing(true);

    setOpenDeleteModal(true);
  };

  return (
    <>
      <CreateNewModal
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        type="Delete"
        name="Project"
        deleteProjectName={heading}
        handleSubmit={handleDeleteProject}
      />
      <CreateNewModal
        isOpen={editing}
        onClose={() => setEditing(false)}
        handleSubmit={handleEditProjectDetails}
        type="Edit"
        name="Project"
      />
      <div
        onClick={handleProjectClick}
        className="ProjectDataCardContainer boxShadow"
      >
        <div className="ProjectDataCardDataContainer">
          <div className="ProjectDataCardHeading">{heading}</div>
          <div className="ProjectDataCardDiscription">{description}</div>
        </div>
        <div className="ProjectDataCardIconContainer">
          <AiFillEdit
            className="ProjectDataCardEditIcon"
            onClick={(e) => handleIconClick(e, "edit")}
          />
          <AiFillDelete
            className="ProjectDataCardDeleteIcon"
            onClick={(e) => handleIconClick(e, "delete")}
          />
        </div>
      </div>
    </>
  );
};

export default ProjectDataCard;
