import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import TaskCardPage from './TaskCardPage'

const CardHolderPage = ({ column, tasks }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100%',
        minWidth: '250px',
        boxShadow: '2px 2px 5px 5px rgba(0, 0, 0, 0.2)',
        margin: '1vh 1vw',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          textTransform: 'uppercase',
          backgroundColor: 'skyblue',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '2px',
          userSelect: 'none',
        }}
      >
        {column?.name}
      </div>
      <Droppable droppableId={column?.id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              backgroundColor: snapshot.isDraggingOver ? 'skyblue' : 'white',
              transition: 'background-color 0.2s ease-in-out',
              flexGrow: 1,
              minHeight: '100px',
              width: '250px',
            }}
          >
            {tasks?.map((task, index) => (
              <TaskCardPage key={task?.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default CardHolderPage
