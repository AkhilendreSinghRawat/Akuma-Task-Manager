import React, { useState, useEffect } from 'react'
import axios from '../../../utils/axios'
import ProjectDataCard from './ProjectDataCard'

const Dashboard = () => {
  const [projectsData, setProjectsData] = useState([
    {
      heading: 'Dashboard',
      discription:
        'salkdjflkdsajfldsa;kjfsalkdjfldsakjflksajflkdsajf;lsakjflkdsajflkdsanvkdsadnv;lsan./asndlkfnsav.dsanvlkdsanv',
    },
    {
      heading:
        'Dashboardsadjflkdsajflkdssadkfm;ksdaf;sadfk;sldkf;dslkfajflkdsjflkdsjflksdjf',
      discription: 'salkdjflkdsajfldsa;kjf',
    },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf' },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf' },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf' },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf' },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf' },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf' },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf' },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf' },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf' },
    { heading: 'Dashboard', discription: 'salkdjflkdsajfldsa;kjf' },
  ])

  // useEffect(() => {
  //   axios
  //     .get('/projectsData')
  //     .then((data) => setProjectsData(data))
  //     .catch((error) => console.log(error))
  // }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div
        style={{
          fontSize: 'xx-large',
          color: 'darkcyan',
          margin: '2vh 2vw',
          fontWeight: 'bold',
        }}
      >
        Dashboard
      </div>
      <div
        style={{
          borderBottom: 'solid 1px lightgray',
          margin: '1vh 1vw',
        }}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(500px,1fr))',
          gap: '1rem',
          alignItems: 'flex-start',
          margin: '0 1vw',
        }}
      >
        {projectsData.map((project, index) => {
          return (
            <ProjectDataCard
              key={index}
              projectId={index}
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
