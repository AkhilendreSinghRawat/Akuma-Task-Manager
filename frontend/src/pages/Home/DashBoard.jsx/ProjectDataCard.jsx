import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProjectDataCard = ({ projectId, heading, discription }) => {
  const navigate = useNavigate()

  const handleProjectClick = () => {
    navigate(`/home/project/:${projectId}/:${heading}`)
  }

  return (
    <div
      onClick={handleProjectClick}
      className="ProjectDataCardContainer boxShadow"
    >
      <div className="ProjectDataCardDataContainer">
        <div className="ProjectDataCardHeading">{heading}</div>
        <div className="ProjectDataCardDiscription">{discription}</div>
      </div>
    </div>
  )
}

export default ProjectDataCard
