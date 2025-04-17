import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Login.css";


const LoginArtist= () =>  {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:9000/artists/loginArtist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });

    const result = await response.json();
    if (response.ok) {
      alert("Login successful!");
      localStorage.setItem('username', credentials.username);
      localStorage.setItem('password', credentials.password);
      navigate("/dashboard-artist" , { state: { username: credentials.username , password : credentials.password }  }); 
    } else {
      setError(result.message || "Invalid username or password");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="button-group">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button
              type="reset"
              className="reset-button"
              onClick={() => {
                setCredentials({ username: "", password: "" });
                setError("");
              }}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginArtist;
