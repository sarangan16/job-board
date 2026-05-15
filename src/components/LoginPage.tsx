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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-white text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-slate-400 text-sm mb-4">
          login to board

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
            placeholder="Your Email" 
            className="w-full bg-slate-700 text-white rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="text-slate-400 text-xs block mb-1">
            Password
          </label>
          <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="****" className="w-full bg-slate-700 text-white round-lg px-3 py-2 text-sm" />
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
  )
}