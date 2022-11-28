import React from 'react'
import { useNavigate } from 'react-router-dom'

const VisitorsPageCard = ({
  textHeading = '',
  textDiscription = '',
  listPoints = false,
}) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => {
        navigate('/signin')
      }}
      className="visitorsPageCardContainer"
    >
      <div className="visitorsPageCardTextHeading">{textHeading}</div>
      <div className="visitorsPageCardTextDiscription">{textDiscription}</div>
      {listPoints && (
        <div>
          <ul>
            <li> Create a project.</li>
            <li> Add tasks.</li>
            <li> Get projects done.</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default VisitorsPageCard
