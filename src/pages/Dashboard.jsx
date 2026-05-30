import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function Dashboard({ user }) {
  const [items, setItems] = useState([]);
  useEffect(() => { api('/timesheets').then(setItems).catch(console.error); }, []);
  return <div className="space-y-6">
    <section className="card flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div><h1 className="text-3xl font-bold">Welcome, {user.name || user.email}</h1><p className="text-slate-600">Access employee services and company resources.</p></div>
      <Link className="btn text-center" to="/timesheet/new">Submit Timesheet</Link>
    </section>
    <section className="card">
      <h2 className="mb-4 text-xl font-semibold">Recent submissions</h2>
      <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="py-2">Week</th><th>Status</th><th>Total</th><th>Submitted</th></tr></thead><tbody>
        {items.slice(0, 5).map(t => <tr className="border-b" key={t.id}><td className="py-2">{t.week_start} to {t.week_end}</td><td><span className="badge">{t.status}</span></td><td>{t.total_hours}</td><td>{new Date(t.submitted_at).toLocaleString()}</td></tr>)}
        {!items.length && <tr><td className="py-4 text-slate-500" colSpan="4">No timesheets yet.</td></tr>}
      </tbody></table></div>
    </section>
  </div>;
}
