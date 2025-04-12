import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';
import UserDashboard from './UserDashboard';

const UserMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/menu');
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error fetching menu items', error);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
