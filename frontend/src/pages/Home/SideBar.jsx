import React from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { FaHome } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { BiAddToQueue } from 'react-icons/bi'
import { setSelectedCardIndex } from '../../redux/slices/sideBarSlice'

const SideBarContent = [
  {
    index: 0,
    name: 'Dashboard',
    icon: <FaHome />,
  },
  {
    index: 1,
    name: 'Profile',
    icon: <CgProfile />,
  },
]

const dashboardSidebarContent = [
  {
    index: 2,
    name: 'Create a new project',
    icon: <BiAddToQueue />,
  },
]

const projectSidebarContent = [
  {
    index: 3,
    name: 'Add a new task',
    icon: <BiAddToQueue />,
  },
]

let displaySidebarContent = []

const SideBar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedCardIndex, isHomePage } = useSelector(
    (state) => state.sideBarData
  )

  if (selectedCardIndex === 0) {
    displaySidebarContent = isHomePage
      ? dashboardSidebarContent
      : projectSidebarContent
  }

  const JSX = ({ content }) => (
    <div
      key={content.index}
      className={`SideBarContentCard ${
        content.index === selectedCardIndex && 'colorHightlightCard'
      }`}
      onClick={() => {
        dispatch(setSelectedCardIndex(content.index))
        if (content.index === 1) navigate('/home')
      }}
    >
      <div
        className={`SideBarContentCardIcon ${
          content.index === selectedCardIndex && 'colorHightlightCardContent'
        }`}
      >
        {content?.icon}
      </div>
      <div
        className={`SideBarContentCardName  ${
          content.index === selectedCardIndex && 'colorHightlightCardContent'
        }`}
      >
        {content?.name}
      </div>
    </div>
  )

  return (
    <div className="SideBarContentMainContainer">
      {SideBarContent?.map((content) => (
        <JSX key={content.index} content={content} />
      ))}
      <div className="grayLine" />
      {selectedCardIndex === 0 &&
        displaySidebarContent?.map((content) => (
          <JSX key={content.index} content={content} />
        ))}
    </div>
  )
}

export default SideBar
