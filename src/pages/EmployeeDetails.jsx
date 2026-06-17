import { useState } from "react";

export default function EmployeeDetails() {
  const [activeTab, setActiveTab] = useState("personal");
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    middleName: "",
    dob: "1990-06-15",
    gender: "Male",
    nationality: "American",
    personalEmail: "",
    phone: "",
    altPhone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  const update = (field, val) => setForm((f) => ({ ...f, [field]: val }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const tabs = [
    { id: "personal", label: "Personal info" },
    { id: "employment", label: "Employment" },
    { id: "emergency", label: "Emergency contact" },
    { id: "documents", label: "Documents" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xl font-medium flex-shrink-0">
          JD
        </div>
        <div>
          <h1 className="text-xl font-medium text-gray-900 flex items-center gap-2">
            John Doe
            <span className="text-xs font-medium bg-green-100 text-green-800 px-3 py-0.5 rounded-full">Active</span>
          </h1>
          <p className="text-sm text-gray-500">Employee ID: EMP-004821 · Software Engineer · Engineering</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-2 text-sm border-b-2 -mb-px transition-colors ${
              activeTab === t.id
                ? "border-purple-600 text-purple-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Personal Info Tab */}
      {activeTab === "personal" && (
        <>
          {/* Info banner */}
          <div className="bg-purple-50 text-purple-700 text-sm rounded-lg px-4 py-2.5 mb-5">
            ℹ️ Fields marked as read-only are managed by HR. Contact HR to request changes.
          </div>

          {/* Basic Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">Basic details</p>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">First name <span className="text-gray-300">(read-only)</span></label>
                <input className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed" value="John" readOnly />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Middle name</label>
                <input className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300" value={form.middleName} onChange={e => update("middleName", e.target.value)} placeholder="Optional" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Last name <span className="text-gray-300">(read-only)</span></label>
                <input className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed" value="Doe" readOnly />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Date of birth</label>
                <input type="date" className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300" value={form.dob} onChange={e => update("dob", e.target.value)} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Gender</label>
                <select className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300" value={form.gender} onChange={e => update("gender", e.target.value)}>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Nationality</label>
                <input className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300" value={form.nationality} onChange={e => update("nationality", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4">Contact information</p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Work email <span className="text-gray-300">(read-only)</span></label>
                <input className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed" value="john.doe@company.com" readOnly />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Personal email</label>
                <input type="email" className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300" value={form.personalEmail} onChange={e => update("personalEmail", e.target.value)} placeholder="your@email.com" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Phone number</label>
                <input type="tel" className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+1 (555) 000-0000" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Alternate phone</label>
                <input type="tel" className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300" value={form.altPhone} onChange={e => update("altPhone", e.target.value)} placeholder="Optional" />
              </div>
              <div className="flex flex-col gap-1 col-span-2">
                <label className="text-xs text-gray-400">Home address</label>
                <input className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300" value={form.address} onChange={e => update("address", e.target.value)} placeholder="Street address" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">City</label>
                <input className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300" value={form.city} onChange={e => update("city", e.target.value)} placeholder="City" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">State</label>
                <input className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300" value={form.state} onChange={e => update("state", e.target.value)} placeholder="State" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">ZIP code</label>
                <input className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300" value={form.zip} onChange={e => update("zip", e.target.value)} placeholder="00000" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-400">Country</label>
                <select className="text-sm px-3 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300" value={form.country} onChange={e => update("country", e.target.value)}>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save / Cancel */}
          <div className="flex justify-end items-center gap-3 mt-6">
            {saved && <span className="text-sm text-green-700 bg-green-50 px-3 py-1.5 rounded-lg">✓ Changes saved</span>}
            <button className="text-sm px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={handleSave} className="text-sm px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">Save changes</button>
          </div>
        </>
      )}

      {activeTab === "employment" && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm py-16">
          Employment details — coming soon
        </div>
      )}
      {activeTab === "emergency" && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm py-16">
          Emergency contact — coming soon
        </div>
      )}
      {activeTab === "documents" && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 text-center text-gray-400 text-sm py-16">
          Documents — coming soon
        </div>
      )}
    </div>
  );
}