import React, { useState, useEffect } from 'react';
import "./ArtistDeleteWork.css";

function ArtistDeleteWork({ username }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      if (!username) return;
      setLoading(true); 
      try {
        const response = await fetch(`http://localhost:9000/artists/artworks?username=${username}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const result = await response.json();
        if (response.ok) {
          setArtworks(result.data); 
          console.log("Artworks fetched successfully!", result.data);
        } else {
          setError(result.message || "No Artworks Found");
        }
      } catch (err) {
        setError("An error occurred while fetching artworks.");
        console.error(err);
      } finally {
        setLoading(false); 
      }
    };

    fetchArtworks();
  }, [username]);

  const handleDelete = async (artworkId) => {
    try {
      const response = await fetch(`http://localhost:9000/artists/deleteArtworks?id=${artworkId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        setArtworks(artworks.filter(artwork => artwork.id !== artworkId));
        console.log("Artwork deleted successfully!");
      } else {
        const result = await response.json();
        setError(result.message || "Failed to delete artwork");
      }
    } catch (err) {
      setError("An error occurred while deleting artwork.");
      console.error(err);
    }
  };

  return (
    <div className='deleteArtwork'>
      <div className="artist-delete-work">
        {error && <p className="error">{error}</p>}
        {loading ? (
          <p>Loading artworks...</p>
        ) : artworks.length > 0 ? (
          <div className="artworks-grid">
            {artworks.map((artwork) => (
              <div key={artwork.id} className="artwork-card">
                <img src={`http://localhost:9000/${artwork.Picture}`} alt={artwork.Title} className="artwork-image" />
                <h4>{artwork.Title}</h4>
                <p><strong>Category:</strong> {artwork.Category}</p>
                <p><strong>Type:</strong> {artwork.Type}</p>
                <p><strong>Price:</strong> Rs.{artwork.Price}</p>
                <button onClick={() => handleDelete(artwork.id)} className="delete-button">Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No artworks available.</p>
        )}
      </div>
    </div>
  );
}

export default ArtistDeleteWork;
