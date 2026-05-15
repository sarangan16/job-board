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

        <div className="flex items-center divide-x divide-white/10">
          <div className="flex flex-col items-center px-6">
            <span className="text-lg font-semibold text-white leading-none">{applied}</span>
            <span className="text-xs text-slate-500 mt-1">Applied</span>
          </div>
          <div className="flex flex-col items-center px-6">
            <span className="text-lg font-semibold text-white leading-none">{interviews}</span>
            <span className="text-xs text-slate-500 mt-1">Interviews</span>
          </div>
          <div className="flex flex-col items-center px-6">
            <span className="text-lg font-semibold text-yellow-400 leading-none">{offers}</span>
            <span className="text-xs text-slate-500 mt-1">Offers</span>
          </div>
          <div className="pl-6">
            <button
              onClick={onLogout}
              className="text-xs text-slate-500 hover:text-white transition"
            >
              Log out
            </button>
          </div>
        </div>

      </div>
    </nav>
  );
}