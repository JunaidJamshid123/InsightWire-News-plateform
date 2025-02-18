"use client"

import { useState } from "react"
import { FaGoogle, FaTimes, FaEye, FaEyeSlash } from "react-icons/fa"
import "./Signup.css"

const Signup = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSignup = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    console.log("Signup:", { userName, email, password })
    // Here you would typically call your API to register the user
  }

  const handleGoogleSignup = () => {
    console.log("Google signup clicked")
    // Implement Google signup logic here
  }

  if (!isOpen) return null

  return (
    <div className="signup-overlay" onClick={onClose}>
      <div className="signup-dialog" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="signup-header">
          <h2>Create an Account</h2>
          <p>Join us to stay informed with the latest news</p>
        </div>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              id="userName"
              placeholder="Choose a username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-group">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
        </form>
        <div className="separator">
          <span>or sign up with</span>
        </div>
        <button onClick={handleGoogleSignup} className="google-signup-button">
          <FaGoogle className="google-icon" />
          Sign up with Google
        </button>
        <div className="login-link">
          Already have an account? <a href="#login">Log in</a>
        </div>
      </div>
    </div>
  )
}

export default Signup

