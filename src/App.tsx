import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import KanbanBoard from "./components/KanbanBoard";
import JobModal from "./components/JobModal";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import type { JobApplication } from "./types/index";
import { supabase } from "./lib/supabase";

export default function App() {
  const [session, setSession] = useState <Session | null>(null);
  const[ loading, setLoading ] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobApplication | null>(null);

  useEffect(() => {
    // check if user is already logged in
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // listener for login / logout. 
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);


  const handleEdit = (job: JobApplication) => {
    setEditingJob(job);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingJob(null);
  };

  if(loading){
    return(
      <div className="min-h-screen bg-slate-900 flex ">
        <p className="text-slate-400 text-sm">Loading...</p>
      </div>
    )
  }
  
  if (!session) {
    if (window.location.pathname === "/register") {
      return <RegisterPage />;
    }
    return <LoginPage />;
  }

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