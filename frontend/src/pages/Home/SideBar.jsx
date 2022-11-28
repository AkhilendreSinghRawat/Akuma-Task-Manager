import React, { useState } from 'react'

import { FaHome } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { BiAddToQueue } from 'react-icons/bi'

const SideBarContent = [
  { icon: <FaHome />, name: 'Dashboard' },
  { icon: <CgProfile />, name: 'Profile' },
  { icon: <BiAddToQueue />, name: 'Create a new project' },
]

const SideBar = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0)

  return (
    <div className="SideBarContentMainContainer">
      {SideBarContent?.map((content, index) => {
        return (
          <div
            key={index}
            className={`SideBarContentCard ${
              index === selectedCardIndex && 'colorHightlightCard'
            }`}
            onClick={() => {
              setSelectedCardIndex(index)
            }}
          >
            <div
              className={`SideBarContentCardIcon ${
                index === selectedCardIndex && 'colorHightlightCardContent'
              }`}
            >
              {content?.icon}
            </div>
            <div
              className={`SideBarContentCardName  ${
                index === selectedCardIndex && 'colorHightlightCardContent'
              }`}
            >
              {content?.name}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SideBar
