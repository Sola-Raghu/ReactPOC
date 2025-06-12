import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './DashboardLayout.module.css';

const DashboardLayout: React.FC = () => {
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

export default DashboardLayout;