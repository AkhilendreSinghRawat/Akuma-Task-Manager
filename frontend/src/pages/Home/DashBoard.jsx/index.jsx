import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setIsHomePage,
  setSelectedCardIndex,
} from '../../../redux/slices/sideBarSlice'
import axios from '../../../utils/axios'
import CreateNewModal from '../../../utils/CreateNewModal'
import ProjectDataCard from './ProjectDataCard'

const Dashboard = () => {
  const dispatch = useDispatch()
  const createProjectNameRef = React.useRef()
  const createProjectDiscriptionRef = React.useRef()
  const { selectedCardIndex } = useSelector((state) => state.sideBarData)
  const { projectSearchName } = useSelector((state) => state.searchNavbarData)
  const [showError, setShowError] = React.useState(false)
  const [filteredData, setFilteredData] = React.useState([])
  const [projectsData, setProjectsData] = React.useState([])

  React.useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (token?.accessToken) {
      axios
        .get('/getProjectsData', {
          headers: { authorization: `Bearer ${token?.accessToken}` },
        })
        .then((response) => {
          setProjectsData(response.data)
        })
        .catch((error) => console.log(error))
    } else {
      //@TODO handle no access token
    }
    dispatch(setIsHomePage(true))
    dispatchIndexZero()
  }, [])

  React.useEffect(() => {
    if (projectsData.length) {
      setFilteredData(projectsData)
    }
  }, [projectsData])

  React.useEffect(() => {
    if (projectSearchName === '') {
      setFilteredData(projectsData)
    }
    setFilteredData(
      projectsData.filter((item) =>
        item?.heading.toLowerCase().includes(projectSearchName)
      )
    )
  }, [projectSearchName])

  function dispatchIndexZero() {
    dispatch(setSelectedCardIndex(0))
  }

  const handleCreateProject = () => {
    const projectName = createProjectNameRef.current.value.trim()
    const projectDiscription = createProjectDiscriptionRef.current.value.trim()
    if (projectName === '' || projectDiscription === '') {
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 2000)
      return
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        userSelect: 'none',
      }}
    >
      <CreateNewModal
        isOpen={selectedCardIndex === 2}
        onClose={dispatchIndexZero}
        nameRef={createProjectNameRef}
        discriptionRef={createProjectDiscriptionRef}
        handleSubmit={handleCreateProject}
        showError={showError}
        name={'Project'}
      />
      <div className="headingCSS">Dashboard</div>
      <div className="grayLine" />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(400px,1fr))',
          gap: '1rem',
          alignItems: 'flex-start',
          margin: '0 1vw',
        }}
      >
        {filteredData.map((project, index) => {
          return (
            <ProjectDataCard
              key={index}
              projectId={project?.id}
              heading={project?.heading}
              discription={project?.discription}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Dashboard
