import React from 'react'

import Navbar from '../../../utils/Navbar'
import SideBar from '../SideBar'
import ListPage from './ListPage'

import { useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

const SpecificProjectDetail = () => {
  const { id, name } = useParams()
  const navigate = useNavigate()

  const [projectData, setProjectData] = React.useState({
    id: id,
    data: {
      tasks: {
        't-1': { id: 't-1', name: 'TO DO' },
        't-2': { id: 't-2', name: 'IN PROGRESS' },
        't-3': { id: 't-3', name: 'ON HOLD' },
        't-4': { id: 't-4', name: 'DONE ✔️' },
      },
      columns: {
        'c-1': {
          id: 'c-1',
          name: 'TO DO',
          taskIds: ['t-1', 't-2', 't-3', 't-4'],
        },
        'c-2': { id: 'c-2', name: 'IN PROGRESS', taskIds: [] },
        'c-3': { id: 'c-3', name: 'ON HOLD', taskIds: [] },
        'c-4': { id: 'c-4', name: 'DONE ✔️', taskIds: [] },
      },
      columnOrder: ['c-1', 'c-2', 'c-4', 'c-3'],
    },
  })

  const handleBackArrowClick = () => {
    navigate('/home')
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderTop: 'solid 1px skyblue',
        }}
      >
        <SideBar />
        <div
          style={{
            backgroundColor: 'white',
            display: 'flex',
            flex: 5,
            minHeight: '93vh',
            height: '100%',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex' }} className="headingCSS">
            <div
              onClick={handleBackArrowClick}
              style={{ marginRight: '1vw', color: 'black', cursor: 'pointer' }}
            >
              <BiArrowBack />
            </div>
            {name.substring(1)}
          </div>
          <div className="grayLine" />
          <ListPage projectData={projectData?.data} setProjectData={setProjectData} />
        </div>
      </div>
    </div>
  )
}

export default SpecificProjectDetail
