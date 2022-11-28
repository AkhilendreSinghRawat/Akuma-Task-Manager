import React from 'react'
import { useNavigate } from 'react-router-dom'
import reactLogo from '../assets/react.svg'

const Navbar = ({ visitorsPage = false }) => {
  const navigate = useNavigate()

  const user = localStorage.getItem('token')

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
     {visitorsPage && <div className="navbarRightSideContainer">
        {user ? (
          <div
            onClick={() => {
              navigate('/home')
            }}
            className="button"
          >
            Get Started!
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
      </div>}
    </div>
  )
}

export default Navbar
