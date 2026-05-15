import { useJobStore } from "../store/useJobStore";

type props = {
  onLogout: () => void;
};
export default function Navbar({ onLogout}: props){
  const jobs = useJobStore((state) => state.jobs);

  const applied = jobs.filter((j) => j.status === "Applied").length;
  const interviews = jobs.filter((j) => j.status === "Interview").length;
  const offers = jobs.filter((j) => j.status === "Offer").length;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f1117] border-b border-white/5 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-yellow-400 rounded-md" />
          <h1 className="text-lg font-semibold text-white tracking-tight">JobBoard</h1>
        </div>

        <div className="flex items-center gap-3 text-sm">
          
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-medium">{applied} Applied</span>
          <span className="bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1 rounded-full text-xs font-medium">{interviews} Interviews</span>
          <span className="bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full text-xs font-medium">{offers} Offers</span>
          <button
            onClick={onLogout}
            className="ml-4 text-xs pointer text-slate-500 hover:text-white transition"
          >
            Log out
          </button>
        </div>

      </div>
    </nav>
  );
}