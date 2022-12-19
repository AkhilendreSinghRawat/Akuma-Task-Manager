import React from 'react'

import { GrAdd } from 'react-icons/gr'
import { Rnd } from 'react-rnd'

import CardHolderPage from './CardHolderPage'

const ListPage = ({ projectData }) => {
  const handleAddListClick = () => {}

  // let x = -290

  return (
    <div
      className="ListPageContainer"
      style={{
        backgroundColor: '#dddd',
        maxWidth: '83.3vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        overflowX: 'scroll',
      }}
    >
      {Object.keys(projectData)
        ?.sort()
        .map((item, index) => {
          // x += 290
          return (
            // <Rnd
            //   key={index}
            //   style={{
            //     position: 'relative',
            //     display: 'flex',
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //   }}
            //   enableResizing={false}
            //   dragAxis="x"
            //   default={{
            //     x: x,
            //     y: 0,
            //   }}
            // >
            <CardHolderPage
              key={index}
              id={projectData[item]?.id}
              name={projectData[item]?.name}
            />
            // </Rnd>
          )
        })}
      <div onClick={handleAddListClick} style={{}} className="AddListCss">
        <GrAdd />
      </div>
    </div>
  )
}

export default ListPage
