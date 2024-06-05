import React from 'react';
import { Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom';
import TotalPrice from './TotalPrice';

interface Props {
    isInline?: boolean;
}

const NavBar: React.FC<Props> = ({ isInline = false }) => {
    const menuItems = [
        { key: '/', label: <Link to='/'>Home</Link>},
        { key: '/about', label: <Link to='/about'>About</Link>},
        { key: 'wish-price', label: <TotalPrice />},
    ];

    return (
        <>
            <Menu
                theme="dark"
                mode={isInline ? "inline" : "horizontal"}
                defaultSelectedKeys={['/']}
                items={menuItems}
                selectedKeys={[useLocation().pathname]}
                style={{ fontSize: 16, border: "none" }}
            />
        </>
    );
};

export default NavBar;
