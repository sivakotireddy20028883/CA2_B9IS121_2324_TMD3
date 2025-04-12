import React from 'react';

const UpdateMenuItem = ({ itemData, handleInputChange, handleUpdateItem, handleCancelUpdate, error }) => (
    <div className="update-menu-item-form">
        <h2>Update Menu Item</h2>
        <input
            type="text"
            name="name"
            placeholder="Name"
            value={itemData.name}
            onChange={handleInputChange}
        />
        <input
            name="description"
            placeholder="Description"
            value={itemData.description}
            onChange={handleInputChange}
        />
        <input
            type="number"
            name="price"
            placeholder="Price"
            value={itemData.price}
            onChange={handleInputChange}
        />
        <label>
            Availability:
            <input
                type="checkbox"
                name="availability"
                checked={itemData.availability}
                onChange={handleInputChange}
            />
        </label>
        <button className="small-button" onClick={handleUpdateItem}>Update Item</button>
        <button className="small-button" onClick={handleCancelUpdate}>Cancel</button>
        {error && <p className="error">{error}</p>}
    </div>
);

export default UpdateMenuItem;
