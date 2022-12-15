import React from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { FaHome } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { BiAddToQueue } from 'react-icons/bi'
import { setSelectedCardIndex } from '../../redux/slices/sideBarSlice'

const SideBarContent = [
  {
    name: 'Dashboard',
    icon: <FaHome />,
  },
  {
    name: 'Profile',
    icon: <CgProfile />,
  },
  {
    name: 'Create a new project',
    icon: <BiAddToQueue />,
  },
]

const SideBar = () => {
  const dispatch = useDispatch()
  const { selectedCardIndex } = useSelector((state) => state.sideBarData)

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
              dispatch(setSelectedCardIndex(index))
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
