import React from 'react'
import { useNavigate } from 'react-router-dom'
import reactLogo from '../assets/react.svg'

const Navbar = ({ visitorsPage = false }) => {
  const navigate = useNavigate()

  const user = localStorage.getItem('token')
  const handleLogout = () => {
    localStorage.clear()
    navigate('/signin')
  }

  return (
    <div className="navbarContainer">
      <div
        onClick={() => {
          navigate('/')
        }}
        className="navbarLeftSideContainer"
      >
        <img src={reactLogo} className="logo react" alt="React logo" />
        <div className="navbarHeading">Akuma</div>
      </div>
      <div className="navbarRightSideContainer">
        {user ? (
          <div
            onClick={() => {
              visitorsPage ? navigate('/home') : handleLogout()
            }}
            className="button"
          >
            {visitorsPage ? 'Get Started!' : 'Sign Out'}
          </div>
        ) : (
          <>
            <div
              onClick={() => {
                navigate('/signin')
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
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
