import { useEffect, useState } from 'react';
import { api } from '../lib/api';

export default function History() {
  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState(null);
  useEffect(() => { api('/timesheets').then(setItems).catch(console.error); }, []);
  return <div className="space-y-6">
    <section className="card"><h1 className="mb-4 text-2xl font-bold">Timesheet History</h1>
      <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead><tr className="border-b"><th className="py-2">Week</th><th>Total</th><th>Status</th><th>Submitted</th><th></th></tr></thead><tbody>
        {items.map(t => <tr key={t.id} className="border-b"><td className="py-2">{t.week_start} to {t.week_end}</td><td>{t.total_hours}</td><td><span className="badge">{t.status}</span></td><td>{new Date(t.submitted_at).toLocaleString()}</td><td><button className="underline" onClick={()=>setSelected(t)}>View</button></td></tr>)}
      </tbody></table></div></section>
    {selected && <section className="card"><h2 className="text-xl font-semibold">Timesheet #{selected.id}</h2><p className="text-slate-600">{selected.employee_name} — {selected.total_hours} hours</p><ul className="mt-4 space-y-2">{selected.entries.map(e => <li className="rounded-xl border p-3" key={e.id}>{e.entry_date}: {e.project_name}, {e.start_time}–{e.end_time}, break {e.break_minutes} min, <strong>{e.total_hours} hrs</strong><br/><span className="text-slate-600">{e.notes}</span></li>)}</ul></section>}
  </div>;
}
