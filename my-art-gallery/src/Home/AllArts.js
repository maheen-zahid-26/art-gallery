// AllArts.js
import React, { useEffect, useState } from 'react';
import './AllArts.css';

function AllArts() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:9000/homePage/getArtworks')
      .then(response => response.json())
      .then(data => setArtworks(data))
      .catch(error => console.error('Error fetching artworks:', error));
  }, []);

  return (
    <div className='AllArts'>
    <div className="all-arts-container">
      {artworks.length > 0 ? (
        artworks.map((artwork) => (
          <div key={artwork.id} className="artwork-card">
            <img 
              src={`http://localhost:9000/${artwork.Picture}`} 
              alt={artwork.Title} 
              className="artwork-image"
            />
            <h3 className="artwork-title">{artwork.Title}</h3>   
          </div>
        ))
      ) : (
        <p>No artworks available.</p>
      )}
    </div>
  </div>
  );
}

export default AllArts;
