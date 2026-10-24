# ROBOELEN 5.0 – Freshers Party Check-in Website Specification & Details

A mobile-first, multi-step web application built for seamless student entrance check-in at **ROBOELEN 5.0** (Freshers Party). Incoming juniors scan a physical QR code at the entrance, complete a fast 3-step check-in, receive a personalized welcome screen, and reveal the official event poster.

---

## 📑 Table of Contents
1. [Project Overview](#1-project-overview)
2. [Complete User Journey & Flow](#2-complete-user-journey--flow)
3. [Page-by-Page Specifications](#3-page-by-page-specifications)
4. [State Management & Data Persistence](#4-state-management--data-persistence)
5. [Backend & Google Sheets Integration](#5-backend--google-sheets-integration)
6. [Design System & Cyberpunk Theme](#6-design-system--cyberpunk-theme)
7. [Project Directory & File Structure](#7-project-directory--file-structure)
8. [Setup, Execution & Deployment Guide](#8-setup-execution--deployment-guide)

---

## 1. Project Overview

- **Event Name:** ROBOELEN 5.0
- **Target Audience:** First-year engineering college juniors (100% mobile users on smartphones)
- **Primary Objective:** Ultra-fast, frictionless entry check-in with zero queue stalling, automated data logging into Google Sheets, and high-impact visual presentation.
- **Tech Stack:**
  - **Framework:** React 19 + Vite 6
  - **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) + Custom Design Tokens
  - **Routing:** React Router v7 (`react-router-dom`)
  - **Animations & Transitions:** Framer Motion + Pure CSS Keyframe Confetti Engine
  - **State Storage:** React Context API + `sessionStorage`
  - **Serverless Backend:** Google Sheets via Google Apps Script Web App (zero maintenance, completely free)

---

## 2. Complete User Journey & Flow

```
Entrance QR Code (Printed on Standee/Banner)
                   │
                   ▼ (Scanned via smartphone camera)
   ┌───────────────────────────────────────────────┐
   │             Page 1: Name (/)                  │
   │  • Asks for full name                         │
   │  • Validates minimum 2 characters             │
   └──────────────────────┬────────────────────────┘
                          │ (Click Next / Press Enter)
                          ▼
   ┌───────────────────────────────────────────────┐
   │            Page 2: Branch (/branch)           │
   │  • Select one: ECE, VLSI, or Robotics & Auto  │
   │  • Gold border card highlight + checkmark     │
   │  • Submits data asynchronously to Sheets     │
   └──────────────────────┬────────────────────────┘
                          │ (Click "Let’s go →")
                          ▼
   ┌───────────────────────────────────────────────┐
   │           Page 3: Welcome (/welcome)          │
   │  • Gold celebration emblem with paper confetti│
   │  • "You're in!"                               │
   │  • "Welcome Juniors"                          │
   │  • "Hey {name}!"                              │
   │  • Manual reveal button                       │
   └──────────────────────┬────────────────────────┘
                          │ (Click "Reveal what's next →")
                          ▼
   ┌───────────────────────────────────────────────┐
   │            Page 4: Poster (/poster)           │
   │  • Official ROBOELEN 5.0 event poster         │
   │  • Touch-friendly object-contain & pinch zoom │
   │  • "Download Poster" button                   │
   └───────────────────────────────────────────────┘
```

---

## 3. Page-by-Page Specifications

### Page 1 – Name (`/`)
- **Route:** `/`
- **Heading:** `Let’s start with your name`
- **Subheading:** `Enter your full name to join the freshers celebration.`
- **Input:** Single text field with auto-focus (`id="name-input"`).
- **Validation:** Minimum 2 trimmed characters required.
- **Button:** `Next →` (`id="name-next-btn"`). Disabled until valid; supports pressing `Enter` to proceed.
- **Progress:** `Step 1 of 2` gold pill indicator.

### Page 2 – Branch (`/branch`)
- **Route:** `/branch`
- **Heading:** `Pick your branch`
- **Subheading:** `Select your engineering branch to complete check-in.`
- **Selection Options:** 3 interactive branch cards:
  1. **ECE** (`Electronics & Communication Engineering`)
  2. **VLSI** (`VLSI Design & Technology`)
  3. **Robotics and Automation** (`Robotics & Automation Engineering`)
- **Interactive State:** Selected card receives a 2px warm gold border, warm-gold tinted background, and a gold checkmark badge (`✓`).
- **Submission Action:** On clicking `Let’s go →`, data is dispatched to the Google Sheets backend asynchronously. The user transitions to the welcome screen without blocking even if network connectivity lags.
- **Route Guard:** Redirects to `/` if name is absent.
- **Progress:** `Step 2 of 2` gold pill indicator.

### Page 3 – Welcome (`/welcome`)
- **Route:** `/welcome`
- **Visuals:**
  - Refined celebratory gold emblem with celebration icon (`🎉`).
  - Warm gold vignette background and print grain texture overlay.
  - Paper-like gold & cream confetti burst animating from the top of the viewport.
- **Typography:**
  - Big Display Headline: `YOU’RE IN!` (Anton condensed)
  - Sub-Headline: `WELCOME JUNIORS` (Oswald)
  - Personalized Greeting: `Hey {name}!`
  - Teaser: `Step into a new beginning — avenue of music, culture & friendships.`
- **Action Button:** Gold primary button: `Reveal what's next ✨` which navigates to `/poster`.
- **Route Guard:** Direct visits without completed form data redirect to `/`.

### Page 5 – Poster (`/poster`)
- **Route:** `/poster`
- **Content:** Full-screen display of the official **ROBOELEN 5.0** event poster (`/public/poster.jpg`).
- **Mobile Optimizations:**
  - `object-fit: contain` ensures the entire artwork fits inside all phone screens (360px–430px widths) without cropping.
  - `touch-action: pinch-zoom` allows zooming in on details.
  - Built-in graceful fallback placeholder if the image cannot be found.
- **Actions:**
  - `📥 Download Poster` button triggers a direct download of `ROBOELEN_5.0_Poster.jpg`.
  - Closing message: `See you at the party, {name}! 🎊`

---

## 4. State Management & Data Persistence

- **Context Provider (`FormContext.jsx`):**
  - Holds `name`, `usn`, `branch`, and `submitted` boolean state.
- **Persistence (`sessionStorage`):**
  - Key: `roboelen-form`
  - Every field change is instantly saved to `sessionStorage`.
  - Students accidentally refreshing the browser or tapping their browser's native back button will **not** lose their progress.
- **Duplicate Prevention:**
  - Once submitted, `submitted` state flag is set to `true` to avoid duplicate POST calls if the user navigates back and forward again.

---

## 5. Backend & Google Sheets Integration

### Data Structure Logged
| Field | Type | Description |
|---|---|---|
| `timestamp` | ISO String | Automated server timestamp (`YYYY-MM-DDTHH:mm:ss.sssZ`) |
| `name` | String | Student's full name (trimmed) |
| `usn` | String | 10-character USN (uppercase) |
| `branch` | Enum | `ECE` \| `VLSI` \| `RI` |

### Non-blocking Submission (`src/lib/submit.js`)
- Sends request with `mode: "no-cors"` and `Content-Type: text/plain` to eliminate CORS preflight handshake delays.
- Includes automatic retries (up to 3 attempts with exponential backoff).
- Never halts or delays the student's entry flow even in poor connectivity areas.

### Google Apps Script Code (`Code.gs`)
```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var usn = (data.usn || '').toString().trim().toUpperCase();
    var name = (data.name || '').toString().trim();
    var branch = (data.branch || '').toString().trim();
    var timestamp = data.timestamp || new Date().toISOString();

    // Deduplication check based on USN
    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][2] && rows[i][2].toString().trim().toUpperCase() === usn) {
        // Update existing row if duplicate USN is submitted
        sheet.getRange(i + 1, 1, 1, 4).setValues([[timestamp, name, usn, branch]]);
        return ContentService.createTextOutput(JSON.stringify({ status: "updated", usn: usn }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Append new student entry
    sheet.appendRow([timestamp, name, usn, branch]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", usn: usn }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

---

## 6. Design System & Poster Editorial Theme

### Color Palette
- **Ink-Black Base (`--color-bg`):** `#080807`
- **Elevated Card Surface (`--color-bg-elevated`):** `#11110f`
- **Secondary Surface (`--color-bg-soft`):** `#1b1a16`
- **Input Surface (`--color-surface-input`):** `#171612`
- **Border / Divider (`--color-border`):** `#49402a`
- **Primary Mustard-Gold (`--color-gold`):** `#f4b900`
- **Bright Gold Highlight (`--color-gold-bright`):** `#ffd23f`
- **Deep Gold (`--color-gold-deep`):** `#b98200`
- **Warm Gold Paper (`--color-gold-paper`):** `#f8d96a`
- **Primary Text (`--color-text`):** `#f7f3e8`
- **Muted Helper Text (`--color-text-muted`):** `#b9b3a4`
- **Text on Gold (`--color-text-on-gold`):** `#11100b`
- **Error Warning (`--color-error`):** `#f06a57`
- **Success Tone (`--color-success`):** `#9ccb78`

### Typography
- **Display Headings (`--font-display`):** `Anton`, `Oswald`, Impact, sans-serif
- **Section Headings & Steps (`--font-heading`):** `Oswald`, `Inter`, sans-serif
- **Body & Controls (`--font-body`):** `Inter`, Arial, sans-serif
- **Editorial Accent (`--font-serif`):** `Playfair Display`, Georgia, serif

### Micro-Interactions & Textures
- Tactile print grain overlay (`.texture-overlay`) using lightweight SVG noise at 4.5% opacity.
- Warm golden top vignette echoing the official event poster’s energy.
- Poster decorative rule (`.poster-rule`) with gold gradient fade.
- Paper-like gold confetti burst on welcome completion, respecting `prefers-reduced-motion`.
- Purposeful, rapid page transitions (0.24s fade & vertical slide) via Framer Motion.

---

## 7. Project Directory & File Structure

```
ROBOELEN/
├── .env                       # Environment variables (VITE_SHEET_URL)
├── index.html                 # HTML shell, preconnected Google Fonts, SEO tags
├── package.json               # Dependencies and build scripts
├── vite.config.js             # Vite 6 config with Tailwind CSS v4 & React plugin
├── public/
│   ├── favicon.svg            # Custom neon 'R' SVG icon
│   └── poster.jpg             # High-res ROBOELEN 5.0 event poster
├── src/
│   ├── main.jsx               # React DOM root entry point
│   ├── App.jsx                # Router, AnimatedRoutes, FormProvider wrapper
│   ├── index.css              # Tailwind v4 theme tokens, animations, inputs & buttons
│   ├── components/
│   │   ├── Layout.jsx         # Global shell with ROBOELEN 5.0 header & neon background
│   │   ├── ProgressDots.jsx   # 3-step dynamic neon pill progress indicator
│   │   └── Confetti.jsx       # CSS particle celebration engine
│   ├── context/
│   │   └── FormContext.jsx    # Central state provider with sessionStorage sync
│   ├── lib/
│   │   └── submit.js          # Google Sheets backend fetcher with retry & error resilience
│   └── pages/
│       ├── NamePage.jsx       # Step 1: Name input & validation
│       ├── UsnPage.jsx        # Step 2: USN formatting & validation
│       ├── BranchPage.jsx     # Step 3: Branch cards selection & async submission
│       ├── WelcomePage.jsx    # Step 4: Celebration screen ("Welcome Juniors")
│       └── PosterPage.jsx     # Step 5: Fullscreen poster view & download
├── project.md                 # Brief setup reference
└── ROBOELEN_DETAILS.md        # Comprehensive technical specification document
```

---

## 8. Setup, Execution & Deployment Guide

### Local Development
```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# Server accessible at http://localhost:5173/

# 3. Production build test
npm run build
```

### Backend Setup (Google Sheets)
1. Go to [Google Sheets](https://sheets.new) and create a sheet called `ROBOELEN 5.0 Check-ins`.
2. Set headers on Row 1: `Timestamp`, `Name`, `USN`, `Branch`.
3. Go to **Extensions** > **Apps Script**, paste the `doPost(e)` code from section 5.
4. Click **Deploy** > **New deployment** > **Web app**.
   - Execute as: `Me`
   - Access: `Anyone`
5. Copy the generated URL into `.env`:
   ```env
   VITE_SHEET_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

### Free Deployment (Vercel / Netlify)
1. Connect this repository to **Vercel** or **Netlify**.
2. Add environment variable `VITE_SHEET_URL` with your Google Apps Script Web App URL.
3. Deploy to generate your production URL (e.g., `https://roboelen5.vercel.app`).
4. Generate a QR code using [qr-code-generator.com](https://www.qr-code-generator.com/) pointing to that live URL.
5. Print the QR code on the college entrance banners or standees.
