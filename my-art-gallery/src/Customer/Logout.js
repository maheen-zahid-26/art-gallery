import React from 'react';
import './Logout.css';

const Logout = ({ username,onConfirm, onCancel }) => {
    const handleConfirm = async () => {
        try {
          const response = await fetch(`http://localhost:9000/customers/logoutCustomer?username=${username}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
            });

            if (response.ok) {
                console.log("Logout successful");
                onConfirm(); 
            } else {
                console.error("Logout failed");
            }
        } catch (error) {
            console.error("An error occurred while logging out:", error);
        }
    };

    return (
      <div className='logout'>
        <div className="logout-container">
            <h2>Are you sure you want to log out?</h2>
            <button onClick={handleConfirm} className="logout-button">Yes, Logout</button>
            <button onClick={onCancel} className="logout-button">Cancel</button>
        </div>
      </div>
    );
};

export default Logout;

