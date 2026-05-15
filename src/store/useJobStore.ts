import { create } from "zustand";
import { supabase } from "../lib/supabase";
import type { JobApplication, Status } from "../types/index";

type StoreState = {
  jobs: JobApplication[];
  searchQuery: string;
  filterStatus: Status | "All";

  fetchJobs: () => void;
  addJob: (job: JobApplication) => void;
  updateJob: (id: string, updates: Partial<JobApplication>) => void;
  deleteJob: (id: string) => void;
  moveJob: (id: string, newStatus: Status) => void;
  setSearch: (query: string) => void;
  setFilter: (status: Status | "All") => void;
};

export const useJobStore = create<StoreState>()((set, get) => ({
  jobs: [],
  searchQuery: "",
  filterStatus: "All",

  // load all jobs for the logged in user from supabase
  fetchJobs: async () => {
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .order("applied_date", { ascending: false });

    if (error) {
      console.log("error fetching jobs", error.message);
      return;
    }

    const jobs = data.map((row: any) => ({
      id: row.id,
      company: row.company,
      role: row.role,
      location: row.location,
      salary: row.salary,
      url: row.url,
      notes: row.notes,
      status: row.status,
      appliedDate: row.applied_date,
      history: row.history,
    }));

    set({ jobs });
  },

  addJob: async (job) => {
    // get the current logged in user
    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    if (!user) return;

    const { error } = await supabase.from("jobs").insert({
      id: job.id,
      user_id: user.id,
      company: job.company,
      role: job.role,
      location: job.location,
      salary: job.salary,
      url: job.url,
      notes: job.notes,
      status: job.status,
      applied_date: job.appliedDate,
      history: job.history,
    });

    if (error) {
      console.log("error adding job", error.message);
      return;
    }

    // reload jobs after adding
    get().fetchJobs();
  },

  updateJob: async (id, updates) => {
    const { error } = await supabase
      .from("jobs")
      .update({
        company: updates.company,
        role: updates.role,
        location: updates.location,
        salary: updates.salary,
        url: updates.url,
        notes: updates.notes,
        status: updates.status,
        history: updates.history,
      })
      .eq("id", id);

    if (error) {
      console.log("error updating job", error.message);
      return;
    }

    get().fetchJobs();
  },

  deleteJob: async (id) => {
    const { error } = await supabase
      .from("jobs")
      .delete()
      .eq("id", id);

    if (error) {
      console.log("error deleting job", error.message);
      return;
    }

    get().fetchJobs();
  },

  moveJob: async (id, newStatus) => {
    // find the job first
    const job = get().jobs.find((j) => j.id === id);
    if (!job) return;

    const newHistory = [
      ...job.history,
      { status: newStatus, changedAt: new Date().toISOString() },
    ];

    const { error } = await supabase
      .from("jobs")
      .update({ status: newStatus, history: newHistory })
      .eq("id", id);

    if (error) {
      console.log("error moving job", error.message);
      return;
    }

    get().fetchJobs();
  },

  setSearch: (query) => set({ searchQuery: query }),
  setFilter: (status) => set({ filterStatus: status }),
}));