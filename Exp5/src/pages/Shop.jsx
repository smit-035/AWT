import React, { useState, useEffect, useMemo, useRef } from 'react';
import productsData from '../data/products';
import ProductCard from '../components/ProductCard';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const searchInputRef = useRef(null);

    // Demonstrate useEffect: Load products on mount
    useEffect(() => {
        // Simulating a fetch call
        setProducts(productsData);

        // Demonstrate useRef: Focus search input on mount
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // Demonstrate useMemo: Optimize filtering
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [products, searchTerm, selectedCategory]);

    const categories = ['All', ...new Set(productsData.map(p => p.category))];

    return (
        <div className="shop-container">
            <div className="shop-header">
                <h1>Our Collection</h1>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="search-input"
                        style={{ width: '150px' }}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search products..."
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="product-grid">
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div style={{ textAlign: 'center', padding: '3rem' }}>
                    <p>No products found matching your search.</p>
                </div>
            )}
        </div>
    );
};

export default Shop;
