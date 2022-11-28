import React, { useState } from 'react'

import Navbar from '../../utils/Navbar'
import SideBar from './SideBar'
import Dashboard from './DashBoard.jsx'

import { FaHome } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { BiAddToQueue } from 'react-icons/bi'

const SideBarContent = [
  { icon: <FaHome />, name: 'Dashboard', component: <Dashboard /> },
  { icon: <CgProfile />, name: 'Profile', component: <Dashboard /> },
  {
    icon: <BiAddToQueue />,
    name: 'Create a new project',
    component: <Dashboard />,
  },
]

const Home = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0)

  return (
    <div>
      <Navbar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          borderTop: 'solid 1px skyblue',
        }}
      >
        <SideBar
          selectedCardIndex={selectedCardIndex}
          setSelectedCardIndex={setSelectedCardIndex}
          SideBarContent={SideBarContent}
        />
        <div
          style={{
            backgroundColor: 'white',
            display: 'flex',
            flex: 5,
            height: '93vh',
          }}
        >
          {SideBarContent[selectedCardIndex]?.component}
        </div>
      </div>
    </div>
  )
}

export default Home
