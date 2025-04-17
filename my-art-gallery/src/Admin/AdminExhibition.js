import React, { useState, useEffect } from 'react';
import './AdminCustomerDetails.css';

function AdminExhibition() {
  const exhibitions = ["painting_exhibit", "annual_art_exhibition", "art_exhibit", "art_exhibition"];
  const [ParticipantData, setParticipantData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataPromises = exhibitions.map((exhibition) =>
          fetch(`http://localhost:9000/admin/exhibitionDetails?name=${exhibition}`)
            .then(response => response.json())
        );

        const results = await Promise.all(dataPromises);

        const newParticipantData = {};
        results.forEach((data, index) => {
          if (data && data.data) {
            newParticipantData[exhibitions[index]] = data.data;
          } else {
            console.error(`Expected an array of customer objects but received for ${exhibitions[index]}:`, data);
            newParticipantData[exhibitions[index]] = [];
          }
        });
        setParticipantData(newParticipantData);
      } catch (error) {
        console.error("Error fetching participant details:", error);
        setError("Failed to fetch participant details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },);

  return (
    <div className="customer-table-container">
      <h1>EXHIBITION PARTICIPANTS DATA</h1><br></br>
      {loading && <p>Loading data...</p>}
      {error && <p>{error}</p>}
      {exhibitions.map((exhibition) => (
        <div key={exhibition}>
          <h2>{exhibition.replace(/_/g, " ").toUpperCase()}</h2>
          {ParticipantData[exhibition] && ParticipantData[exhibition].length > 0 ? (
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
                {ParticipantData[exhibition].map((participant) => (
                  <tr key={participant.id}>
                    <td>{participant.id}</td>
                    <td>{participant.name}</td>
                    <td>{participant.username}</td>
                    <td>{participant.mobile}</td>
                    <td>{participant.email}</td>
                    <td>{participant.dateOfBirth}</td>
                    <td>{participant.address}</td>
                    <td>{participant.city}</td>
                    <td>{participant.state}</td>
                    <td>{participant.country}</td>
                    <td><img src={`http://localhost:9000/${participant.photo}`} alt="Customer" className="customer-photo" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No participant details available for this exhibition.</p>
          )} <br></br>
        </div>
      ))}
    </div>
  );
}

export default AdminExhibition;
