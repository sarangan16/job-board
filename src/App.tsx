
import Navbar from "./components/Navbar"
import SearchBar from "./components/SearchBar"
import KanbanBoard from "./components/KanbanBoard"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        <SearchBar />
        <KanbanBoard />
      </main>
    </div>
  )
}