import { useState } from "react";
import { Trash2, Pencil, MapPin, Calendar, ChevronDown } from "lucide-react";
import { useJobStore } from "../store/useJobStore";
import type { JobApplication } from "../types/index";
import StatusHistory from "./StatusHistory";

type Props = {
  job: JobApplication;
  onEdit: (job: JobApplication) => void;
};



export default function JobCard({ job, onEdit }: Props) {
  const deleteJob = useJobStore((state) => state.deleteJob);
const [showHistory, setShowHistory] = useState(false);


  const handleDelete = () => {
    if (window.confirm(`Delete ${job.company} application?`)) {
      deleteJob(job.id);
    }
  };
      function getStatusStyle(status: string) {
    if (status === "Applied") return "bg-blue-500/20 text-blue-400";
    if (status === "Interview") return "bg-yellow-500/20 text-yellow-400";
    if (status === "Offer") return "bg-green-500/20 text-green-400";
    if (status === "Rejected") return "bg-red-500/20 text-red-400";
    return "bg-slate-500/20 text-slate-400";
  }



    function getDaysAgo(dateString: string) {
    const appliedDate = new Date(dateString);
    const today = new Date();
    const diffMs = today.getTime() - appliedDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "today";
    if (diffDays === 1) return "1 day ago";
    return `${diffDays} days ago`;
  }
  

  return (
    <div className="bg-[#1c1f2e] rounded-2xl p-5 mb-2.5 border border-white/5 hover:border-yellow-400/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 group">
      
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-white text-base tracking-tight">{job.company}</h3>
          <p className="text-slate-400 text-sm mt-0.5">{job.role}</p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(job)}
            className="p-1.5 hover:bg-white/5 rounded-lg transition opacity-0 group-hover:opacity-100"
          >
            <Pencil className="w-3.5 h-3.5 text-slate-400" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 hover:bg-slate-600 rounded-lg transition"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
        <MapPin className="w-3 h-3" />
        <span>{job.location}</span>
      </div>

      <div className="flex items-center gap-1 text-slate-400 text-xs mb-3">
        <Calendar className="w-3 h-3" />
        <span>Applied {getDaysAgo(job.appliedDate)}</span>
      </div>

      {/* Status badge */}
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusStyle(job.status)}`}>

        {job.status}
      </span>
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="flex items-center gap-1 text-slate-500 text-xs mt-3 hover:text-slate-300 transition"
      >
        <ChevronDown className={`w-3 h-3 transition-transform ${showHistory ? "rotate-180" : ""}`} />
        History
      </button>

      {showHistory && <StatusHistory history={job.history} />}

    </div>
    
  );
}