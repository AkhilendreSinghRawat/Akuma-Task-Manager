import React from 'react'

import Dashboard from '../../pages/Home/DashBoard.jsx'
import ProfilePage from '../Profile/index.jsx'

import Navbar from '../../utils/Navbar'
import SideBar from './SideBar'
import { useSelector } from 'react-redux'

const SideBarContent = {
  0: <Dashboard />,
  1: <ProfilePage />,
  2: <Dashboard />,
  3: <Dashboard />,
}

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
          {SideBarContent[selectedCardIndex]}
        </div>
      </div>
    </div>
  )
}

export default Home
