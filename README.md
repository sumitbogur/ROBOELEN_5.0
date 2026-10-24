# ROBOELEN 5.0 – Freshers Party Check-in Website

A mobile-first, multi-step web application built for college freshers party entry registration at Visvesvaraya Technological University (VTU) Belagavi. Juniors scan a QR code at the entrance, complete a fast 2-step check-in (Name -> Branch), get greeted with a celebration screen, and view/download the official event poster.

> **Full Documentation:**
> - Complete technical specs & backend setup: [**ROBOELEN_DETAILS.md**](./ROBOELEN_DETAILS.md)
> - Gold & Black editorial design system: [**THEME_AND_DESIGN.md**](./THEME_AND_DESIGN.md)

---

## Tech Stack
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) + Distressed Gold & Black Editorial Design System
- **Routing:** React Router v7 (`react-router-dom`)
- **Animations:** Framer Motion + Pure CSS Keyframe Confetti Particles (accessible with reduced motion support)
- **State & Storage:** React Context + `sessionStorage` (state preserved across refreshes)
- **Backend:** Google Sheets via Google Apps Script Web App (Free serverless backend)

---

## User Flow
1. **Step 1: Name (`/`)** – Full name input with autofocus and minimum 2-character validation.
2. **Step 2: Branch (`/branch`)** – Selection cards for **ECE**, **VLSI**, and **Robotics and Automation**. Data submits to backend asynchronously on submit.
3. **Step 3: Welcome (`/welcome`)** – Celebration screen with warm gold confetti, personalized greeting, and manual reveal button.
4. **Step 4: Poster (`/poster`)** – Fullscreen official event poster with pinch-to-zoom and download support.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your mobile browser or devtools.

### 3. Production Build
```bash
npm run build
```

---

## 📋 Google Sheets Backend (Quick Setup)
1. Create a Google Sheet named `ROBOELEN 5.0 Check-ins` with header row: `Timestamp | Name | USN | Branch`.
2. Open **Extensions > Apps Script** and paste the code from [ROBOELEN_DETAILS.md](./ROBOELEN_DETAILS.md#5-backend--google-sheets-integration).
3. Deploy as **Web app** (`Execute as: Me`, `Who has access: Anyone`).
4. Copy the deployment URL into `.env`:
   ```env
   VITE_SHEET_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```
