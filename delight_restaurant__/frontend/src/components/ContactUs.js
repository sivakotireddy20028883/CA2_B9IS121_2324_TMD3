import React, { useState } from 'react';
import axios from 'axios';
import './ContactUs.css';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/contact', {
                name,
                email,
                message,
            });
            setFeedback(response.data.message);
        } catch (error) {
            if (error.response) {
                setFeedback(error.response.data.message);
            } else {
                setFeedback('Submission failed');
            }
        }
    };

    return (
        <div className="contact-container">
            <h2>Contact Us</h2>
            <div className="contact-details">
                <p>Address: 123 Delight Street, Food City</p>
                <p>Phone: (123) 456-7890</p>
                <p>Email: info@delightrestaurant.com</p>
            </div>
            
            {feedback && <p>{feedback}</p>}
        </div>
    );
};

export default ContactUs;
