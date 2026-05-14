import { useState } from "react";
import { X } from "lucide-react";
import { useJobStore } from "../store/useJobStore";
import type { JobApplication, Status } from "../types/index";

type Props = {
  onClose: () => void;
  existingJob?: JobApplication;
};

export default function JobModal({ onClose, existingJob }: Props) {
  const addJob = useJobStore((state) => state.addJob);
  const updateJob = useJobStore((state) => state.updateJob);

  // simple useState for each field — very beginner way
  const [company, setCompany] = useState(existingJob?.company || "");
  const [role, setRole] = useState(existingJob?.role || "");
  const [location, setLocation] = useState(existingJob?.location || "");
  const [salary, setSalary] = useState(existingJob?.salary || "");
  const [url, setUrl] = useState(existingJob?.url || "");
  const [status, setStatus] = useState<Status>(existingJob?.status || "Applied");
  const [notes, setNotes] = useState(existingJob?.notes || "");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    // simple validation
    if (!company || !role || !location) {
      setError("Company, Role and Location are required");
      return;
    }

    if (existingJob) {
      updateJob(existingJob.id, { company, role, location, salary, url, status, notes });
    } else {
      addJob({
        id: crypto.randomUUID(),
        company,
        role,
        location,
        salary,
        url,
        status,
        notes,
        appliedDate: new Date().toISOString(),
        history: [{ status, changedAt: new Date().toISOString() }],
      });
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-2xl w-full max-w-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-semibold text-lg">
            {existingJob ? "Edit Application" : "Add Application"}
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        {/* Fields */}
        <div className="space-y-4">

          <div>
            <label className="text-slate-400 text-xs block mb-1">Company *</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google"
              className="w-full bg-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 text-xs block mb-1">Role *</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Frontend Developer"
              className="w-full bg-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 text-xs block mb-1">Location *</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Berlin, Germany"
              className="w-full bg-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-slate-400 text-xs block mb-1">Salary</label>
              <input
                type="text"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                placeholder="e.g. €60,000"
                className="w-full bg-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs block mb-1">Status *</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Status)}
                className="w-full bg-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none"
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-xs block mb-1">Job URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
              className="w-full bg-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 text-xs block mb-1">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Any notes..."
              className="w-full bg-slate-700 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none resize-none"
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg border border-slate-600 text-slate-300 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-lg bg-yellow-500 text-black font-semibold text-sm"
          >
            {existingJob ? "Save Changes" : "Add Job"}
          </button>
        </div>

      </div>
    </div>
  );
}