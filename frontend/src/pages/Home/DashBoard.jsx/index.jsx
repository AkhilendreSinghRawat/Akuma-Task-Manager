import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsHomePage,
  setSelectedCardIndex,
} from "../../../redux/slices/sideBarSlice";
import CreateNewModal from "../../../utils/CreateNewModal";
import ProjectDataCard from "./ProjectDataCard";
import { useAxios } from "../../../utils/api";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedCardIndex } = useSelector((state) => state.sideBarData);
  const { projectSearchName } = useSelector((state) => state.searchNavbarData);
  const [filteredData, setFilteredData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    getProjectsData();
    dispatch(setIsHomePage(true));
    dispatchIndexZero();
  }, []);

  useEffect(() => {
    if (projectsData.length) {
      setFilteredData(projectsData);
    }
  }, [projectsData]);

  useEffect(() => {
    if (projectSearchName === "") {
      setFilteredData(projectsData);
    }
    setFilteredData(
      projectsData.filter((item) =>
        item?.heading.toLowerCase().includes(projectSearchName)
      )
    );
  }, [projectSearchName]);

  const getProjectsData = async () => {
    useAxios({
      navigate,
      path: "getProjectsData",
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
        {filteredData.map(({ data: project, _id }, index) => {
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
