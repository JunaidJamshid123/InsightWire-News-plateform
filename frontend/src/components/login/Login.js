import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Input validation
  const validateInput = () => {
    if (!email || !password) {
      setError("Both email and password are required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  // Handle Login
  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (!validateInput()) return;

  setIsLoading(true);
  try {
    const response = await fetch(
      process.env.REACT_APP_API_URL || "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem("token", result.token); // Store token
      console.log(result.token);
      alert("Login successful! Redirecting to homepage...");
      navigate("/"); // Redirect to home/root
    } else {
      setError(result.message || "Login failed. Please try again.");
    }
  } catch (err) {
    console.error("Error during login:", err);
    setError("An unexpected error occurred. Please try again later.");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-heading">Login</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="form-group">
          <label htmlFor="email">Email</label>
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
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log In"}
        </button>

        <p className="signup-text">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
