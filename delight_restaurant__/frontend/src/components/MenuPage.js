import React from 'react';
import DashboardHeader from './DashboardHeader';
import Menu from './Menu';

const MenuPage = ({ username, role, onLogout }) => {
    return (
        <div>
            <DashboardHeader username={username} role={role} onLogout={onLogout} />
            <Menu />
        </div>
    );
};

export default MenuPage;
