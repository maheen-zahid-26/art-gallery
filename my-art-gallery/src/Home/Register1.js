import React from "react";
import { useNavigate } from "react-router-dom";
import "./Register1.css";

const Register1 = () => {
  const navigate = useNavigate();

  const handleLogin = (role) => {
    switch (role) {
      case "customer":
        navigate("/register-customer");
        break;
      case "artist":
        navigate("/register-artist");
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
            Register as Customer
          </button>
        </div>
        <div className="role-item">
          <img className="pic" src="/artist.jpg" alt="Artist" />
          <button onClick={() => handleLogin("artist")} className="role-button" id="button2">
            Register as Artist
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register1;