import React from 'react'
import Footer from '../../utils/Footer'
import Navbar from '../../utils/Navbar'
import VisitorsPageCard from './VisitorsPageCard'

const VisitorsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="visitorsPageCardsContainer">
        <VisitorsPageCard
          textHeading={'Welcome to Akuma!'}
          textDiscription={
            'A space where you can easily manage all your projects.'
          }
          buttonText={'Sign Up'}
        />
        <VisitorsPageCard
          textHeading={'What can Akuma do?'}
          textDiscription={
            'Akuma is reimaging how project management can be done. By streamlining the process and giving you a place to keep track of all of your projects, you no longer need to go anywhere else to keep track of your work.'
          }
          listPoints={true}
          buttonText={'Log In'}
        />
      </div>
      <Footer />
    </div>
  )
}

export default VisitorsPage
