import React from 'react';

const AddMenuItem = ({ newItemData, handleInputChange, handleAddItem, error, handleCancelAddItem }) => (
    <div className="add-menu-item-form">
        <h2>Add New item</h2>
        <input
            type="text"
            name="name"
            placeholder="Name"
            value={newItemData.name}
            onChange={handleInputChange}
        />
        <input
            name="description"
            placeholder="Description"
            value={newItemData.description}
            onChange={handleInputChange}
        />
        <input
            type="number"
            name="price"
            placeholder="Price"
            value={newItemData.price}
            onChange={handleInputChange}
        />
        <label>
            Availability:
            <input
                type="checkbox"
                name="availability"
                checked={newItemData.availability}
                onChange={handleInputChange}
            />
        </label>
        <button className="small-button" onClick={handleAddItem}>Add Item</button>
        <button className="small-button" onClick={handleCancelAddItem}>Cancel</button>
        {error && <p className="error">{error}</p>}
    </div>
);

export default AddMenuItem;
