import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsHomePage,
  setSelectedCardIndex,
} from "../../../redux/slices/sideBarSlice";
import axios from "../../../utils/axios";
import CreateNewModal from "../../../utils/CreateNewModal";
import ProjectDataCard from "./ProjectDataCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const createProjectNameRef = React.useRef();
  const createProjectDiscriptionRef = React.useRef();
  const { selectedCardIndex } = useSelector((state) => state.sideBarData);
  const { projectSearchName } = useSelector((state) => state.searchNavbarData);
  const [showError, setShowError] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState([]);
  const [projectsData, setProjectsData] = React.useState([]);

  React.useEffect(() => {
    getProjectsData();
    dispatch(setIsHomePage(true));
    dispatchIndexZero();
  }, []);

  React.useEffect(() => {
    if (projectsData.length) {
      setFilteredData(projectsData);
    }
  }, [projectsData]);

  React.useEffect(() => {
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
    const token = JSON.parse(localStorage.getItem("token"));
    if (token?.accessToken) {
      try {
        const res = await axios.get("/getProjectsData", {
          headers: { authorization: `Bearer ${token?.accessToken}` },
        });

        if (res.status === 200) setProjectsData(res.data);
      } catch (err) {
        toast.error(err?.response?.data?.message);
      }
    } else {
      navigate("/signin");
    }
  };

  const dispatchIndexZero = () => dispatch(setSelectedCardIndex(0));

  const handleCreateProject = async () => {
    const projectName = createProjectNameRef.current.value.trim();
    const projectDiscription = createProjectDiscriptionRef.current.value.trim();
    if (projectName === "" || projectDiscription === "") {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 2000);
      return;
    }
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (token?.accessToken) {
        const response = await axios.post(
          "/addNewProject",
          {
            heading: projectName,
            discription: projectDiscription,
          },
          {
            headers: { authorization: `Bearer ${token?.accessToken}` },
          }
        );
        if (response.status === 200) {
          getProjectsData();
          toast.success(response.data?.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      dispatchIndexZero();
    }
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
        nameRef={createProjectNameRef}
        discriptionRef={createProjectDiscriptionRef}
        handleSubmit={handleCreateProject}
        showError={showError}
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
        {filteredData.map(({ data: project }, index) => {
          return (
            <ProjectDataCard
              key={index}
              projectId={project?._id}
              heading={project?.heading}
              discription={project?.discription}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
