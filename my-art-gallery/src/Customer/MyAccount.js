import React, { useState, useEffect } from "react";
import './MyAccount.css';

const MyAccount = ({ username }) => {
    const [error, setError] = useState("");
    const [customerDetails, setCustomerDetails] = useState(null);


    useEffect(() => {
        const fetchCustomerDetails = async () => {
            if (!username) return; 
            try {
                const response = await fetch(`http://localhost:9000/customers/account?username=${username}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const result = await response.json();
                if (response.ok) {
                    setCustomerDetails(result.data); 
                    console.log("Customer details fetched!");
                } else {
                    setError(result.message || "No Customer Found");
                }
            } catch (err) {
                setError("An error occurred while fetching the customer details.");
                console.error("Fetch customer details error:", err);
            }
        };

        fetchCustomerDetails(); 
    }, [username]);


   
    return (
        <div className="background">
            <div className="my-account-container">
                <h2 className="h2">My Account</h2>
                {error && <p className="error-message">{error}</p>}

                {customerDetails && (
                    <div className="profile-section">
                        <div className="profile-text">
                            <p><strong>Username:</strong> {customerDetails.username}</p>
                            <p><strong>Name:</strong> {customerDetails.name}</p>
                            <p><strong>Email:</strong> {customerDetails.email}</p>
                            <p><strong>Mobile:</strong> {customerDetails.mobile}</p>
                            <p><strong>Date of Birth:</strong> {customerDetails.dob}</p>
                            <p><strong>Address Line 1:</strong> {customerDetails.address1}</p>
                            <p><strong>Address Line 2:</strong> {customerDetails.address2}</p>
                            <p><strong>City:</strong> {customerDetails.city}</p>
                            <p><strong>State:</strong> {customerDetails.state}</p>
                            <p><strong>Country:</strong> {customerDetails.country}</p>
                        </div>
                        <img  src={`http://localhost:9000/${customerDetails.photo}`} alt="Profile" className="imgg" />
                    </div>
                    
                )}
            

            </div>
        </div>
    );
};

export default MyAccount;
