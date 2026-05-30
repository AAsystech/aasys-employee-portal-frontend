import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

const services = [
  {
    title: 'Timesheet',
    icon: '⏱️',
    desc: 'Submit and track your weekly timesheets.',
    active: true,
    link: '/timesheet/new',
  },
  {
    title: 'Trainings',
    icon: '🎓',
    desc: 'Access assigned trainings and courses.',
    active: false,
  },
  {
    title: 'Employee Details',
    icon: '👤',
    desc: 'View and update your profile information.',
    active: false,
  },
  {
    title: 'Pay Stubs',
    icon: '💵',
    desc: 'View payroll and pay stub information.',
    active: false,
  },
  {
    title: 'Company Documents',
    icon: '📁',
    desc: 'Access policies, forms, and HR documents.',
    active: false,
  },
];

export default function Dashboard({ user }) {
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    api('/timesheets').then(setItems).catch(console.error);
  }, []);

  function comingSoon(title) {
    setMessage(`${title} service is coming soon.`);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="space-y-6 xl:col-span-2">
        <section className="card overflow-hidden">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="mb-2 text-sm font-semibold text-blue-700">Employee Portal</p>
              <h1 className="text-3xl font-bold">
                Welcome back, {user.name || user.email}!
              </h1>
              <p className="mt-2 text-slate-600">
                Access employee services, company resources, and timesheet tools.
              </p>
            </div>

            <div className="rounded-2xl bg-blue-50 px-6 py-5 text-center">
              <div className="text-4xl">👨‍💻</div>
              <p className="mt-2 text-sm font-semibold text-slate-700">Employee Workspace</p>
            </div>
          </div>
        </section>

        {message && (
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-800">
            {message}
          </div>
        )}

        <section className="card">
          <h2 className="mb-5 text-xl font-bold">My Services</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) =>
              service.active ? (
                <Link
                  key={service.title}
                  to={service.link}
                  className="rounded-2xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{service.desc}</p>
                  <p className="mt-4 font-semibold text-blue-700">Open →</p>
                </Link>
              ) : (
                <button
                  key={service.title}
                  type="button"
                  onClick={() => comingSoon(service.title)}
                  className="rounded-2xl border bg-white p-5 text-left transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-bold">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{service.desc}</p>
                  <span className="mt-4 inline-block rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                    Coming Soon
                  </span>
                </button>
              )
            )}
          </div>
        </section>

        <section className="card">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Timesheet Submissions</h2>
            <Link to="/timesheet/history" className="text-sm font-semibold text-blue-700">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b bg-slate-50">
                  <th className="p-3">Week</th>
                  <th>Status</th>
                  <th>Total Hours</th>
                  <th>Submitted On</th>
                </tr>
              </thead>
              <tbody>
                {items.slice(0, 5).map((t) => (
                  <tr className="border-b" key={t.id}>
                    <td className="p-3">{t.week_start} to {t.week_end}</td>
                    <td><span className="badge">{t.status}</span></td>
                    <td>{t.total_hours}</td>
                    <td>{new Date(t.submitted_at).toLocaleString()}</td>
                  </tr>
                ))}

                {!items.length && (
                  <tr>
                    <td className="p-4 text-slate-500" colSpan="4">
                      No timesheets yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="card">
          <h2 className="mb-4 text-xl font-bold">Announcements</h2>

          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-4">
              <h3 className="font-semibold">Company Holiday</h3>
              <p className="mt-1 text-sm text-slate-600">
                Office holiday schedule will be updated here.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <h3 className="font-semibold">Training Program</h3>
              <p className="mt-1 text-sm text-slate-600">
                New employee training modules are coming soon.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <h3 className="font-semibold">Policy Updates</h3>
              <p className="mt-1 text-sm text-slate-600">
                HR and company policy updates will appear here.
              </p>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="mb-4 text-xl font-bold">Quick Links</h2>

          <div className="space-y-3 text-sm">
            <button onClick={() => comingSoon('Company Website')} className="block w-full rounded-xl border p-3 text-left hover:bg-slate-50">
              Company Website ↗
            </button>
            <button onClick={() => comingSoon('HR Policies')} className="block w-full rounded-xl border p-3 text-left hover:bg-slate-50">
              HR Policies ↗
            </button>
            <button onClick={() => comingSoon('IT Support')} className="block w-full rounded-xl border p-3 text-left hover:bg-slate-50">
              IT Support ↗
            </button>
            <button onClick={() => comingSoon('Leave Request')} className="block w-full rounded-xl border p-3 text-left hover:bg-slate-50">
              Leave Request ↗
            </button>
          </div>
        </section>
      </aside>
    </div>
  );
}