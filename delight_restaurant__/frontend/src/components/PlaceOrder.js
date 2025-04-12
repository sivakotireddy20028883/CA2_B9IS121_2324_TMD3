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

    const handleSelectItem = (item) => {
        const existingItem = selectedItems.find(selected => selected.id === item.id);
        if (existingItem) {
            setSelectedItems(selectedItems.map(selected =>
                selected.id === item.id ? { ...selected, quantity: selected.quantity + 1 } : selected
            ));
        } else {
            setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
        }
    };

    const handleDecreaseItem = (item) => {
        const existingItem = selectedItems.find(selected => selected.id === item.id);
        if (existingItem.quantity === 1) {
            setSelectedItems(selectedItems.filter(selected => selected.id !== item.id));
        } else {
            setSelectedItems(selectedItems.map(selected =>
                selected.id === item.id ? { ...selected, quantity: selected.quantity - 1 } : selected
            ));
        }
    };

    const handleSubmitOrder = async () => {
        try {
            // Reset messages
            setError('');
            setSuccessMessage('');

            if (selectedItems.length === 0) {
                setError('No items selected. Please add items to your order.');
                return;
            }

            // Prepare order payload
            const orderItems = selectedItems.map(item => ({
                id: item.id,
                quantity: item.quantity,
            }));

            // Send order to the backend
            const response = await axios.post('http://localhost:5000/api/orders', { items: orderItems });

            if (response.status === 201) {
                setSuccessMessage('Order placed successfully!');
                setSelectedItems([]); // Clear selected items after successful order
            } else {
                setError('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setError('Failed to place order. Please check the backend or try again later.');
        }
    };

    // Calculate the total price of selected items
    const calculateTotalPrice = () => {
        return selectedItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="place-order">
            <h1>Place Your Order</h1>

            {/* Display error or success messages */}
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            <div className="menu-items">
                {menuItems.length > 0 ? (
                    menuItems.map(item => (
                        <div key={item.id} className="menu-item">
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>${item.price}</p>
                            <button onClick={() => handleSelectItem(item)}>Add</button>
                            {selectedItems.find(selected => selected.id === item.id) && (
                                <div>
                                    <button onClick={() => handleDecreaseItem(item)}>Remove</button>
                                    <span>
                                        Quantity: {selectedItems.find(selected => selected.id === item.id).quantity}
                                    </span>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No menu items available. Please try again later.</p>
                )}
            </div>

            <div className="selected-items">
                <h2>Selected Items</h2>
                {selectedItems.length > 0 ? (
                    <>
                        <ul>
                            {selectedItems.map(item => (
                                <li key={item.id}>
                                    {item.name} - ${item.price} x {item.quantity}
                                </li>
                            ))}
                        </ul>
                        <h3>Total: ${calculateTotalPrice()}</h3>
                    </>
                ) : (
                    <p>No items selected.</p>
                )}
            </div>

            <button onClick={handleSubmitOrder} disabled={selectedItems.length === 0}>
                Submit Order
            </button>
        </div>
    );
};

export default PlaceOrder;
