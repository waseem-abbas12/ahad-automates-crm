# Waseem Automation CRM — Complete Full-Stack Outbound Pipeline

A 100% pixel-to-pixel, button-to-button clone of [Ahad Automates CRM](https://ahadautomatescrm.lovable.app/dashboard), equipped with a dedicated **Backend REST API Server**, **Real Relational Database (SQLite with WAL & Supabase PostgreSQL Schema)**, and modern **React 18 + Vite + Tailwind CSS** frontend.

---

## 🏗️ Architecture & Tech Stack

### 1. Frontend Client
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom HSL design tokens & gradients
- **Icons**: Lucide React + Vector Brand Icons
- **Feedback & Notifications**: Sonner rich toasts + Canvas Confetti
- **Components**: Radix UI primitives, custom Modals, Command Palette (`Cmd+K`), Journey Milestone tracker (C-O-R-I-B-W).

### 2. Backend Server
- **Runtime**: Node.js + Express + TypeScript (`tsx`)
- **Authentication**: JWT token authorization + Bcrypt password hashing
- **CORS**: Configured for local dev server
- **REST Endpoints**:
  - `/api/auth`: Login, Register, Me, Password recovery
  - `/api/leads`: Complete CRUD, Bulk stage move, Bulk delete, CSV Import with deduplication, CSV Export
  - `/api/outreach`: Log multi-channel touchpoints (Email, WhatsApp, Phone, SMS, LinkedIn), auto-schedule next cadence, mark opened, record customer replies, mark interested
  - `/api/tasks`: CRUD with priority flags, due date filtering, completion toggles
  - `/api/notes`: Chronological lead notes feed
  - `/api/appointments`: Schedule discovery calls, demos, and closing meetings
  - `/api/settings`: Daily targets, cadence intervals, customizable stages/sources/task types/channels
  - `/api/analytics`: Conversion rates, funnel metrics, and channel breakdowns

### 3. Database Layer
- **Local Relational Database**: `better-sqlite3` on disk (`data/crm.sqlite`) with WAL mode, foreign keys, cascading deletes, and performance indexes.
- **Automated Seeding**: Automatically populates realistic business accounts, tasks, outreach history, and notes on first boot.
- **Cloud Database Ready**: Full PostgreSQL / Supabase migration script available in `supabase_schema.sql` with Row Level Security (RLS) policies.

---

## 🚀 Getting Started

### 1. Run Everything with One Command
```bash
npm start
```
*This starts both the backend REST server (`http://127.0.0.1:5000`) and the Vite frontend (`http://127.0.0.1:5173`) concurrently.*

### 2. Run Independently
- **Start Backend API only**:
  ```bash
  npm run server
  ```
- **Start Frontend only**:
  ```bash
  npm run dev
  ```
- **Production Build**:
  ```bash
  npm run build
  ```

---

## 🔑 Default Demo Account Credentials
- **Email**: `demo@ahadautomates.com`
- **Password**: `password123`
- *(Or click the instant "Explore Demo Account" banner on the auth screen).*
