import { Trash2, Pencil, MapPin, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useJobStore } from "../store/useJobStore";
import type { JobApplication } from "../types/index";

type Props = {
  job: JobApplication;
  onEdit: (job: JobApplication) => void;
};

const statusColors: Record<string, string> = {
  Applied: "bg-blue-500/20 text-blue-400",
  Interview: "bg-yellow-500/20 text-yellow-400",
  Offer: "bg-green-500/20 text-green-400",
  Rejected: "bg-red-500/20 text-red-400",
};

export default function JobCard({ job, onEdit }: Props) {
  const deleteJob = useJobStore((state) => state.deleteJob);

  const handleDelete = () => {
    if (window.confirm(`Delete ${job.company} application?`)) {
      deleteJob(job.id);
    }
  };

  return (
    <div className="bg-slate-700 rounded-xl p-4 mb-3 cursor-grab active:cursor-grabbing hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="font-semibold text-white text-sm">{job.company}</h3>
          <p className="text-slate-400 text-xs mt-0.5">{job.role}</p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(job)}
            className="p-1.5 hover:bg-slate-600 rounded-lg transition"
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
      <div className="flex items-center gap-1 text-slate-400 text-xs mb-1">
        <MapPin className="w-3 h-3" />
        <span>{job.location}</span>
      </div>

      <div className="flex items-center gap-1 text-slate-400 text-xs mb-3">
        <Calendar className="w-3 h-3" />
        <span>Applied {formatDistanceToNow(new Date(job.appliedDate))} ago</span>
      </div>

      {/* Status badge */}
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusColors[job.status]}`}>
        {job.status}
      </span>

    </div>
  );
}