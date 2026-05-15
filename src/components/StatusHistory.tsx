import type { StatusHistory as StatusHistoryType } from "../types/index";

type Props = {
  history: StatusHistoryType[];
};

export default function StatusHistory({ history }: Props) {
  if (history.length === 0) {
    return <p className="text-slate-500 text-xs mt-2">No history yet</p>;
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate();
    const year = date.getFullYear();

    // getMonth() returns 0-11 so we need an array
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const month = monthNames[date.getMonth()];

    return `${day} ${month} ${year}`;
  }

  function getDotColor(status: string) {
    if (status === "Applied") return "bg-blue-400";
    if (status === "Interview") return "bg-yellow-400";
    if (status === "Offer") return "bg-green-400";
    if (status === "Rejected") return "bg-red-400";
    return "bg-slate-400";
  }

  return (
    <div className="mt-3 space-y-2">
      {history.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${getDotColor(entry.status)}`} />
          <span className="text-xs text-slate-300 font-medium">{entry.status}</span>
          <span className="text-xs text-slate-500 ml-auto">{formatDate(entry.changedAt)}</span>
        </div>
      ))}
    </div>
  );
}