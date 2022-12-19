import React from 'react'

const CardHolderPage = ({ id, name }) => {
  const [drag, setDrag] = React.useState(false)

  const handleDragStart = (e) => {
    setDrag(true)

    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', this.innerHTML)
  }
  const handleDragEnd = (e) => {
    setDrag(false)
  }
  // const handleDragEnter = (e) => {
  //   setDrag(false)
  // }
  // const handleDragLeave = (e) => {
  //   setDrag(false)
  // }
  const handleDragOver = (e) => {
    e.preventDefault()
    return false
  }
  const handleDrop = (e) => {
    e.stopPropagation()

    console.log(
      '🚀 ~ file: CardHolderPage.jsx:30 ~ handleDrop ~ aa',
      e.dataTransfer.getData('text/html')
    )

    return false
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100%',
        minWidth: '250px',
        minHeight: '60vh',
        boxShadow: '2px 2px 5px 5px rgba(0, 0, 0, 0.2)',
        margin: '1vh 1vw',
        display: 'flex',
        justifyContent: 'center',
        ...(drag
          ? {
              opacity: '0.4',
            }
          : { opacity: '1' }),
      }}
      draggable
      onDragStart={(e) => handleDragStart(e)}
      onDragEnd={(e) => handleDragEnd(e)}
      // onDragEnter={(e) => handleDragEnter(e)}
      // onDragLeave={(e) => handleDragLeave(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e)}
      // onDrag={() => {
      //   setDrag(true)
      // }}
      // onDragEnd={() => {
      //   setDrag(false)
      // }}
      // onDragOver={(event) => {
      //   console.log(event)
      // }}
    >
      sdfgdfg
      <div style={{ textTransform: 'uppercase' }}>{name}</div>
    </div>
  )
}

export default CardHolderPage
