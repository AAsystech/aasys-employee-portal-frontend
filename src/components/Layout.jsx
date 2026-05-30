import { Link, Outlet, useNavigate } from 'react-router-dom';
import { authClient } from '../lib/auth';

export default function Layout({ user }) {
  const navigate = useNavigate();
  async function logout() {
    await authClient.signOut();
    navigate('/login');
    location.reload();
  }
  return <div>
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link to="/dashboard" className="text-lg font-bold">Employee Portal</Link>
        <nav className="flex items-center gap-3 text-sm">
          <Link to="/timesheet/new">Submit</Link>
          <Link to="/timesheet/history">History</Link>
          {user?.is_admin && <Link to="/admin/timesheets">Admin</Link>}
          <button className="btn-secondary" onClick={logout}>Logout</button>
        </nav>
      </div>
    </header>
    <main className="mx-auto max-w-6xl p-4 md:p-8"><Outlet /></main>
  </div>;
}
