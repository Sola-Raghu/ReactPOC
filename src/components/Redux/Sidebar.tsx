import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './store';
import styles from '../Sidebar/Sidebar.module.css';

const LogoutIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
    </svg>
);

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
        return isActive ? `${styles.navItem} ${styles.active}` : styles.navItem;
    };

    return (
        <nav className={styles.sidebar}>
            <ul className={styles.navList}>
                <li>
                    <NavLink to="/dashboard/redux/welcome" className={getNavLinkClass}>
                        Welcome
                    </NavLink>
                </li>
                {/* Add more Redux-specific links here if needed */}
            </ul>
            <button onClick={handleLogout} className={`${styles.navItem} ${styles.logoutButton}`}>
                <LogoutIcon />
                <span>Logout</span>
            </button>
        </nav>
    );
};

export default Sidebar;
