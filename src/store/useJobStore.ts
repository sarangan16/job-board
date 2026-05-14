import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { JobApplication, Status } from "../types/index";

type StoreState = {
  jobs: JobApplication[];
  searchQuery: string;
  filterStatus: Status | "All";

  addJob: (job: JobApplication) => void;
  updateJob: (id: string, updates: Partial<JobApplication>) => void;
  deleteJob: (id: string) => void;
  moveJob: (id: string, newStatus: Status) => void;
  setSearch: (query: string) => void;
  setFilter: (status: Status | "All") => void;
};

export const useJobStore = create<StoreState>()(
  persist(
    (set) => ({
      jobs: [],
      searchQuery: "",
      filterStatus: "All",

      addJob: (job) => set((state) => ({ jobs: [...state.jobs, job] })),

      updateJob: (id, updates) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === id ? { ...job, ...updates } : job
          ),
        })),

      deleteJob: (id) =>
        set((state) => ({
          jobs: state.jobs.filter((job) => job.id !== id),
        })),

      moveJob: (id, newStatus) =>
        set((state) => ({
          jobs: state.jobs.map((job) =>
            job.id === id
              ? {
                  ...job,
                  status: newStatus,
                  history: [
                    ...job.history,
                    { status: newStatus, changedAt: new Date().toISOString() },
                  ],
                }
              : job
          ),
        })),

      setSearch: (query) => set({ searchQuery: query }),
      setFilter: (status) => set({ filterStatus: status }),
    }),
    { name: "job-tracker" }
  )
);