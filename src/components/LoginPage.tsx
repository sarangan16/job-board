import { useState } from "react";
import {supabase} from "../lib/supabase"


export default function LoginPage(){


   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    }

    setLoading(false);
  }
  return(
    <div className="min-h-screen bg-[#0f1117] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-[#13151f] rounded-2xl border border-white/5 overflow-hidden grid md:grid-cols-2">
      <div className="p-10 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">

        <p className="text-yellow-400 text-sm mb-3 uppercase tracking-widest">
          Job Board
        </p>

          <h3 className="text-white text-2xl font-bold leading-tight mb-4">
            Organize your job search in one place
          </h3>


        <p className="text-slate-400 text-sm leading-7 mb-8">
            Built originally as a personal tool during the job search process in Germany,
  Job Board helps candidates organize applications, interviews, offers, and
  rejections in one simple workflow. Designed for people applying to multiple
  roles every week, without the complexity of spreadsheets or bulky productivity tools.
        </p>

        

      </div>
       <div className="p-10">
        <h1 className="text-white text-2xl font-bold mb-2 uppercase">Login</h1>
        <p className="text-slate-400 text-sm mb-4">
          Keep track of your applications

        </p>
         {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}


        <div className="space-y-4">
        <div>
          <label className="text-slate-400 text-xs block mb-1">Email</label>
          <input type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            className="w-full bg-[#1c1f2e] text-white rounded-lg px-3 py-2.5 text-sm border border-white/5 focus:outline-none focus:border-yellow-400/50" />
        </div>

        <div>
          <label className="text-slate-400 text-xs block mb-1">
            Password
          </label>
          <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password" className="w-full bg-[#1c1f2e] text-white rounded-lg px-3 py-2.5 text-sm border border-white/5 focus:outline-none focus:border-yellow-400/50" />
        </div>
        </div>

         <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-6 py-2.5 bg-yellow-500 text-black font-semibold rounded-lg text-sm hover:bg-yellow-400 transition"
        >
          {loading ? "Logging in..." : "Log In"}
        </button>


        <p className="text-slate-400 text-xs text-center mt-4">
          No account? {" "}
          <a href="/register" className="text-yellow-400 hover:underline">
            Register
          </a>
        </p>
      </div>
     
    </div>
     <footer className="mt-6 text-xs text-slate-500 text-center">
      @RAAVN
    </footer>
    </div>
  )
}