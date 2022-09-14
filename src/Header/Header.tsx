import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import chart from './chart.png';

import './Header.css';

const Header = () => {
    const location = useLocation();
    const links = ['charts', 'settings'];
    return (
        <div className={'header'}>
            <img src={chart} alt={''} />
            {links.map(link => (
                <Link
                    key={link}
                    className={
                        location.pathname === `/${link}` ||
                        (location.pathname === '/' && link === 'charts')
                            ? 'active'
                            : ''
                    }
                    to={link === 'charts' ? '/' : link}
                >
                    {link.toUpperCase()}
                </Link>
            ))}
        </div>
    );
};

export default Header;