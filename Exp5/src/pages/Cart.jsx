import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, totalPrice, dispatch } = useContext(CartContext);
    const navigate = useNavigate();

    const handleCheckout = () => {
        alert('Thank you for your purchase! This is a demo checkout.');
        dispatch({ type: 'CLEAR_CART' });
        navigate('/');
    };

    if (cart.length === 0) {
        return (
            <div className="cart-container" style={{ textAlign: 'center' }}>
                <h2 className="cart-title">Your Cart is Empty</h2>
                <p style={{ marginBottom: '2rem' }}>Looks like you haven't added anything to your cart yet.</p>
                <button className="btn-primary" onClick={() => navigate('/shop')}>
                    Go To Shop
                </button>
            </div>
        );
    }

    return (
        <div className="cart-container">
            <h2 className="cart-title">Your Shopping Cart</h2>

            <div className="cart-items">
                {cart.map(item => (
                    <CartItem key={item.id} item={item} />
                ))}
            </div>

            <div className="cart-summary">
                <div className="total-row">
                    <span>Total Amount: </span>
                    <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="cart-actions">
                    <button className="clear-btn" onClick={() => dispatch({ type: 'CLEAR_CART' })}>
                        Clear Cart
                    </button>
                    <button className="checkout-btn" onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
