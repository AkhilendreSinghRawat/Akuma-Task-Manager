import React from 'react'

import Navbar from '../../utils/Navbar'
import SideBar from './SideBar'
import Dashboard from './DashBoard.jsx'
import { useSelector } from 'react-redux'

const SideBarContent = [
  {
    name: 'Dashboard',
    component: <Dashboard />,
  },
  { name: 'Profile', component: <Dashboard /> },
  {
    name: 'Create a new project',
    component: <Dashboard />,
  },
]

const Home = () => {
  const { selectedCardIndex } = useSelector((state) => state.sideBarData)

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
          }}
        >
          {SideBarContent[selectedCardIndex]?.component}
        </div>
      </div>
    </div>
  )
}

export default Home
