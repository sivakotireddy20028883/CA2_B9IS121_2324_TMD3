import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // Default role set to 'user'
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', {
                username,
                password,
                role,
                email,
            });
            setMessage(response.data.message || 'Registration successful');
            setRegistrationSuccess(true);
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setMessage(error.response.data.error);
            } else {
                setMessage('Registration failed. Please try again.');
            }
            setRegistrationSuccess(false);
        }
    };
