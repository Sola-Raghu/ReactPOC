import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Sidebar.module.css';

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
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getNavLinkClass = ({ isActive }: { isActive: boolean }): string => {
        return isActive ? `${styles.navItem} ${styles.active}` : styles.navItem;
    };

    return (
        <nav className={styles.sidebar}>
            <ul className={styles.navList}>
                <li>
                    <NavLink to="/dashboard/movies" className={getNavLinkClass}>
                        Movies
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/meetings" className={getNavLinkClass}>
                        New Meeting
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/todos" className={getNavLinkClass}>
                        Todos
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/formikForm" className={getNavLinkClass}>
                        Formik Form
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/reactHookForm" className={getNavLinkClass}>
                        React Hook Form
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/files" className={getNavLinkClass}>
                        Files
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/useReducer" className={getNavLinkClass}>
                        UseReducer
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/fetch" className={getNavLinkClass}>
                        Fetch
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/axios" className={getNavLinkClass}>
                        Axios
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/Redux" className={getNavLinkClass}>
                        Redux
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/products" className={getNavLinkClass}>
                        Products
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard/test" className={getNavLinkClass}>
                        Accordion
                    </NavLink>
                </li>
            </ul>

            <button onClick={handleLogout} className={`${styles.navItem} ${styles.logoutButton}`}>
                <LogoutIcon />
                <span>Logout</span>
            </button>
        </nav>
    );
};

export default Sidebar;