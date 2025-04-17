import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login1.css";

const Login1 = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    switch (role) {
      case "customer":
        navigate("/login-customer");
        break;
      case "artist":
        navigate("/login-artist");
        break;
      case "admin":
        navigate("/login-admin");
        break;
      default:
        break;
    }
  };

  return (
    <div className="login1-page-container">
      <div className="role-options">
        <div className="role-item">
          <img className="pic" src="/customer.jpg" alt="Customer" />
          <button onClick={() => handleLogin("customer")} className="role-button" id="button1">
            Login as Customer
          </button>
        </div>
        <div className="role-item">
          <img className="pic" src="/artist.jpg" alt="Artist" />
          <button onClick={() => handleLogin("artist")} className="role-button" id="button2">
            Login as Artist
          </button>
        </div>
        <div className="role-item">
          <img className="pic" src="/admin.jpg" alt="Admin" />
          <button onClick={() => handleLogin("admin")} className="role-button" id="button3">
            Login as Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login1;
