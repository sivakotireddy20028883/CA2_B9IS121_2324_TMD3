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

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const filteredItems = menuItems.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedItems = filteredItems.sort((a, b) => {
        if (sortKey === 'price') {
            return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        }
        if (sortKey === 'name') {
            return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
        }
        return 0;
    });

    return (
        <div className="menu">
            <UserDashboard />
            <h1>Our Menu</h1>
            <div className="menu-controls">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-bar"
                />
                <button onClick={() => handleSort('name')} className="sort-button">
                    Sort by Name {sortKey === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                </button>
                <button onClick={() => handleSort('price')} className="sort-button">
                    Sort by Price {sortKey === 'price' && (sortOrder === 'asc' ? '▲' : '▼')}
                </button>
            </div>
            <div className="menu-items">
                {sortedItems.map(item => (
                    <div key={item.id} className="menu-item">
                        <h3>{item.name}</h3>
                        <p>{item.description}</p>
                        <p>${item.price.toFixed(2)}</p>
                        <p>{item.availability ? 'Available' : 'Unavailable'}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserMenu;
