import React from 'react'

const Dashboard = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div
        style={{
          fontSize: 'xx-large',
          color: 'darkcyan',
          margin: '2vh 2vw',
          fontWeight: 'bold',
        }}
      >
        Dashboard
      </div>
      <div
        style={{
          borderBottom: 'solid 1px lightgray',
          margin: '1vh 1vw',
        }}
      />
    </div>
  )
}

export default Dashboard
