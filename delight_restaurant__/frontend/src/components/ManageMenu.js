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

            await axios.post('http://localhost:5000/api/menu', newItemData); // Correct API endpoint
            fetchMenuItems();
            setNewItem({ name: '', description: '', price: '', availability: true });
            setShowAddForm(false);
            setSuccessMessage('New item added successfully.');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error adding menu item', error);
            setError('Failed to add menu item.');
        }
    };

    const handleDeleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/menu/${id}`); // Correct API endpoint
            fetchMenuItems();
            setSuccessMessage('Item deleted successfully.');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error deleting menu item', error);
            setError('Failed to delete menu item. It may not exist.');
        }
    };

    const handleUpdateItem = async (id) => {
        const selectedItem = menuItems.find(item => item.id === id);
        if (!selectedItem.name || !selectedItem.price) {
            setError('Name and price are required.');
            return;
        }
        try {
            const updatedItemData = {
                name: selectedItem.name,
                description: selectedItem.description,
                price: parseFloat(selectedItem.price),
                availability: selectedItem.availability
            };

            await axios.put(`http://localhost:5000/api/menu/${id}`, updatedItemData); // Correct API endpoint
            fetchMenuItems();
            setSuccessMessage('Menu item updated successfully.');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error updating menu item', error);
            setError('Failed to update menu item.');
        }
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setNewItem({ ...newItem, [name]: newValue });
    };

    const handleItemInputChange = (event, id) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setMenuItems(menuItems.map(item => (item.id === id ? { ...item, [name]: newValue } : item)));
    };

    const toggleAddForm = () => {
        setShowAddForm(!showAddForm);
        setError('');
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (type) => {
        setSortType(type);
    };

    const handleToggleEdit = (id) => {
        setMenuItems(menuItems.map(item => (item.id === id ? { ...item, isEditing: !item.isEditing } : item)));
    };

    const handleCancelUpdate = (id) => {
        setMenuItems(menuItems.map(item => (item.id === id ? { ...item, isEditing: false } : item)));
    };

    const filteredItems = menuItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const sortedItems = filteredItems.sort((a, b) => {
        if (sortType === 'name_asc') {
            return a.name.localeCompare(b.name);
        } else if (sortType === 'name_desc') {
            return b.name.localeCompare(a.name);
        } else if (sortType === 'price_asc') {
            return a.price - b.price;
        } else if (sortType === 'price_desc') {
            return b.price - a.price;
        } else {
            return 0;
        }
    });

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="manage-menu">
            <AdminDashboard onLogout={handleLogout} />
            <h1>Manage Menu</h1>

            {successMessage && <div className="success-message">{successMessage}</div>}
            {error && <div className="error-message">{error}</div>}
            {loading && <p>Loading...</p>}

            <div className="add-item">
                {!showAddForm && (
                    <button className="small-button" onClick={toggleAddForm}>Add Item</button>
                )}

                {showAddForm && (
                    <AddMenuItem 
                        newItemData={newItem}
                        handleInputChange={handleInputChange}
                        handleAddItem={handleAddItem}
                        error={error}
                        handleCancelAddItem={toggleAddForm}
                    />
                )}
            </div>

            <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar"
            />

            <div className="sorting-buttons">
                <button className={sortType === 'name_asc' ? 'active' : ''} onClick={() => handleSort('name_asc')}>Name A-Z</button>
                <button className={sortType === 'name_desc' ? 'active' : ''} onClick={() => handleSort('name_desc')}>Name Z-A</button>
                <button className={sortType === 'price_asc' ? 'active' : ''} onClick={() => handleSort('price_asc')}>Price Low-High</button>
                <button className={sortType === 'price_desc' ? 'active' : ''} onClick={() => handleSort('price_desc')}>Price High-Low</button>
            </div>

            <div className="menu-items">
                {sortedItems.map(item => (
                    <div key={item.id} className="menu-item">
                        {item.isEditing ? (
                            <UpdateMenuItem
                                itemData={item}
                                handleInputChange={(e) => handleItemInputChange(e, item.id)}
                                handleUpdateItem={() => handleUpdateItem(item.id)}
                                handleCancelUpdate={() => handleCancelUpdate(item.id)}
                                error={error}
                            />
                        ) : (
                            <>
                                {item.availability ? (
                                    <h3>{item.name}</h3>
                                ) : (
                                    <h3><strike>{item.name}</strike></h3>
                                )}
                                <p>{item.description}</p>
                                <p>${item.price}</p>
                                <p>{item.availability ? 'Available' : 'Not Available'}</p>
                                <div className="menu-item-buttons">
                                    <button className="small-button" onClick={() => handleToggleEdit(item.id)}>Update</button>
                                    <button className="small-button" onClick={() => handleDeleteItem(item.id)}>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageMenu;
