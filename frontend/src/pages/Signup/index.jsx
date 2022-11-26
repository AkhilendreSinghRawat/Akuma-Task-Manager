import React, { useRef } from 'react'

const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}
    >
      sadklf
      {/* <form className="Form" onSubmit={() => {}}>
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
      </form> */}
    </div>
  )
}

export default Signup
