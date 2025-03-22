import React, { useRef, useState } from "react";

import { toast } from "react-toastify";
import { Dna } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

import axios from "../../utils/axios";
import Navbar from "../../utils/Navbar";
import Footer from "../../utils/Footer";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const res = await axios.post("/auth/login", {
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
      });

      if (res.status === 200) {
        localStorage.setItem(
          "token",
          JSON.stringify({
            accessToken: res?.data?.accessToken,
            refreshToken: res?.data?.refreshToken,
          })
        );
        navigate("/home");
        toast.success("Successfully Logged In");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="componenetHeight">
      <Navbar visitorsPage />
      <div className="FormContainer">
        <form className="Form" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            className="Input"
            id="email"
            type="email"
            required
            value={"test@test.com"}
            ref={emailRef}
          />
          <label>Password</label>
          <input
            className="Input"
            id="password"
            type="password"
            required
            value={"Akhilendre@321"}
            ref={passwordRef}
          />
          {loader ? (
            <Dna
              visible={true}
              height="35"
              width="100"
              ariaLabel="dna-loading"
              wrapperStyle={{
                width: "100%",
                backgroundColor: "darkcyan",
                borderRadius: "0.5vw",
                margin: "1vh 0",
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
      <Footer />
    </div>
  );
};

export default Login;
