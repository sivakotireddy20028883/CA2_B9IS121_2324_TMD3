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
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Home onLogin={handleLogin} />} />
                    <Route path="/api/menu" element={<MenuPage />} />
                    <Route path="/api/reserve" element={<ReserveTable />} />
                    <Route path="/api/contact" element={<ContactUs />} />
                    <Route path="/api/orders" element={<PlaceOrder />} />
                    <Route path="/api/register" element={<Register />} />
                    <Route path="/api/login" element={<Login onLogin={handleLogin} />} />
                    
                    {user && user.role === 'admin' && (
                        <>
                            <Route path="/api/admin/dashboard" element={<AdminDashboard username={user.username} onLogout={handleLogout} />} />
                            <Route path="/api/admin/menu" element={<ManageMenu />} />
                            <Route path="/api/admin/reservations" element={<ManageReservations onLogout={handleLogout} />} />
                            <Route path="/api/admin/orders" element={<ManageOrders onLogout={handleLogout} />} />
                            <Route path="/admin" element={<Navigate to="/api/admin/dashboard" />} />
                        </>
                    )}

                    {user && user.role === 'user' && (
                        <>
                            <Route path="/api/user/dashboard" element={<UserDashboard username={user.username} onLogout={handleLogout} />} />
                            <Route path="/api/user/reserve" element={<ReserveTable />} />
                            <Route path="/api/user/feedback" element={<ContactUs />} />
                            <Route path="/user" element={<Navigate to="/user/dashboard" />} />
                        </>
                    )}

                    {!user && (
                        <>
                            <Route path="/login" element={<Login onLogin={handleLogin} />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
