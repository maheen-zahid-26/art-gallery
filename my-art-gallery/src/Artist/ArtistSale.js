import React, { useState, useEffect } from 'react';
import './ArtistSale.css'; 

function ArtistSale({ username }) {
  const [artist, setArtist] = useState(null);
  const [soldItems, setSoldItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:9000/admin/artistsDetails?username=${username}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.data) {
          const foundArtist = data.data.find(artist => artist.username === username);
          setArtist(foundArtist);
        }
      })
      .catch(error => console.error("Error fetching artist details:", error));


    fetch('http://localhost:9000/admin/soldItems')
      .then(response => response.json())
      .then(data => {
        if (data && Array.isArray(data.data)) {
          setSoldItems(data.data);
        }
      })
      .catch(error => console.error("Error fetching sold items:", error));
  }, [username]);


  const artistSoldItems = artist
    ? soldItems.filter(item => item.ArtistName === artist.name)
    : [];

  return (
    <div className="artist-sale-container">
      <h1 className="artist-sale-header">Sales for {username}</h1>
      {artist ? (
        artistSoldItems.length > 0 ? (
          <table className="artist-sale-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Type</th>
                <th>Category</th>
                <th>Price</th>
                <th>Sold Date</th>
              </tr>
            </thead>
            <tbody>
              {artistSoldItems.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.Title}</td>
                  <td>{item.Type}</td>
                  <td>{item.Category}</td>
                  <td>{item.Price}</td>
                  <td>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-sales-message">No sales found for this artist.</p>
        )
      ) : (
        <p className="no-sales-message">Loading artist details...</p>
      )}
    </div>
  );
}

export default ArtistSale;
