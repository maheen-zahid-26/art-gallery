import React, { useState, useEffect } from 'react';
import './AdminSales.css';

function AdminSales() {
  const [soldItems, setSoldItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/admin/soldItems')
      .then(response => response.json())
      .then(data => {
        console.log("Fetched sold items:", data); 

        if (data && data.data && Array.isArray(data.data)) {
          setSoldItems(data.data); 
        } else {
          console.error("Expected an array under 'data' but received:", data.data);
          setSoldItems([]); 
        }
      })
      .catch(error => {
        console.error("Error fetching sold items!", error);
      });
  }, []);

  return (
    <div className="sales-table-container">
      <h1>Sold Items</h1>
      <table className="sales-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Type</th>
            <th>Category</th>
            <th>Price</th>
            <th>Artist Name</th>
            <th>Picture</th>
            <th>Sold Date</th>
          </tr>
        </thead>
        <tbody>
          {soldItems.length > 0 ? (
            soldItems.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.Title}</td>
                <td>{item.Type}</td>
                <td>{item.Category}</td>
                <td>{item.Price}</td>
                <td>{item.ArtistName}</td>
                <td>
                  {item.Picture && <img src={`http://localhost:9000/${item.Picture}`} alt={item.Title} className="sold-item-picture" />}
                </td>
                <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No sold items available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminSales;
