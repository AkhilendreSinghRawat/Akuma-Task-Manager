import React from 'react'

import CardHolderPage from './CardHolderPage'

const ListPage = () => {
  return (
    <div
      style={{
        backgroundColor: '#ddd',
        height: '100%',
        maxWidth: '83.3vw',
        minHeight: 'fit-content',
        border: 'solid 1px lightgray',
        display: 'flex',
        overflowX: 'scroll',
      }}
    >
      <CardHolderPage />
      <CardHolderPage />
      <CardHolderPage />
      <CardHolderPage />
    </div>
  )
}

export default ListPage
