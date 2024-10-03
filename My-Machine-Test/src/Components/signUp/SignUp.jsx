// import React from 'react'
// import { Link } from "react-router-dom"
import "./signUp.css";


const SignUp = () => {
  return (
  <div className="signup-container"> 
    <h2>Sign Up</h2>
    <form>
      <label htmlFor="name">Name</label>
        <input type="text" className="inputBoxStyle" id="name" name="name" placeholder="Enter full name" required/>
        <label htmlFor="email">Email Address</label>
        <input type="email" className="inputBoxStyle" id="email" name="email" placeholder="Enter your email" required/>
       <label htmlFor="password">Password</label>
       <input type="password" className="inputBoxStyle" id="password" name="password" placeholder="Create a password" required/>
       <button type="submit" className="signup-button">Sign Up</button>
    </form>
    <div className="already-exist">
      <p>
        Already have an account?
        <a href="/">Login</a>
      </p>
    </div>
  </div>
  )}

export default SignUp