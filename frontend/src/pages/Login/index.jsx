import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Dna } from 'react-loader-spinner'

import axios from '../../utils/axios'
import Navbar from '../../utils/Navbar'

const Login = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const [loader, setLoader] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    setLoader(true)
    
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
        } else {
          toast.error('Something went wrong!')
        }
        setLoader(false)
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message)
        setLoader(false)
      })
  }

  return (
    <div className="componenetHeight">
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
          {loader ? (
            <Dna
              visible={true}
              height="35"
              width="100"
              ariaLabel="dna-loading"
              wrapperStyle={{
                width: '100%',
                backgroundColor: 'darkcyan',
                borderRadius: '0.5vw',
                margin: '1vh 0',
              }}
              wrapperClass="dna-wrapper"
            />
          ) : (
            <button className="Submit" type="submit">
              Sign In
            </button>
          )}
          <div>Not Registered?</div>
          <a href="/signup">Sign Up</a>
        </form>
      </div>
    </div>
  )
}

export default Login
