import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function AdminTimesheets() {
  const [items, setItems] = useState([]);
  const [employee, setEmployee] = useState('');
  const [message, setMessage] = useState('');
  async function load() { setItems(await api('/admin/timesheets' + (employee ? `?employee=${encodeURIComponent(employee)}` : ''))); }
  useEffect(() => { load().catch(console.error); }, []);
  async function setStatus(id, status) { await api(`/admin/timesheets/${id}`, { method:'PATCH', body: JSON.stringify({ status }) }); setMessage('Status updated.'); load(); }
  async function exportCsv() {
    const { authClient } = await import('../lib/auth');
    const sessionResult = await authClient.getSession();
    const token = sessionResult.data?.session?.token || sessionResult.data?.session?.accessToken;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/timesheets.csv`, { headers: { Authorization: `Bearer ${token}` } });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'timesheets.csv'; a.click(); URL.revokeObjectURL(url);
  }
  return <div className="space-y-6">
    <section className="card flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><h1 className="text-2xl font-bold">Admin Timesheets</h1><p className="text-slate-600">Review, approve, reject, and export submissions.</p></div><div className="flex gap-2"><input className="input" placeholder="Filter employee email" value={employee} onChange={e=>setEmployee(e.target.value)} /><button className="btn-secondary" onClick={load}>Filter</button><button className="btn" onClick={exportCsv}>Export CSV</button></div></section>
    {message && <div className="rounded-xl bg-green-50 p-3 text-green-700">{message}</div>}
    <section className="card overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="py-2">Employee</th><th>Week</th><th>Total</th><th>Status</th><th>Submitted</th><th>Actions</th></tr></thead><tbody>{items.map(t => <tr key={t.id} className="border-b align-top"><td className="py-2">{t.employee_name}<br/><span className="text-slate-500">{t.employee_email}</span></td><td>{t.week_start} to {t.week_end}</td><td>{t.total_hours}</td><td><span className="badge">{t.status}</span></td><td>{new Date(t.submitted_at).toLocaleString()}</td><td className="space-x-2"><button className="underline" onClick={()=>setStatus(t.id,'reviewed')}>Reviewed</button><button className="underline" onClick={()=>setStatus(t.id,'approved')}>Approve</button><button className="underline text-red-700" onClick={()=>setStatus(t.id,'rejected')}>Reject</button></td></tr>)}</tbody></table></section>
  </div>;
}
