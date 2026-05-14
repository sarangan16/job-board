import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import KanbanBoard from "./components/KanbanBoard";
import JobModal from "./components/JobModal";
import type { JobApplication } from "./types/index";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null);

  const handleEdit = (job: JobApplication) => {
    setEditingJob(job);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <main className="pt-24 px-6 max-w-7xl mx-auto">

        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold text-white">My Applications</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg text-sm hover:bg-yellow-400 transition"
          >
            + Add Job
          </button>
        </div>

        <SearchBar />
        <KanbanBoard onEdit={handleEdit} />

        {(isModalOpen || editingJob !== null) && (
          <JobModal
            onClose={handleClose}
            existingJob={editingJob ?? undefined}
          />
        )}

      </main>
    </div>
  );
}