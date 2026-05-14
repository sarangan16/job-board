import { Search } from "lucide-react";
import { useJobStore } from "../store/useJobStore";
import type { Status } from "../types/index";

const statuses: (Status | "All")[] = ["All", "Applied", "Interview", "Offer", "Rejected"];

export default function SearchBar(){
   const searchQuery = useJobStore((state) => state.searchQuery);
  const filterStatus = useJobStore((state) => state.filterStatus);
  const setSearch = useJobStore((state) => state.setSearch);
  const setFilter = useJobStore((state) => state.setFilter);

  return (
    <div className="flex flex-col gap-4 mb-6">
      
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search company or role..."
          value={searchQuery}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-800 text-white placeholder-slate-400 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-yellow-500"
        />
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              filterStatus === status
                ? "bg-yellow-500 text-black"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

    </div>
  );
}