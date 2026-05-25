import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import './index.css';
import { authClient } from './lib/auth';
import { api } from './lib/api';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TimesheetForm from './pages/TimesheetForm';
import History from './pages/History';
import AdminTimesheets from './pages/AdminTimesheets';

function App() {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    authClient.getSession().then(async r => {
      setSession(r.data?.session || null);
      if (r.data?.session) {
        try { setUser(await api('/me')); } catch { await authClient.signOut(); }
      }
      setLoading(false);
    });
  }, []);
  if (loading) return <div className="p-8">Loading...</div>;
  return <HashRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={session && user ? <Layout user={user} /> : <Navigate to="/login" />}>
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/timesheet/new" element={<TimesheetForm user={user} />} />
        <Route path="/timesheet/history" element={<History />} />
        <Route path="/admin/timesheets" element={user?.is_admin ? <AdminTimesheets /> : <Navigate to="/dashboard" />} />
      </Route>
      <Route path="*" element={<Navigate to={session ? '/dashboard' : '/login'} />} />
    </Routes>
  </HashRouter>;
}

createRoot(document.getElementById('root')).render(<App />);
