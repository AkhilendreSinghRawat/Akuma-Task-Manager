import React, { useState, useEffect } from 'react'
import axios from '../../../utils/axios'
import ProjectDataCard from './ProjectDataCard'

const Dashboard = () => {
  const [projectsData, setProjectsData] = useState([
    {
      heading: 'Dashboard',
      discription:
        'salkdjflkdsajfldsa;kjfsalkdjfldsakjflksajflkdsajf;lsakjflkdsajflkdsanvkdsadnv;lsan./asndlkfnsav.dsanvlkdsanv',
      id: 0,
    },
    {
      heading:
        'Dashboardsadjflkdsajflkdssadkfm;ksdaf;sadfk;sldkf;dslkfajflkdsjflkdsjflksdjf',
      discription: 'salkdjflkdsajfldsa;kjf',
      id: 1,
    },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf', id: 2 },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf', id: 3 },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf', id: 4 },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf', id: 5 },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf', id: 6 },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf', id: 7 },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf', id: 8 },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf', id: 9 },
  ])

  // useEffect(() => {
  //   axios
  //     .get('/projectsData')
  //     .then((data) => setProjectsData(data))
  //     .catch((error) => console.log(error))
  // }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
        {projectsData.map((project, index) => {
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
