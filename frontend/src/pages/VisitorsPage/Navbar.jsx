import React from 'react'
import { useNavigate } from 'react-router-dom'
import reactLogo from '../../assets/react.svg'

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <div className="navbarContainer">
      <div className="navbarLeftSideContainer">
        <img src={reactLogo} className="logo react" alt="React logo" />
        <div className="navbarHeading">Akuma</div>
      </div>
      <div className="navbarRightSideContainer">
        <div
          onClick={() => {
            navigate('/login')
          }}
          className="button"
        >
          Log In
        </div>
        <div
          onClick={() => {
            navigate('/signup')
          }}
          className="button"
        >
          Sign Up
        </div>
      </div>
    </div>
  )
}

export default Navbar
