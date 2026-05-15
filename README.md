# Job Board — Application Tracker

A full-stack job application tracker built with React, TypeScript, and Supabase. Track your job applications through a Kanban-style board with real-time status updates and authentication.

---

## Features

- **Authentication** — Secure email and password login via Supabase Auth
- **Kanban Board** — Visual pipeline across Applied, Interview, Offer, and Rejected columns
- **Application Management** — Add, edit, and delete job applications
- **Status History** — Every status change is logged and visible per card
- **Search & Filter** — Filter applications by company, role, or status
- **Persistent Data** — Jobs saved per user via Zustand with local persistence

---

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) — build tool
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [Supabase](https://supabase.com/) — authentication
- [Zustand](https://zustand-demo.pmnd.rs/) — state management
- [Lucide React](https://lucide.dev/) — icons

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sarangan16/job-board.git
cd job-board
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

Create a free project at [supabase.com](https://supabase.com), then go to **Project Settings → API** and copy your Project URL and publishable key.

Create a `.env` file in the root of the project:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── components/
│   ├── JobCard.tsx        # Individual application card
│   ├── JobModal.tsx       # Add / edit form
│   ├── KanbanBoard.tsx    # Four-column board layout
│   ├── LoginPage.tsx      # Login screen
│   ├── Navbar.tsx         # Top navigation with stats
│   ├── RegisterPage.tsx   # Register screen
│   ├── SearchBar.tsx      # Search and filter controls
│   └── StatusHistory.tsx  # Status change timeline
├── lib/
│   └── supabase.ts        # Supabase client
├── store/
│   └── useJobStore.ts     # Zustand store
├── types/
│   └── index.ts           # Shared TypeScript types
└── App.tsx                # Root component + auth logic
```

---

## Author

**sarangan16** — [github.com/sarangan16](https://github.com/sarangan16)
