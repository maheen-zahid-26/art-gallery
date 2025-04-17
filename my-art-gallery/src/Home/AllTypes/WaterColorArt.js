import React, { useEffect, useState } from 'react';

const WaterColorArt = () => {
  const [waterColorArts, setWaterColorArts] = useState([]);

  useEffect(() => {

    console.log("Fetching Water Color artworks...");

    fetch('http://localhost:9000/homePage/getArtworksByType?Type=Water Color Art')
    .then(response => {
      console.log("Response received:", response);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Data for print artworks:", data);
      setWaterColorArts(data);
    })
    .catch(error => console.error('Error fetching print art:', error));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Water Color Art</h2>
      <div style={styles.grid}>
        {waterColorArts.length > 0 ? (
          waterColorArts.map((artwork) => (
            <div key={artwork.id} style={styles.card}>
              <img src={`http://localhost:9000/${artwork.Picture}`} alt={artwork.title} style={styles.image} />
              <h3 style={styles.artworkTitle}>{artwork.Title}</h3>
              <h5 style={styles.artworkInfo}>Type: {artwork.Type}</h5>
            </div>
          ))
        ) : (
          <p>No water color artworks available.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    overflow: 'hidden',
    width: '200px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
  },
  artworkTitle: {
    padding: '10px',
    fontSize: '1.2em',
    color: '#333',
  },
  artworkInfo: {
    fontSize: '1em',
    color: '#555',
  },
};

export default WaterColorArt;
