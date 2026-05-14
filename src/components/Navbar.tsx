import { useJobStore } from "../store/useJobStore";

export default function Navbar() {
  const jobs = useJobStore((state) => state.jobs);

  const applied = jobs.filter((j) => j.status === "Applied").length;
  const interviews = jobs.filter((j) => j.status === "Interview").length;
  const offers = jobs.filter((j) => j.status === "Offer").length;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <h1 className="text-xl font-bold text-white">Job Board</h1>

        <div className="flex items-center gap-6 text-sm">
          <span className="text-blue-400 font-medium">{applied} Applied</span>
          <span className="text-yellow-400 font-medium">{interviews} Interviews</span>
          <span className="text-green-400 font-medium">{offers} Offers</span>
        </div>

      </div>
    </nav>
  );
}