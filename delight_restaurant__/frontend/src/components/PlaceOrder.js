import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PlaceOrder.css';

const PlaceOrder = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [error, setError] = useState(''); // Track errors
    const [successMessage, setSuccessMessage] = useState(''); // Track success message

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            // Fetch menu items from the API
            const response = await axios.get('http://localhost:5000/api/menus'); // Ensure the endpoint matches the backend
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
            setError('Failed to load menu items. Please check the backend or try again later.');
        }
    };
