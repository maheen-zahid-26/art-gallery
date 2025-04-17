import React, { useEffect, useState } from 'react';

const DigitalArt = () => {
  const [digitalArts, setDigitalArts] = useState([]);

  useEffect(() => {
    console.log("Fetching digital artworks...");

    fetch('http://localhost:9000/homePage/getArtworksByType?Type=Digital Art')
      .then(response => {
        console.log("Response received:", response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("Data for digital artworks:", data);
        setDigitalArts(data);
      })
      .catch(error => console.error('Error fetching digital art:', error));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Digital Art</h2>
      <div style={styles.grid}>
        {digitalArts.length > 0 ? (
          digitalArts.map((artwork) => (
            <div key={artwork.id} style={styles.card}>
              <img src={`http://localhost:9000/${artwork.Picture}`} alt={artwork.Title} style={styles.image} />
              <h3 style={styles.artworkTitle}>{artwork.Title}</h3>
              <h5 style={styles.artworkInfo} className="artwork-type">Type: {artwork.Type}</h5>
            </div>
          ))
        ) : (
          <p>No digital artworks available.</p>
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
    margin: '5px 0',
  },
};

export default DigitalArt;
