import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageOrders.css'; // Add your custom styling
import AdminDashboard from './AdminDashboard';

const ManageOrders = ({ onLogout }) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            // Fetch orders from the backend
            const response = await axios.get('http://localhost:5000/api/orders'); 
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleLogout = () => {
        if (typeof onLogout === 'function') {
            onLogout(); // Call onLogout function passed from props
        }
    };

    return (
        <div className="manage-orders">
            <AdminDashboard username="Admin" onLogout={handleLogout} />
            <h1>Manage Orders</h1>

            <div className="order-list">
                {orders.map(order => (
                    <div key={order.id} className="order-item">
                        <h3>Order ID: {order.id}</h3>
                        <ul>
                            {order.items.map((item, index) => (
                                <li key={index}>
                                    <strong>{item.name}</strong> - Quantity: {item.quantity}
                                </li>
                            ))}
                        </ul>
                        <p>Timestamp: {order.timestamp}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageOrders;
