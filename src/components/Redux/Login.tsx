import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './store';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: '', email: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email) {
      dispatch(login({ name: form.name, email: form.email }));
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: '#f9f9f9' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: 32, borderRadius: 8, boxShadow: '0 2px 8px #0001', minWidth: 320 }}>
        <h2 style={{ marginBottom: 24 }}>Redux Login</h2>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          style={{ marginBottom: 12, width: '100%', padding: 8 }}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={{ marginBottom: 20, width: '100%', padding: 8 }}
          required
        />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4 }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
