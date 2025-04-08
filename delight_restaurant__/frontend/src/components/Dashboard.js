import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './Dashboard.css'; // Import your CSS for styling

const Dashboard = ({ role }) => {
    const history = useHistory();

    const handleLogout = () => {
        axios.post('/api/logout')
            .then(response => {
                alert(response.data.message);
                history.push('/login');
            })
            .catch(error => {
                console.error('There was an error logging out!', error);
            });
    };

    return (
        <div className="dashboard-container">
            <h1>{role === 'admin' ? 'Admin Dashboard' : 'User Dashboard'}</h1>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            {/* Add other dashboard content here */}
        </div>
    );
};

export default Dashboard;
