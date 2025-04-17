import React, { useState, useEffect, useMemo } from 'react';
import ArtsShopping from './ArtsShopping';
import './checkout.css';

const Checkout = ({ cartItems, setCartItems }) => {
  const [confirm, setConfirm] = useState(false);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + Number(item.Price), 0);
  }, [cartItems]);

  useEffect(() => {
    console.log('Cart Items:', cartItems);
    cartItems.forEach(item => {
      console.log('Price Type:', typeof item.Price);
    });
  }, [cartItems]);

  const clearCart = () => {
    localStorage.removeItem('cartItems');
    setCartItems([]);
    setConfirm(true);
    alert('Order Successfully placed');
  };

  if (confirm) {
    return <ArtsShopping />;
  }

  return (
    <div className="checkoutcontainer shadow">
      <h1 className="checkouttitle">Checkout</h1>
      <ul className="checkoutlist">
        {cartItems.map((item, index) => {
          const price = Number(item.Price);
          return (
            <li key={index} className="checkoutitem">
              <span className="itemtitle">{item.Title}</span>
              <span className="itemprice">Rs.{price.toFixed(2)}</span>
            </li>
          );
        })}
      </ul>
      <h2 className="totalprice">Total Price: Rs.{totalPrice.toFixed(2)}</h2>
      <button
        className="checkoutbutton"
        onClick={clearCart}
      >
        Confirm
      </button>
    </div>
  );
};

export default Checkout;
