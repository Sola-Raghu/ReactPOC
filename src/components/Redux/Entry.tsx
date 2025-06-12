import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';
import Sidebar from './Sidebar';
import Header from './Header';
import styles from '../../pages/DashboardLayout/DashboardLayout.module.css';
import { Outlet } from 'react-router-dom';
import Login from './Login';

const ReduxShell: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
    if (!isAuthenticated) {
        return <Login />;
    }
    return (
        <div className={styles.dashboardLayout}>
            <Header />
            <div className={styles.dashboardMain}>
                <Sidebar />
                <main className={styles.contentArea}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ReduxShell;
