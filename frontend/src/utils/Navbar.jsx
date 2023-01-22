import React from 'react'

import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import reactLogo from '../assets/react.svg'
import axios from './axios'
import { useDispatch, useSelector } from 'react-redux'
import { setProjectSearchName } from '../redux/slices/searchNavbarSlice'

const Navbar = ({ visitorsPage = false }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { selectedCardIndex, isHomePage } = useSelector(
    (state) => state.sideBarData
  )

  const user = localStorage.getItem('token')
  const handleLogout = () => {
    localStorage.clear()
    // axios.delete('/logout')
    toast.success('Successfully Logged out')
    navigate('/signin')
  }

  const handleInputChange = (e) => {
    dispatch(setProjectSearchName(e.target.value.trim().toLowerCase()))
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
      {isHomePage && selectedCardIndex === 0 && !visitorsPage && (
        <div style={{ display: 'flex', flex: 1 }}>
          <input
            type={'search'}
            style={{
              flex: 1,
              border: '1px solid lightgray',
              height: '30px',
              outline: 'none',
            }}
            onChange={handleInputChange}
          />
        </div>
      )}
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
