'use client';
import DashboardLayout from '@/components/DashboardLayout';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Department { id: string; name: string }
interface UserOption { id: string; name: string }

export default function ReportsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [departmentId, setDepartmentId] = useState('');
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [includeRatings, setIncludeRatings] = useState(true);
  const [includeComplaints, setIncludeComplaints] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    fetchDepartments();
    fetchUsers();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await fetch('/api/departments');
      if (res.ok) setDepartments(await res.json());
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        // map to simple options
        setUsers(data.map((u: any) => ({ id: u.id, name: u.name })));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleUserSelection = (id: string) => {
    setSelectedUserIds((prev) => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  const generateReport = async () => {
    setIsGenerating(true);
    try {
      const payload = {
        departmentId: departmentId || null,
        userIds: selectedUserIds.length ? selectedUserIds : null,
        startDate: startDate || null,
        endDate: endDate || null,
        includeRatings,
        includeComplaints,
      };

      const res = await fetch('/api/reports/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        console.error('Report generation failed', err);
        toast.error('Failed to generate report');
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report-${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      toast.success('Report generated');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Generate Reports</h1>
          <p className="text-neutral-600 mt-2">Filter and export performance data to Excel.</p>
        </div>

        <div className="card">
          <div className="card-body space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label">Department (optional)</label>
                <select className="input w-full" value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
                  <option value="">All Departments</option>
                  {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                </select>
              </div>

              <div>
                <label className="label">Start Date</label>
                <input type="date" className="input w-full" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              </div>

              <div>
                <label className="label">End Date</label>
                <input type="date" className="input w-full" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="label">Specific Users (optional)</label>
              <div className="max-h-40 overflow-auto border border-neutral-200 rounded p-2 bg-white">
                {users.map(u => (
                  <div key={u.id} className="flex items-center space-x-2 py-1">
                    <input type="checkbox" checked={selectedUserIds.includes(u.id)} onChange={() => toggleUserSelection(u.id)} />
                    <span className="text-sm">{u.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={includeRatings} onChange={(e) => setIncludeRatings(e.target.checked)} />
                <span>Include Ratings</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={includeComplaints} onChange={(e) => setIncludeComplaints(e.target.checked)} />
                <span>Include Complaints</span>
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <button onClick={generateReport} disabled={isGenerating} className="btn btn-primary">
                {isGenerating ? 'Generating...' : 'Generate & Download Excel'}
              </button>
              <button onClick={() => { setDepartmentId(''); setSelectedUserIds([]); setStartDate(''); setEndDate(''); }} className="btn btn-secondary">
                Clear Filters
              </button>
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
