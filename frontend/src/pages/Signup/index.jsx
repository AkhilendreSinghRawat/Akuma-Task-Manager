import React, { useRef, useState } from 'react'

import { toast } from 'react-toastify'
import { Dna } from 'react-loader-spinner'
import { PasswordValidator } from '../../utils/PasswordValidator'

import Navbar from '../../utils/Navbar'
import axios from '../../utils/axios'
import Footer from '../../utils/Footer'

const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const [loader, setLoader] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!PasswordValidator(passwordRef?.current?.value)) return
    if (passwordRef?.current?.value !== confirmPasswordRef?.current?.value) {
      toast.error("Passwords Didn't Match!")
      return
    }
    setLoader(true)

    axios
      .post('/register', {
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success('Successfully Registered')
          navigate('/signin')
        } else {
          toast.error('Something went wrong!')
        }
        setLoader(false)
      })
      .catch((err) => {
        toast.error(err?.response?.data.message)
        setLoader(false)
      })
  }

  return (
    <div style={{ height: '89vh' }}>
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
          <label>ConfirmPassword</label>
          <input
            className="Input"
            id="confirmPassword"
            type="password"
            required
            ref={confirmPasswordRef}
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
              Sign Up
            </button>
          )}
          <div>Already Registered?</div>
          <a href="/signin">Sign In</a>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Signup
