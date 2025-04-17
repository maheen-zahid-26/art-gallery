import React, { useState, useEffect } from 'react';
import './AdminCustomerDetails.css';

function AdminCustomerDetails() {
  const [customers, setCustomers] = useState([]); 

  useEffect(() => {
    fetch('http://localhost:9000/admin/customersDetails')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched customer details:", data); 
        if (data && data.data) { 
          setCustomers(data.data);
        } else {
          console.error("Expected an array of customer objects but received:", data);
          setCustomers([]); 
        }
      })
      .catch(error => {
        console.error("Error fetching customer details!", error);
      });
  }, []);

  return (
    <div className="customer-table-container">
      <h1>Customer Details</h1>
      {customers.length > 0 ? (
        <table className="customer-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Username</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.username}</td>
                <td>{customer.mobile}</td>
                <td>{customer.email}</td>
                <td>{customer.dob}</td>
                <td>{customer.address1} {customer.address2}</td>
                <td>{customer.city}</td>
                <td>{customer.state}</td>
                <td>{customer.country}</td>
                <td><img src={`http://localhost:9000/${customer.photo}`} alt="Customer" className="customer-photo" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No customer details available.</p>
      )}
    </div>
  );
}

export default AdminCustomerDetails;
