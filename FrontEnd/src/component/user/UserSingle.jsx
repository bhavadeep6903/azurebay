import React from 'react'
import "./UserSingle.css"
import { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import { useCart } from '../CartContext';
const UserSingle = () => {

  const location = useLocation();
  const navigate = useNavigate();
   const { addToCart } = useCart() || {};
  const { element } = location.state || {};

  if (!element) {
    return <div>Item not found. Please go back and try again.</div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...element, qty });
  };

  const [qty, setQty] = useState(1); // Default qty is 1

  const handleIncrement = () => {
    if (qty < element.quantity) {
      setQty((prev)=>prev+1);
    }
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty((prev)=>prev-1);
    }
  };

  return (

    <>
      <UserNavbar></UserNavbar>
      <div className="page">
      <div className="left">
        <img src={element.image} alt={element.name} />
    </div>
    <div className="right">
        <h1>{element.name}</h1>
        <h3>{element.description}</h3>
        <div className="price">
        <p className='p'>discount Of</p><p className="amount">{element.discount}% </p><p className='p'>On This Product</p>
        </div>
        <div className="price">
          <p className='p'>price:</p><p className="amount">${element.cost}</p>
        </div>
        <div className="c1">
            <button onClick={handleDecrement} className="qty"> - </button> 
                <p className="p">{qty}</p> 
            <button onClick={handleIncrement} className="qty"> + </button>
        </div>
        <div className="button" onClick={handleAddToCart}>Add to Cart<i className='fa fa-shopping-cart'></i></div>
    </div>
      </div>
    </>
  
  )
}
export default UserSingle;