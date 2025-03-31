import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import Menu from './Menu';
import ContactUs from './ContactUs';
import './Home.css';

const Home = ({ onLogin }) => {
    const [activeComponent, setActiveComponent] = useState(null);

    const renderComponent = () => {
        switch (activeComponent) {
            case 'register':
                return <Register />;
            case 'login':
                return <Login onLogin={onLogin} />;
            case 'viewMenu':
                return <Menu />;
            case 'contactUs':
                return <ContactUs />;
            default:
                return null;
        }
    };