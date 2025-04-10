import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from './AdminDashboard';
import './ManageMenu.css';
import AddMenuItem from './AddMenuItem';
import UpdateMenuItem from './UpdateMenuItem';

const ManageMenu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [newItem, setNewItem] = useState({ name: '', description: '', price: '', availability: true });
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortType, setSortType] = useState('name_asc');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/menus'); // Correct API endpoint
            setMenuItems(response.data);
            setError('');
        } catch (error) {
            console.error('Error fetching menu items', error);
            setError('Failed to fetch menu items. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddItem = async () => {
        if (!newItem.name || !newItem.price) {
            setError('Name and price are required.');
            return;
        }
        try {
            const newItemData = {
                name: newItem.name,
                description: newItem.description,
                price: parseFloat(newItem.price),
                availability: newItem.availability
            };
