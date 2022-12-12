import React from 'react'

import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import RestrictedRoute from './RestrictedRoute'

import VisitorsPage from '../pages/VisitorsPage'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/Home'
import SpecificProjectDetail from '../pages/Home/SpecificProjectDetail'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Routing = () => {
  return (
    <div>
      <div aria-live="polite" aria-label="toast message">
        <ToastContainer role="alert" ariaLabel="toast" theme="colored" />
      </div>
      <Routes>
        <Route path="/" exact element={<VisitorsPage />} />
        <Route
          path="/signup"
          element={
            <RestrictedRoute>
              <Signup />
            </RestrictedRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <RestrictedRoute>
              <Login />
            </RestrictedRoute>
          }
        />
        <Route
          path="/home"
          exact
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default Routing
