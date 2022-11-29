import React from 'react'

const ProjectDataCard = ({ heading, discription }) => {
  return (
    <div className="ProjectDataCardContainer boxShadow">
      <div className="ProjectDataCardDataContainer">
        <div className="ProjectDataCardHeading">{heading}</div>
        <div className="ProjectDataCardDiscription">{discription}</div>
      </div>
    </div>
  )
}

export default ProjectDataCard
