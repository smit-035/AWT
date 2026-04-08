import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { dispatch } = useContext(CartContext);

    const addToCart = () => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    return (
        <div className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
                <span className="product-cat">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">₹{product.price.toLocaleString()}</p>
                <button className="add-to-cart-btn" onClick={addToCart}>
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
