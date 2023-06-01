import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsHomePage,
  setSelectedCardIndex,
} from "../../../redux/slices/sideBarSlice";
import CreateNewModal from "../../../utils/CreateNewModal";
import ProjectDataCard from "./ProjectDataCard";
import { useNavigate } from "react-router";
import { useAxios } from "../../../hooks/useAxios";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedCardIndex } = useSelector((state) => state.sideBarData);
  const { projectSearchName } = useSelector((state) => state.searchNavbarData);
  const [projectsData, setProjectsData] = useState([]);

  const getProjectsData = async () => {
    useAxios({
      navigate,
      path: "getProjectsData",
      payload: { searchValue: projectSearchName },
      successCb: (res) => setProjectsData(res.data),
    });
  };

  const dispatchIndexZero = () => dispatch(setSelectedCardIndex(0));

  const handleCreateProject = (heading, discription) => {
    useAxios({
      path: "addNewProject",
      type: "post",
      navigate,
      payload: {
        heading,
        discription,
      },
      successCb: getProjectsData,
      finallyCb: dispatchIndexZero,
    });
  };

  useEffect(() => {
    getProjectsData();
    dispatch(setIsHomePage(true));
    dispatchIndexZero();
  }, [projectSearchName]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        userSelect: "none",
      }}
    >
      <CreateNewModal
        isOpen={selectedCardIndex === 2}
        onClose={dispatchIndexZero}
        handleSubmit={handleCreateProject}
        name={"Project"}
      />
      <div className="headingCSS">Dashboard</div>
      <div className="grayLine" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))",
          gap: "1rem",
          alignItems: "flex-start",
          margin: "0 1vw",
        }}
      >
        {projectsData.map(({ data: project, _id }, index) => {
          return (
            <ProjectDataCard
              key={index}
              projectId={_id}
              heading={project?.heading}
              discription={project?.discription}
              getProjectsData={getProjectsData}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
