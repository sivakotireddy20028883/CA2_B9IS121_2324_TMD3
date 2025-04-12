import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserDashboard.css';
import ReserveTable from './ReserveTable';
import PlaceOrder from './PlaceOrder';
import ContactUs from './ContactUs';
import Menu from './Menu';

const UserDashboard = ({ username, onLogout }) => {
    const [activeComponent, setActiveComponent] = useState('menu');

    const renderComponent = () => {
        switch (activeComponent) {
            case 'menu':
                return <Menu username={username} onLogout={onLogout} />;
            case 'reserve':
                return <ReserveTable />;
            case 'order':
                return <PlaceOrder />;
            case 'contact':
                return <ContactUs />;
            default:
                return <Menu username={username} onLogout={onLogout} />;
        }
    };
    
    return (
        <div className="user-dashboard-layout">
            <h1>Welcome to Your Dashboard, {username}!</h1>
            <nav>
                <button onClick={() => setActiveComponent('menu')}>View Menu</button>
                <button onClick={() => setActiveComponent('reserve')}>Book a Table</button>
                <button onClick={() => setActiveComponent('order')}>Place an Order</button>
                <button onClick={() => setActiveComponent('contact')}>Contact Us</button>
                <button onClick={onLogout}>Logout</button>
            </nav>
            <div className="dashboard-content">
                {renderComponent()}
            </div>
        </div>
    );
};

export default UserDashboard;
