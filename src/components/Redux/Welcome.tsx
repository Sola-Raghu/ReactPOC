import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from './store';

const Welcome: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);
  return (
    <div style={{ background: '#fff', padding: 40, borderRadius: 12, boxShadow: '0 2px 8px #0001', minWidth: 320, textAlign: 'center' }}>
      <h1 style={{ marginBottom: 16 }}>Welcome{user ? `, ${user.name}` : ''}!</h1>
      <p style={{ color: '#555' }}>You are now logged in using Redux state management.</p>
    </div>
  );
};

export default Welcome;
