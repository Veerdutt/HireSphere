# 🎓 HireSphere - Campus Placement & Recruitment Portal

> **A modern, simple, and organized campus placement management platform connecting graduating students, corporate recruiters, and college placement offices (TPO).**

![React](https://img.shields.io/badge/React-19.x-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

---

## 📌 Overview

**HireSphere** replaces chaotic spreadsheets, scattered Google Forms, and lost email/WhatsApp threads with a centralized, transparent platform for on-campus placements.

It provides dedicated, role-based dashboards for all three core stakeholders in the campus placement ecosystem:

- 👨‍🎓 **Students**: Browse verified campus drives, upload/manage resumes, 1-click apply, and track real-time interview stages.
- 🏢 **Recruiters**: Post hiring requirements with CGPA & branch criteria, screen eligible candidates, and update shortlisting/interview stages.
- 🏛️ **Placement Officers (TPO / Admin)**: Schedule campus company visits, verify student eligibility, approve drives, and maintain clean placement records.

---

## ✨ Key Features

### 🎓 For Students
- **Campus Drive Explorer**: Filter active drives by category (Software, Data Science, Product, Design) with compensation, deadlines, and eligibility details.
- **1-Click Application Flow**: Submit applications instantly with cover notes, GitHub links, and attached resumes.
- **Resume Management**: Upload/update PDF resumes with active document preview and verification badges.
- **Live Application Tracking**: Real-time status tags (`Applied`, `Shortlisted`, `Interviewing`, `Offered`, `Rejected`).

### 🏢 For Recruiters
- **Post Campus Drives**: Simple form to publish on-campus and virtual hiring drives with cutoffs and packages.
- **Applicant Screening Pipeline**: Filter candidates by branch and status, with 1-click actions to shortlist, schedule interviews, or update stages.
- **Candidate Overview**: Inspect applicant profiles, CGPA, and technical skill tags at a glance.

### 🏛️ For Placement Cells (TPO)
- **Drive Scheduling & Approvals**: Review incoming company requests and schedule approved campus drives.
- **Student Eligibility Verification**: Verify student CGPA, branch, and backlog clearance.
- **Institutional Placement Metrics**: High-level statistics on placement rate, registered students, and active drives.

### ⚡ 1-Click Interactive Demo Logins
- Instant 1-click demo accounts to test all 3 roles without manual signup:
  - **Student Account**: Arjun Mehta (`Student`)
  - **Recruiter Account**: John Doe (`Amazon Web Services`)
  - **Admin / TPO Account**: Dr. Arvind Mehta (`Placement Officer`)

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: Simple React `useState` & React Context (`AuthContext`)
- **Persistence**: Browser `localStorage`

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/hiresphere.git
   cd hiresphere
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── admin/                # Admin / TPO subcomponents (Overview, Drives, Students)
│   ├── common/               # Shared UI (JobApplicationModal, StatCard, StatusBadge)
│   ├── recruiter/            # Recruiter subcomponents (Overview, PostDrive, Applicants)
│   ├── student/              # Student subcomponents (Overview, Applications, Jobs, Resume)
│   ├── About.jsx             # About section
│   ├── AdminDashboard.jsx    # Master Admin dashboard container
│   ├── Hero.jsx              # Landing hero banner
│   ├── Navbar.jsx            # Responsive navigation header
│   ├── Explore.jsx           # Public Job/Drive exploration page
│   ├── RecruiterDashboard.jsx# Master Recruiter dashboard container
│   ├── SignInModal.jsx       # 1-Click Demo & Auth Modal
│   └── StudentDashboard.jsx  # Master Student dashboard container
├── context/
│   └── AuthContext.jsx       # Simple role-based authentication & view state
├── data/
│   └── mockData.js           # Centralized demo accounts, jobs, and drives
├── App.jsx                   # Main App component
└── main.jsx                  # React DOM root
```

---
