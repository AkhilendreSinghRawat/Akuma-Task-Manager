import React from 'react'

import Navbar from '../../utils/Navbar'
import SideBar from './SideBar'

const Home = () => {
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
        <SideBar />
        <div
          style={{
            backgroundColor: 'white',
            display: 'flex',
            flex: 5,
            height: '93vh',
          }}
        ></div>
      </div>
    </div>
  )
}

export default Home
