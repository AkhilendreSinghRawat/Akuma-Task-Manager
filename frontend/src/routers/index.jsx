import React from 'react'
import ProtectedRoutes from './ProtectedRoute'
import { Routes, Route } from 'react-router-dom'
import RestrictedRoute from './RestrictedRoute'
import VisitorsPage from '../pages/VisitorsPage'
import Signup from '../pages/Signup'
import Login from '../pages/Login'

const Routing = () => {
  return (
      <Routes>
        <Route path="/" exact element={<VisitorsPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
  )
}

export default Routing
