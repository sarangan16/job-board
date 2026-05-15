# Job Board — Personal Application Tracker

A full-stack job application tracker built with React, TypeScript, and Supabase. Track your job applications through a Kanban-style board with real authentication and cloud storage.

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-green)

---

## Live Demo

Try it without signing up:

- **Email:** `demo@myjob.com`
- **Password:** `654321`

---

## Features

- **Authentication** — Secure email and password login via Supabase Auth
- **Kanban Board** — Visual pipeline across Applied, Interview, Offer, and Rejected columns
- **Drag & Drop** — Move cards between columns by dragging
- **Application Management** — Add, edit, and delete job applications
- **Status History** — Every status change is logged and visible per card
- **Search & Filter** — Filter applications by company, role, or status
- **Cloud Storage** — Jobs saved per user in Supabase — no data lost on refresh
- **Multi-user** — Each user only sees their own applications

---

## How It Works

1. Register a free account or use the demo credentials above
2. Click **+ Add Job** when you apply somewhere — fill in company, role, location
3. When they reply, drag the card to the next column or edit the status
4. The board always shows you where every application stands at a glance

---

## Tech Stack

| Tool                                                     | Purpose          |
| -------------------------------------------------------- | ---------------- |
| [React 18](https://react.dev/)                           | UI framework     |
| [TypeScript](https://www.typescriptlang.org/)            | Type safety      |
| [Vite](https://vitejs.dev/)                              | Build tool       |
| [Tailwind CSS](https://tailwindcss.com/)                 | Styling          |
| [Supabase](https://supabase.com/)                        | Auth + Database  |
| [Zustand](https://zustand-demo.pmnd.rs/)                 | State management |
| [@hello-pangea/dnd](https://github.com/hello-pangea/dnd) | Drag and drop    |
| [Lucide React](https://lucide.dev/)                      | Icons            |

---

## Getting Started Locally

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

### 4. Create the jobs table in Supabase

Go to **Table Editor → New Table**, name it `jobs` and add these columns:

| Column       | Type  |
| ------------ | ----- |
| id           | text  |
| user_id      | uuid  |
| company      | text  |
| role         | text  |
| location     | text  |
| salary       | text  |
| url          | text  |
| notes        | text  |
| status       | text  |
| applied_date | text  |
| history      | jsonb |

Then go to **Authentication → Policies** and add these 4 RLS policies for the `jobs` table:

| Policy                          | Command | Expression             |
| ------------------------------- | ------- | ---------------------- |
| Users can view their own jobs   | SELECT  | `auth.uid() = user_id` |
| Users can insert their own jobs | INSERT  | `auth.uid() = user_id` |
| Users can update their own jobs | UPDATE  | `auth.uid() = user_id` |
| Users can delete their own jobs | DELETE  | `auth.uid() = user_id` |

### 5. Run the app

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
│   ├── KanbanBoard.tsx    # Drag and drop board
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
