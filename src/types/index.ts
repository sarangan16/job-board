export type Status = 
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";

  export type StatusHistory = {
  status: Status;
  changedAt: string;
};

export type JobApplication = {
  id: string;
  company: string;
  role: string;
  location: string;
  salary?: string;
  appliedDate: string;
  status: Status;
  url?: string;
  notes?: string;
  history: StatusHistory[];
};