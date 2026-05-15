import { useState } from "react";
import {supabase} from "../lib/supabase"


export default function LoginPage(){
  return(
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-white text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-slate-400 text-sm mb-4">
          login to board

        </p>

        <div className="space-y-4">
        <div>
          <label className="text-slate-400 text-xs block mb-1">Email</label>
          <input type="email" placeholder="Your Email" className="w-full bg-slate-700 text-white rounded-lg px-3 py-2" />
        </div>

        <div>
          <label className="text-slate-400 text-xs block mb-1">
            Password
          </label>
          <input type="password" placeholder="****" className="w-full bg-slate-700 text-white round-lg px-3 py-2 text-sm" />
        </div>
        </div>
        <button className="w-full mt-6 py-2.5 bg-yellow-400 text-black font-semibold rounded-lg text-sm hover:bg-yellow-400 transition">

        </button>
        <p className="text-slate-400 text-xs text-center mt-4">
          No account? {" "}
          <a href="" className="text-yellow-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  )
}