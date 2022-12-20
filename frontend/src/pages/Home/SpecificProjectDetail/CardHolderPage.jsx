import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskCardPage from './TaskCardPage'

const CardHolderPage = ({ column, tasks, index }) => {
  return (
    <Draggable draggableId={column?.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
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
            {...provided.dragHandleProps}
            style={{
              textTransform: 'uppercase',
              backgroundColor: 'skyblue',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              padding: '2px',
            }}
          >
            {column?.name}
          </div>
          <Droppable droppableId={column?.id} type="task">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  backgroundColor: snapshot.isDraggingOver
                    ? 'skyblue'
                    : 'white',
                  transition: 'background-color 0.2s ease-in-out',
                  flexGrow: 1,
                  minHeight: '150px',
                  width: '100%',
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
      )}
    </Draggable>
  )
}

export default CardHolderPage
