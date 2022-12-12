import React, { useState } from 'react'

const SideBar = ({
  selectedCardIndex,
  setSelectedCardIndex,
  SideBarContent,
}) => {
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
