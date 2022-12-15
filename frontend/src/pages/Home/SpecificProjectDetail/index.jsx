import React from 'react'

import Navbar from '../../../utils/Navbar'
import SideBar from '../SideBar'
import ListPage from './ListPage'

import { useNavigate, useParams } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'

const SpecificProjectDetail = () => {
  const { id, name } = useParams()
  const navigate = useNavigate()

  const [projectData, setProjectData] = React.useState([
    {
      id: 0,
      
    }
  ])

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
          <ListPage />
        </div>
      </div>
    </div>
  )
}

export default SpecificProjectDetail
