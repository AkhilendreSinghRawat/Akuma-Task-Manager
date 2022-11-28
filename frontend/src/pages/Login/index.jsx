import React, { useRef } from 'react'
import { toast } from 'react-toastify'

import axios from '../../utils/axios'
import Navbar from '../../utils/Navbar'

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .post('/login', {
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
      })
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem(
            'token',
            JSON.stringify({
              accessToken: res?.data?.accessToken,
              refreshToken: res?.data?.refreshToken,
            })
          )
          toast.success('Successfully Logged In')
          navigate('/home')
          return
        }
        toast.error('Something went wrong!')
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
      })
  }

  return (
    <div style={{ height: '93vh' }}>
      <Navbar />
      <div className="FormContainer">
        <form className="Form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            className="Input"
            id="email"
            type="email"
            required
            ref={emailRef}
          />
          <label>Password</label>
          <input
            className="Input"
            id="password"
            type="password"
            required
            ref={passwordRef}
          />
          <button className="Submit" type="submit">
            Sign In
          </button>
          <div>Not Registered?</div>
          <a href="/signup">Sign Up</a>
        </form>
      </div>
    </div>
  )
}

export default Login
