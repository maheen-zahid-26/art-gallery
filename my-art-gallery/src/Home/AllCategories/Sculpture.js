import React, { useEffect, useState } from 'react';

const Sculpture = () => {
  const [sculptures, setSculptures] = useState([]);

  useEffect(() => {
    console.log("Fetching sculptures...");

    fetch('http://localhost:9000/homePage/getArtworksByCategory?Category=sculpture')
      .then(response => {
        console.log("Response received:", response);
        return response.json();
      })
      .then(data => {
        console.log("Data for sculptures:", data);
        setSculptures(data);
      })
      .catch(error => console.error('Error fetching sculptures:', error));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Sculptures</h2>
      <div style={styles.grid}>
        {sculptures.length > 0 ? (
          sculptures.map((artwork) => (
            <div key={artwork.id} style={styles.card}>
              <img src={`http://localhost:9000/${artwork.Picture}`} alt={artwork.Title} style={styles.image} />
              <h3 style={styles.artworkTitle}>{artwork.Title}</h3>
              <h5 style={styles.artworkInfo} className="artwork-category">Category:{artwork.Category}</h5>
            </div>
          ))
        ) : (
          <p>No sculptures available.</p>
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
    padding: '5px',
    fontSize: '1em',
    color: '#333',

  }
};

export default Sculpture;
