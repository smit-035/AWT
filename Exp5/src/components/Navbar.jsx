import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
    const { totalItems } = useContext(CartContext);

    return (
        <nav className="navbar">
            <div className="nav-logo">
                <Link to="/">
                    <h1>BadmintonPro</h1>
                </Link>
            </div>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                <li>
                    <Link to="/cart" className="cart-icon">
                        Cart
                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
