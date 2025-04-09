import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DashboardHeader.css';

const DashboardHeader = ({ username, role, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <div className="dashboard-header">
            <h2>Welcome to Your Dashboard, {username}!</h2>
            <div className="dashboard-links">
                <Link to="/api/menu">View Menu</Link>
                {role === 'admin' && (
                    <>
                        <Link to="/admin/menu">Manage Menu</Link>
                        <Link to="/admin/reservations">Manage Reservations</Link>
                        <Link to="/admin/orders">Manage Orders</Link>
                        <Link to="/admin/feedback">Manage Feedback</Link>
                        <Link to="/admin/contact-messages">View Contact Messages</Link>
                    </>
                )}
                {role === 'user' && (
                    <>
                        <Link to="/api/users/orders">Place Order</Link>
                        <Link to="/api/reservation">Reserve Table</Link>
                        <Link to="/api/feedback">Submit Feedback</Link>
                        <Link to="/api/contact-message">ContactUs</Link>
                    </>
                )}
                <Link to="/contact">Contact Us</Link>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </div>
    );
};

export default DashboardHeader;
