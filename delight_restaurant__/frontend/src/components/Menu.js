import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageMenu.css';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchMenuItems();
    }, []);

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/menus');
            setMenuItems(response.data);
        } catch (error) {
            console.error('Error fetching menu items:', error);
            setErrorMessage('Failed to load menu items. Please try again later.');
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
            <h1>Our Menu</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div className="menu-controls">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-bar"
                />
                <button onClick={() => handleSort('name')}>
                    Sort by Name {sortKey === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
                </button>
                <button onClick={() => handleSort('price')}>
                    Sort by Price {sortKey === 'price' && (sortOrder === 'asc' ? '▲' : '▼')}
                </button>
            </div>
            <div className="menu-items">
                {sortedItems.length > 0 ? (
                    sortedItems.map(item => (
                        <div key={item.id} className="menu-item">
                            
                            {/*<img 
                                src={process.env.PUBLIC_URL + item.image_path} 
                                alt={item.name} 
                                className="menu-item-image" 
                            >/*}
                            {/* Content on the right */}
                            <div className="menu-item-content">
                                <h3>{item.name}</h3>
                                <p>Price: ${item.price.toFixed(2)}</p>
                                <p>Description: {item.description}</p>
                                <p>Availability: {item.availability ? 'Available' : 'Not Available'}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No menu items found.</p>
                )}
            </div>
        </div>
    );
};

export default Menu;
