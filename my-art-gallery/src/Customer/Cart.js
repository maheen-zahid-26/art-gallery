import React, { useEffect, useState } from 'react';
import Checkout from './checkout';
import './Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(savedCartItems);
  }, []);

  const removeFromCart = (index) => {
    const updatedCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const handleCheckout = async () => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    try {
      const response = await fetch('http://localhost:9000/customers/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(savedCartItems),
      });

      if (response.ok) {
        alert('Checkout successful!');
        setIsCheckout(true);
        localStorage.removeItem('cartItems'); // Corrected this line
      } else {
        alert('Checkout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('An error occurred. Please try again.');
    }
  };

  if (isCheckout) {
    return <Checkout cartItems={cartItems} setCartItems={setCartItems} />; // Corrected prop name
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Type</th>
                <th>Category</th>
                <th>Price</th>
                <th>Artist Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((artItem, index) => (
                <tr key={index}>
                  <td>
                    <img src={`http://localhost:9000/${artItem.Picture}`} alt={artItem.Title} className="cart-image" />
                  </td>
                  <td>{artItem.Title}</td>
                  <td>{artItem.Type}</td>
                  <td>{artItem.Category}</td>
                  <td>Rs.{artItem.Price}</td>
                  <td>{artItem.ArtistName}</td>
                  <td>
                    <button className="delete-button" onClick={() => removeFromCart(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
          <div className="checkout-container">
            <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
