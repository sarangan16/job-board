import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleRegister() {
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      setDone(true);
    }

    setLoading(false);
  }

  // show this after successful register
  if (done) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4">
        <div className="bg-[#0f1117] rounded-2xl p-8 w-full max-w-md text-center ">
          <h1 className="text-white text-2xl font-bold mb-2">Check your email</h1>
          <p className="text-slate-400 text-sm">
            We sent a confirmation link to <span className="text-white">{email}</span>. Click it to activate your account.
          </p>
          <a href="/" className="text-yellow-400 text-sm hover:underline mt-6 block">
            Back to login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117] flex items-center justify-center p-4">
      <div className="bg-[#13151f] rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-white text-2xl font-bold mb-2">Create account</h1>
        <p className="text-slate-400 text-sm mb-6">Start tracking your job applications</p>

        {error && (
          <p className="text-red-400 text-sm mb-4">{error}</p>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-slate-400 text-xs block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-[#1c1f2e] text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="text-slate-400 text-xs block mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-[#1c1f2e] text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full mt-6 py-2.5 bg-yellow-500 text-black font-semibold rounded-lg text-sm hover:bg-yellow-400 transition"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-slate-400 text-xs text-center mt-4">
          Already have an account?{" "}
          <a href="/" className="text-yellow-400 hover:underline">
            Log in
          </a>
        </p>

      </div>
    </div>
  );
}