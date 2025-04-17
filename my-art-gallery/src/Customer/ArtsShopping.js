import React, { useState, useEffect } from 'react';
import './ArtsShopping.css';

function ArtsShopping() {
  const [artItems, setArtItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedArtId, setSelectedArtId] = useState(null); 

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch('http://localhost:9000/customers/getArtworks');
        const data = await response.json();
        setArtItems(data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []);

  const addToCart = (artItem) => {
    const updatedCartItems = [...cartItems, artItem];
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems)); 
  };

  const toggleDetails = (artItemId) => {
    setSelectedArtId(selectedArtId === artItemId ? null : artItemId); 
  };

  return (
    <div className="art-shopping-container">
      {artItems.length === 0 ? (
        <p>Loading artworks...</p>
      ) : (
        artItems.map((artItem) => (
          <div className="art-card" key={artItem.id}>
            <img src={`http://localhost:9000/${artItem.Picture}`} alt={artItem.title} className="art-image" />
            <div className="art-info">
              <h2>{artItem.Title}</h2>
              <div className="buttons">
                <button className="view-details" onClick={() => toggleDetails(artItem.id)}>
                  {selectedArtId === artItem.id ? 'Hide Details' : 'View Details'}
                </button>
                <button className="add-to-cart" onClick={() => addToCart(artItem)}>Add to Cart</button>
              </div>
            </div>
            {selectedArtId === artItem.id && (
              <div className="art-details">
                <p>Art Type: {artItem.Type}</p>
                <p>Category: {artItem.Category}</p>
                <p>Price: Rs.{artItem.Price}</p>
                <p>Artist Name: {artItem.ArtistName}</p>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default ArtsShopping;
