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