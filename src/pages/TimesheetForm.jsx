import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

function defaultEntry() { return { entry_date: '', project_name: '', start_time: '09:00', end_time: '17:00', break_minutes: 30, notes: '' }; }
function hours(e) { if (!e.start_time || !e.end_time) return 0; const [sh,sm]=e.start_time.split(':').map(Number); const [eh,em]=e.end_time.split(':').map(Number); return Math.max(0, (((eh*60+em)-(sh*60+sm))-(Number(e.break_minutes)||0))/60).toFixed(2); }

export default function TimesheetForm({ user }) {
  const nav = useNavigate();
  const [form, setForm] = useState({ employee_name: user.name || '', employee_email: user.email, week_start: '', week_end: '', entries: [defaultEntry()] });
  const [error, setError] = useState('');
  const updateEntry = (i, patch) => setForm(f => ({...f, entries: f.entries.map((e, idx) => idx === i ? {...e, ...patch} : e)}));
  const total = form.entries.reduce((sum,e)=>sum+Number(hours(e)),0).toFixed(2);
  async function submit(e) { e.preventDefault(); setError(''); try { await api('/timesheets', { method:'POST', body: JSON.stringify(form) }); nav('/timesheet/history'); } catch (err) { setError(err.message); } }
  return <form onSubmit={submit} className="space-y-6">
    <section className="card grid gap-4 md:grid-cols-2"><div className="md:col-span-2"><h1 className="text-2xl font-bold">New Timesheet</h1>{error && <p className="mt-2 rounded-xl bg-red-50 p-3 text-red-700">{error}</p>}</div>
      <label>Name<input className="input mt-1" value={form.employee_name} onChange={e=>setForm({...form, employee_name:e.target.value})} required /></label>
      <label>Email<input className="input mt-1" type="email" value={form.employee_email} disabled /></label>
      <label>Week start<input className="input mt-1" type="date" value={form.week_start} onChange={e=>setForm({...form, week_start:e.target.value})} required /></label>
      <label>Week end<input className="input mt-1" type="date" value={form.week_end} onChange={e=>setForm({...form, week_end:e.target.value})} required /></label>
    </section>
    <section className="card space-y-4"><div className="flex items-center justify-between"><h2 className="text-xl font-semibold">Daily entries</h2><button type="button" className="btn-secondary" onClick={()=>setForm({...form, entries:[...form.entries, defaultEntry()]})}>Add row</button></div>
      {form.entries.map((entry, i) => <div key={i} className="grid gap-3 rounded-xl border p-3 md:grid-cols-4">
        <input className="input" type="date" value={entry.entry_date} onChange={e=>updateEntry(i,{entry_date:e.target.value})} required />
        <input className="input" placeholder="Project/job" value={entry.project_name} onChange={e=>updateEntry(i,{project_name:e.target.value})} required />
        <input className="input" type="time" value={entry.start_time} onChange={e=>updateEntry(i,{start_time:e.target.value})} required />
        <input className="input" type="time" value={entry.end_time} onChange={e=>updateEntry(i,{end_time:e.target.value})} required />
        <input className="input" type="number" min="0" placeholder="Break minutes" value={entry.break_minutes} onChange={e=>updateEntry(i,{break_minutes:e.target.value})} />
        <input className="input md:col-span-2" placeholder="Notes" value={entry.notes} onChange={e=>updateEntry(i,{notes:e.target.value})} />
        <div className="flex items-center justify-between"><strong>{hours(entry)} hrs</strong>{form.entries.length>1 && <button type="button" className="text-red-700" onClick={()=>setForm({...form, entries:form.entries.filter((_,idx)=>idx!==i)})}>Remove</button>}</div>
      </div>)}
      <div className="flex items-center justify-between border-t pt-4"><strong>Total: {total} hours</strong><button className="btn">Submit Timesheet</button></div>
    </section>
  </form>;
}
