import { useJobStore } from "../store/useJobStore";
import type { JobApplication, Status } from "../types/index";
import JobCard from "./JobCard";

const columns: Status[] = ["Applied", "Interview", "Offer", "Rejected"];

type Props = {
  onEdit: (job: JobApplication) => void;
};

export default function KanbanBoard({ onEdit }: Props) {
  const jobs = useJobStore((state) => state.jobs);
  const searchQuery = useJobStore((state) => state.searchQuery);
  const filterStatus = useJobStore((state) => state.filterStatus);

  const filtered = jobs.filter((job) =>
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleJobs = filterStatus === "All"
    ? filtered
    : filtered.filter((job) => job.status === filterStatus);

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {columns.map((status) => {
        const columnJobs = visibleJobs.filter((j) => j.status === status);
        return (
          <div key={status} className="flex-1 bg-slate-800 rounded-xl p-4">

            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-white">{status}</h2>
              <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full">
                {columnJobs.length}
              </span>
            </div>

            {columnJobs.length === 0 ? (
              <div className="text-slate-500 text-sm text-center py-8">
                No applications yet
              </div>
            ) : (
              columnJobs.map((job) => (
                <JobCard key={job.id} job={job} onEdit={onEdit} />
              ))
            )}

          </div>
        );
      })}
    </div>
  );
}