import { useJobStore } from "../store/useJobStore";
import type { JobApplication, Status } from "../types/index";
import JobCard from "./JobCard";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const columns: Status[] = ["Applied", "Interview", "Offer", "Rejected"];

type Props = {
  onEdit: (job: JobApplication) => void;
};

export default function KanbanBoard({ onEdit }: Props) {
  const jobs = useJobStore((state) => state.jobs);
  const searchQuery = useJobStore((state) => state.searchQuery);
  const filterStatus = useJobStore((state) => state.filterStatus);
  const moveJob = useJobStore((state) => state.moveJob);

  const filtered = jobs.filter((job) =>
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const visibleJobs = filterStatus === "All"
    ? filtered
    : filtered.filter((job) => job.status === filterStatus);

  function handleDragEnd(result: any) {
    if (!result.destination) return;
    const jobId = result.draggableId;
    const newStatus = result.destination.droppableId as Status;
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;
    if (job.status === newStatus) return;
    moveJob(jobId, newStatus);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col lg:flex-row gap-4">
        {columns.map((status) => {
          const columnJobs = visibleJobs.filter((j) => j.status === status);
          return (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="flex-1 bg-[#13151f] border border-white/5 rounded-xl p-4"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {/* column header */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-white">{status}</h2>
                    <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full">
                      {columnJobs.length}
                    </span>
                  </div>

                  {/* empty state */}
                  {columnJobs.length === 0 && (
                    <div className="text-slate-500 text-sm text-center py-8">
                      No applications yet
                    </div>
                  )}

                  {/* job cards */}
                  {columnJobs.map((job, index) => (
                    <Draggable key={job.id} draggableId={job.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <JobCard job={job} onEdit={onEdit} />
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}