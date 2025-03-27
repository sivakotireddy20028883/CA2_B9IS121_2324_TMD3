import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import ReserveTable from './components/ReserveTable';
import ContactUs from './components/ContactUs';
import PlaceOrder from './components/PlaceOrder';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ManageMenu from './components/ManageMenu';
import ManageReservations from './components/ManageReservations';
import ManageOrders from './components/ManageOrders';
import ManageFeedback from './components/ManageFeedback';
import Register from './components/Register';
import Login from './components/Login';
import MenuPage from './components/MenuPage';
import './App.css'; 

const App = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (loggedInUser) => {
        setUser(loggedInUser);
    };

    const handleLogout = () => {
        setUser(null);
    };
