const SHEET_URL = import.meta.env.VITE_SHEET_URL;

/**
 * Submit check-in data to Google Sheets via Apps Script.
 * Uses no-cors mode and text/plain to avoid CORS preflight.
 * Retries up to 2 times on failure, but never blocks the user.
 */
export async function submitCheckin({ name, usn, branch }) {
  if (!SHEET_URL) {
    console.warn('[submit] VITE_SHEET_URL not set – skipping submission');
    return { ok: false, reason: 'no-url' };
  }

  const payload = JSON.stringify({
    name: name.trim(),
    usn: (usn || '').toString().trim().toUpperCase(),
    branch,
    timestamp: new Date().toISOString(),
  });

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: payload,
      });
      console.log('[submit] Data sent successfully');
      return { ok: true };
    } catch (err) {
      console.warn(`[submit] Attempt ${attempt + 1} failed:`, err);
      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }

  return { ok: false, reason: 'network-error' };
}
