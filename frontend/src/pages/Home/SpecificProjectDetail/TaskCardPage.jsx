import React from 'react'

import { Draggable } from 'react-beautiful-dnd'

const TaskCardPage = ({ task, index }) => {
  return (
    <Draggable draggableId={task?.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            style={{
              backgroundColor: snapshot.isDragging ? 'lightgreen' : 'white',
              margin: 5,
            }}
          >
            {task?.name}
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskCardPage
