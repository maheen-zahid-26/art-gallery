import React, { useEffect, useState } from 'react';

const Painting = () => {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    console.log("Fetching paintings...");

    fetch('http://localhost:9000/homePage/getArtworksByCategory?Category=painting')
      .then(response => {
        console.log("Received response:", response);
        return response.json();
      })
      .then(data => {
        console.log("Fetched data:", data);
        setPaintings(data);
      })
      .catch(error => {
        console.error('Error fetching paintings:', error);
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Paintings</h2>
      <div style={styles.grid}>
        {paintings.length > 0 ? (
          paintings.map((artwork) => (
            <div key={artwork.id} style={styles.card}>
              <img src={`http://localhost:9000/${artwork.Picture}`} alt={artwork.Title} style={styles.image} />
              <h3 style={styles.artworkTitle}>{artwork.Title}</h3>
              <h5 style={styles.artworkInfo} className="artwork-category">Category:{artwork.Category}</h5>
            </div>
          ))
        ) : (
          <p>No paintings available.</p>
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
    fontSize: '1.5em',
    color: '#333',
  },
  artworkInfo: {
    padding: '5px',
    fontSize: '1.2em',
    color: '#333',

  }
};

export default Painting;
