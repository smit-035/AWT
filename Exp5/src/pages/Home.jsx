import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="home-page">
            <section className="hero">
                <h1>BadmintonPro</h1>
                <p>Premium Gear for the Modern Athlete. Experience precision, power, and performance with our curated collection of professional badminton equipment.</p>
                <button className="btn-primary" onClick={() => navigate('/shop')}>
                    Shop Now
                </button>
            </section>

            <section style={{ padding: '4rem 2rem', textAlign: 'center' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Dominate the Court</h2>
                <p style={{ maxWidth: '800px', margin: '0 auto', color: '#666' }}>
                    From World-Tour rackets to professional-grade shoes, we provide everything you need to take your game to the next level. Clean, minimal, and focused on performance.
                </p>
            </section>
        </div>
    );
};

export default Home;
