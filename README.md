# 2025YearlyProject-Team4

**Yearly project repository for Team 4 (Batch 2025).** This repository contains a full-stack web application for managing student hackathons, projects, mentors, events, exams and developer programs (DevOrbit).

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
  - [Hackathon components](#hackathon-components)
  - [DevOrbit components](#devorbit-components)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Development commands](#development-commands)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview
A full-stack application that helps manage student hackathons, projects, mentor-student interactions and a developer program called **DevOrbit**. The backend is Node.js/Express with MongoDB (GridFS for uploads), and the frontend is a React application styled with Tailwind CSS.

## Features
- **Authentication & Roles** — Admin, Mentor, Student (see `backend/middleware/auth.js`).
- **Events & Scheduling** — Event creation, schedules and room allocation (`backend/Devstack/Models/schedule.js`, `backend/Devstack/Models/roomallocation.js`).
- **Exams & Scheduler** — Exam model and scheduled jobs (`backend/jobs/examScheduler.js`).
- **Projects & Submissions** — Project flow and submission handling (`backend/models/projects.js`, `backend/models/submissionModel.js`).
- **Teams & Requests** — Team formation, join requests and approvals (`backend/Devstack/Models/hackteam.js`, `backend/Devstack/Models/hackjointeamrequest.js`).
- **Chat & Notifications** — In-app chat and hackathon notifications (`backend/models/chat.js`, `backend/Devstack/Models/HackNotification.js`).
- **File uploads (GridFS)** — Image and file uploads with GridFS (`backend/Devstack/Models/gridfs.js`, `backend/Devstack/middleware/upload.js`).
- **Certificates & Downloads** — Generate and download certificates for participants and mentors (`backend/Devstack/Models/HackCertificate.js`).
- **CSV import** — Bulk student import via CSV (`backend/routes/studentcsv.js`, `backend/middleware/processcsv.js`).

### Hackathon components
This application contains a dedicated Hackathon (Devstack) module that handles everything related to organizing and running hackathons.

Key backend models (located in `backend/Devstack/Models`):
- `HackathonAdmin.js` — admin configuration and management for hackathons
- `hack-reg.js` — registration handling for hack participants
- `hackteam.js`, `hackjointeamrequest.js`, `hackteamrequest.js` — team formation and join flows
- `hacksubmission.js` — submission schema and storage
- `Hackmentor.js`, `mentorfeedback.js` — mentor profiles and feedback
- `problemstatements.js`, `teamprogress.js` — problem statements and team progress tracking
- `Hackvideo.js`, `Hackvideofolder.js`, `HackGalleryImage.js`, `HackGalleryFolder.js`, `Hackfolder.js` — media and gallery management
- `schedule.js`, `roomallocation.js` — scheduling and room allocation
- `HackCertificate.js` — certificate generation for participants/mentors
- `HackNotification.js` — hackathon-specific notifications

Frontend (Devstack hackathon UI lives under `frontend/src/Devstack`):
- Student and Mentor dashboards: `frontend/src/Devstack/Student/*`, `frontend/src/Devstack/Mentor/*`
- Certificates, Hackathons listing, Profiles, Resource pages and Gallery components
- Socket/events: real-time notifications for hackathon events and updates

Use-cases covered by Hackathon components:
- Register participants, form teams, submit projects, run room allocations and schedule events
- Mentor assignment, mentor feedback and certificates
- Display galleries, winners and publish hackathon results

### DevOrbit components
DevOrbit is the developer program / curriculum side of the app. It provides curriculum pages, program overviews, and user-facing content to guide learners.

Key frontend files:
- `frontend/src/hero/curriculumData/data.js` — core curriculum content used by 'DevOrbit' pages
- `frontend/src/hero/*` — pages like About, Curriculum, Contact, FAQs, and Project showcase
- App title and routing are configured for DevOrbit entry points (`frontend/public/index.html`, links within user header that switch views to DevOrbit)

DevOrbit features:
- Curriculum content and learning modules
- Program overview and mentor introductions
- Integrated navigation between main app and DevOrbit pages

## Tech Stack
- Backend: Node.js, Express, Mongoose
- Database: MongoDB (GridFS for file storage)
- Frontend: React, Tailwind CSS
- Scheduler: node-cron / custom scheduler jobs

## Getting Started
### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or hosted)

### Setup
1. Clone the repository
   ```bash
   git clone <repo-url>
   cd 2025YearlyProject-Team4
   ```
2. Backend
   ```bash
   cd backend
   npm install
   # create .env with required variables (see below)
   npm run dev # or npm start for production
   ```
3. Frontend
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Environment Variables
Create a `.env` in `backend/` with entries similar to:
- `MONGO_URI` — MongoDB connection string
- `PORT` — backend port (e.g., 5000)
- `JWT_SECRET` — secret for auth tokens

## Development commands
- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm run dev`

## Project Structure (high-level)
- `backend/` — API, models, routes, middleware, jobs and scheduler
  - `Devstack/` — Hackathon-focused models and GridFS helpers
  - `routes/` — API endpoints grouped by domain (events, exams, teams, chat...)
  - `models/` — general Mongoose models used by the app
- `frontend/` — React app with pages, components and Tailwind config
  - `frontend/src/Devstack/` — Hackathon UI (mentor/student dashboards, resources, certificates)
  - `frontend/src/hero/` — DevOrbit curriculum and public pages

## Contributing
- Fork → Create a branch → Make changes → Open a Pull Request
- Follow existing code style and add tests for new functionality where appropriate.

## License
This project does not currently include a license file. Add `LICENSE` (MIT recommended) if desired.

## Contact
Team 4 — Batch 2025
For questions or help, open an issue or contact the repository maintainers.

---

If you like, I can also:
- add badges (build, coverage, license) ✅
- add screenshots/GIFs or a `CONTRIBUTING.md` file ✨
- add example `.env` and a `LICENSE` file 🔧

Tell me which additions you'd like and any wording changes for the Hackathon or DevOrbit sections.