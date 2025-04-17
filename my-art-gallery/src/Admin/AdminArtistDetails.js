import React, { useState, useEffect } from 'react';
import './AdminCustomerDetails.css';

function AdminArtistDetails() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/admin/artistsDetails')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched artist details:", data); 
        
        if (data && data.data && Array.isArray(data.data)) {
          setArtists(data.data);
        } else {
          console.error("Expected an array under 'data' but received:", data.data);
          setArtists([]); 
        }
      })
      .catch(error => {
        console.error("Error fetching artist details!", error);
      });
  }, []);

  return (
    <div className="customer-table-container">
      <h1>Artist Details</h1>
      <table className="customer-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>City</th>
            <th>Country</th>
            <th>State</th>
            <th>Photo</th>
          </tr>
        </thead>
        <tbody>
          {artists.length > 0 ? ( 
            artists.map((artist) => (
              <tr key={artist.id}>
                <td>{artist.id}</td>
                <td>{artist.name}</td>
                <td>{artist.username}</td>
                <td>{artist.mobile}</td>
                <td>{artist.email}</td>
                <td>{artist.dob}</td>
                <td>{artist.address1} {artist.address2}</td>
                <td>{artist.city}</td>
                <td>{artist.country}</td>
                <td>{artist.state}</td>
                <td><img src={`http://localhost:9000/${artist.photo}`} alt="Artist" className="customer-photo" /></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No artist details available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminArtistDetails;

