import { Link, Outlet, useNavigate } from 'react-router-dom';
import { authClient } from '../lib/auth';

export default function Layout({ user }) {
  const navigate = useNavigate();

  async function logout() {
    await authClient.signOut();
    navigate('/login');
    location.reload();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed left-0 top-0 hidden h-full w-64 bg-slate-950 text-white lg:block">
        <div className="p-6">
          <div className="text-2xl font-bold tracking-wide">AASYS</div>
          <div className="text-xs tracking-[0.3em] text-slate-300">TECHNOLOGIES</div>
        </div>

        <nav className="space-y-6 px-4">
          <div>
            <Link to="/dashboard" className="block rounded-xl bg-white/10 px-4 py-3 font-semibold">
              Dashboard
            </Link>
          </div>

          <div>
            <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wide text-slate-400">Services</p>
            <Link to="/timesheet/new" className="block rounded-xl px-4 py-3 hover:bg-white/10">Timesheet</Link>
            <Link to="/dashboard" className="block rounded-xl px-4 py-3 hover:bg-white/10">Trainings</Link>
            <Link to="/dashboard" className="block rounded-xl px-4 py-3 hover:bg-white/10">Employee Details</Link>
            <Link to="/dashboard" className="block rounded-xl px-4 py-3 hover:bg-white/10">Pay Stubs</Link>
            <Link to="/dashboard" className="block rounded-xl px-4 py-3 hover:bg-white/10">Documents</Link>
          </div>

          <div>
            <p className="mb-2 px-4 text-xs font-semibold uppercase tracking-wide text-slate-400">Account</p>
            <Link to="/dashboard" className="block rounded-xl px-4 py-3 hover:bg-white/10">Profile</Link>
            <Link to="/dashboard" className="block rounded-xl px-4 py-3 hover:bg-white/10">Settings</Link>
          </div>
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b bg-white">
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <h1 className="text-lg font-bold">Employee Portal</h1>
              <p className="text-xs text-slate-500">AASYS Technologies</p>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/timesheet/history" className="hidden text-sm font-medium md:block">History</Link>
              {user?.is_admin && (
                <Link to="/admin/timesheets" className="hidden text-sm font-medium md:block">Admin</Link>
              )}

              <div className="hidden text-right md:block">
                <p className="text-sm font-semibold">{user?.name || user?.email}</p>
                <p className="text-xs text-slate-500">Employee</p>
              </div>

              <button className="btn-secondary" onClick={logout}>Logout</button>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}