# ROBOELEN 5.0 – Freshers Party Check-in Website

A mobile-first, multi-step check-in web application for college freshers party entry registration.

## Architecture & Flow
```
Entrance QR Code -> Scan
   │
   ▼
1. Name Page (/)           ──> Min 2 chars validation
   │
   ▼
2. Branch Page (/branch)   ──> Single select (ECE / VLSI / Robotics and Automation), auto-submits to Google Sheets
   │
   ▼
3. Welcome Page (/welcome) ──> Gold celebration badge, paper confetti, personalized greeting & manual reveal button
   │
   ▼
4. Poster Page (/poster)   ──> Official event poster with download & pinch-zoom support
```

---

## 🛠️ Tech Stack
- **Framework:** React 19 + Vite 6
- **Styling:** Tailwind CSS v4 (@tailwindcss/vite) + Distressed Gold & Ink Editorial Design System
- **Routing:** React Router v7 (`react-router-dom`)
- **Animations:** Framer Motion + Gold Paper Confetti Particles
- **State & Persistence:** React Context + `sessionStorage` (preserves input across refresh/back navigation)
- **Backend:** Google Sheets via Google Apps Script Web App (zero-cost serverless)

---

## 📋 Google Apps Script Setup (Backend)

1. Open [Google Sheets](https://sheets.new) and create a new spreadsheet named **ROBOELEN 5.0 Check-ins**.
2. Set the header row (Row 1):
   - **Column A:** `Timestamp`
   - **Column B:** `Name`
   - **Column C:** `USN`
   - **Column D:** `Branch`
3. Click **Extensions** > **Apps Script**.
4. Replace the contents of `Code.gs` with the following:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var usn = (data.usn || '').toString().trim().toUpperCase();
    var name = (data.name || '').toString().trim();
    var branch = (data.branch || '').toString().trim();
    var timestamp = data.timestamp || new Date().toISOString();

    // Prevent duplicate entries for the same USN
    var rows = sheet.getDataRange().getValues();
    for (var i = 1; i < rows.length; i++) {
      if (rows[i][2] && rows[i][2].toString().trim().toUpperCase() === usn) {
        // Update existing row
        sheet.getRange(i + 1, 1, 1, 4).setValues([[timestamp, name, usn, branch]]);
        return ContentService.createTextOutput(JSON.stringify({ status: "updated", usn: usn }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Append new row if USN doesn't exist yet
    sheet.appendRow([timestamp, name, usn, branch]);

    return ContentService.createTextOutput(JSON.stringify({ status: "success", usn: usn }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. Click **Deploy** > **New deployment**.
6. Select type: **Web app**.
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone` (essential so incoming student check-ins work without authentication)
7. Click **Deploy** and copy the **Web app URL**.
8. Paste the URL into `.env`:
   ```env
   VITE_SHEET_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
   ```

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Deployment & QR Code

1. Push this repository to GitHub.
2. Connect to [Vercel](https://vercel.com) or [Netlify](https://netlify.com) and deploy (Set environment variable `VITE_SHEET_URL` in the hosting dashboard).
3. Generate a QR code pointing to the live URL.
4. Place the QR code on posters, standees, and entrance banners for students to scan.
