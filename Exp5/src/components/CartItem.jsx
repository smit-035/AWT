import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { dispatch } = useContext(CartContext);

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-img" />
            <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <span className="product-cat">{item.category}</span>
                <p className="product-price">₹{item.price.toLocaleString()}</p>
                <button className="remove-btn" onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
                    Remove
                </button>
            </div>
            <div className="cart-item-controls">
                <button className="qty-btn" onClick={() => dispatch({ type: 'DECREASE_QTY', payload: item.id })}>-</button>
                <span>{item.quantity}</span>
                <button className="qty-btn" onClick={() => dispatch({ type: 'INCREASE_QTY', payload: item.id })}>+</button>
            </div>
            <div className="cart-item-total">
                <strong>₹{(item.price * item.quantity).toLocaleString()}</strong>
            </div>
        </div>
    );
};

export default CartItem;
