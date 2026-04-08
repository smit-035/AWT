import React, { createContext, useReducer, useEffect, useMemo } from 'react';

// Define the initial state
const initialState = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
    totalItems: 0,
    totalPrice: 0
};

// Define the reducer function
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
            let updatedCart;

            if (existingItemIndex > -1) {
                updatedCart = [...state.cart];
                updatedCart[existingItemIndex].quantity += 1;
            } else {
                updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
            }
            return { ...state, cart: updatedCart };
        }

        case 'REMOVE_ITEM':
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.payload)
            };

        case 'INCREASE_QTY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                )
            };

        case 'DECREASE_QTY':
            return {
                ...state,
                cart: state.cart.map(item =>
                    item.id === action.payload
                        ? { ...item, quantity: Math.max(1, item.quantity - 1) }
                        : item
                )
            };

        case 'CLEAR_CART':
            return { ...state, cart: [] };

        default:
            return state;
    }
};

// Create the context
export const CartContext = createContext();

// Context Provider component
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }, [state.cart]);

    // Use useMemo to calculate total items and total price
    const totals = useMemo(() => {
        const totalItems = state.cart.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = state.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        return { totalItems, totalPrice };
    }, [state.cart]);

    return (
        <CartContext.Provider value={{ ...state, ...totals, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
