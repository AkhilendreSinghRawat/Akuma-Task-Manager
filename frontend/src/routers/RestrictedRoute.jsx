import React from 'react'

import { Navigate } from 'react-router-dom'
import Auth from '../utils/Auth'

const RestrictedRoute = ({ children }) => {
  const auth = Auth()

  return auth ? <Navigate to="/home" /> : children
}

export default RestrictedRoute
