import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <header style={{ height: 64, background: '#1976d2', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 32px', fontSize: 20, fontWeight: 500, boxShadow: '0 2px 8px #0001' }}>
      <div style={{ flex: 1 }}>Redux Entry Dashboard</div>
      {user && (
        <div style={{ fontSize: 16, fontWeight: 400 }}>
          {user.name} <span style={{ fontSize: 14, color: '#cce' }}>({user.email})</span>
        </div>
      )}
    </header>
  );
};

export default Header;
