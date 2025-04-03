import React, { useState } from 'react';
import axios from 'axios';
import './ReserveTable.css'; // Ensure this file exists and styles your component.

const ReserveTable = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic input validation
        if (!name || !date || !time || !numberOfGuests || numberOfGuests <= 0) {
            alert("Please provide valid input for all fields.");
            return;
        }

        try {
            // Send POST request to backend
            const response = await axios.post('http://localhost:5000/api/reservations', {
                name,
                date,
                time,
                people: numberOfGuests // Match the backend's field name
            });

            // Set success message and clear form
            setMessage(`Table reserved successfully for ${response.data.name} on ${response.data.date} at ${response.data.time}.`);
            alert('Table reserved successfully!');
            setName('');
            setDate('');
            setTime('');
            setNumberOfGuests('');
        } catch (error) {
            console.error('Error reserving table', error.response || error); // Log detailed error
            alert(error.response?.data?.error || 'Failed to reserve table');
        }
    };

    return (
        <div className="reserve-table">
            <h1>Book a Table</h1>
            <form onSubmit={handleSubmit} className="reserve-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">Time</label>
                    <input
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="numberOfGuests">Number of Guests</label>
                    <input
                        type="number"
                        id="numberOfGuests"
                        placeholder="Number of Guests"
                        value={numberOfGuests}
                        onChange={(e) => setNumberOfGuests(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="reserve-button">Reserve</button>
            </form>
            {message && <p className="reserve-message">{message}</p>}
        </div>
    );
};

export default ReserveTable;
