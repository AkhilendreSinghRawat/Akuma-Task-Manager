import React from 'react'
import { RiFileCopyLine } from 'react-icons/ri'
import { TiTick } from 'react-icons/ti'
import { Draggable } from 'react-beautiful-dnd'

const TaskCardPage = ({ task, index }) => {
  const [copyClicked, setCopyClicked] = React.useState(false)
  const handleCopyId = () => {
    console.log(window.location.href)
    setCopyClicked(true)
    navigator.clipboard.writeText(window.location.href)
    setTimeout(() => {
      setCopyClicked(false)
    }, 2000)
  }
  return (
    <Draggable draggableId={task?.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className="boxShadow"
            style={{
              backgroundColor: snapshot.isDragging ? 'lightgreen' : 'white',
              margin: 10,
              userSelect: 'none',
              textOverflow: 'ellipsis',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '30px 20px',
                }}
              >
                {task?.name}
              </div>
              {copyClicked ? (
                <TiTick className="ticketClicked" />
              ) : (
                <RiFileCopyLine
                  title="Copy Ticket Url"
                  className="ticketCopy"
                  onClick={handleCopyId}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskCardPage
