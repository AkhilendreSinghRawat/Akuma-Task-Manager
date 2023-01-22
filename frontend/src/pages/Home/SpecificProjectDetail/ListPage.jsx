import React from 'react'

import { DragDropContext } from 'react-beautiful-dnd'

import CardHolderPage from './CardHolderPage'

const ListPage = ({ projectData, setProjectData }) => {
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) {
      return
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const start = projectData.columns[source.droppableId]
    const finish = projectData.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(column.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...column,
        taskIds: newTaskIds,
      }

      const newState = {
        ...projectData,
        columns: {
          ...projectData.columns,
          [newColumn.id]: newColumn,
        },
      }
      setProjectData((prev) => ({ ...prev, data: newState }))
      return
    }

    const startTaskIds = Array.from(start.taskIds)
    startTaskIds.splice(source.index, 1)
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finish.taskIds)
    finishTaskIds.splice(destination.index, 0, draggableId)
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...projectData,
      columns: {
        ...projectData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    }
    setProjectData((prev) => ({ ...prev, data: newState }))
  }

  return (
    <div
      className="ListPageContainer"
      style={{
        maxWidth: '83.3vw',
        display: 'flex',
        overflow: 'auto',
        maxHeight: '70vh',
        borderBottom: '1px solid black',
      }}
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <div
          style={{
            display: 'flex',
            height: '100%',
          }}
        >
          {projectData?.columnOrder.map((columnId, index) => {
            const column = projectData?.columns[columnId]
            const tasks = column?.taskIds?.map(
              (taskId) => projectData?.tasks[taskId]
            )
            return (
              <CardHolderPage key={column?.id} column={column} tasks={tasks} />
            )
          })}
        </div>
      </DragDropContext>
    </div>
  )
}

export default ListPage
