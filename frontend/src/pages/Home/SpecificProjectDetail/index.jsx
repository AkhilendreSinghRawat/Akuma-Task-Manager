import React from 'react'
import Navbar from '../../../utils/Navbar';
import SideBar from '../SideBar';

const SpecificProjectDetail = () => {
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
        <SideBar
          // selectedCardIndex={selectedCardIndex}
          // setSelectedCardIndex={setSelectedCardIndex}
          // SideBarContent={SideBarContent}
        />
        <div></div>
      </div>
    </div>
  )
}

export default SpecificProjectDetail
