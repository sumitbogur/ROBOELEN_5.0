import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from '../context/FormContext';

export default function PosterPage() {
  const { name, branch } = useForm();
  const navigate = useNavigate();

  // Guard: redirect if form data incomplete
  useEffect(() => {
    if (!name || !branch) {
      navigate('/', { replace: true });
    }
  }, [name, branch, navigate]);

  function handleDownload() {
    const link = document.createElement('a');
    link.href = '/poster.jpg';
    link.download = 'ROBOELEN_5.0_Poster.jpg';
    link.click();
  }

  if (!name || !branch) return null;

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-start py-2"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {/* Eyebrow Label */}
      <div className="flex items-center gap-2 mb-4 w-full justify-center">
        <span
          className="text-[11px] font-bold tracking-[0.16em] uppercase"
          style={{ color: 'var(--color-gold)' }}
        >
          OFFICIAL EVENT POSTER
        </span>
      </div>

      {/* Poster Frame */}
      <div
        className="w-full mb-6 relative overflow-hidden"
        style={{
          borderRadius: 'var(--radius-card)',
          border: '1.5px solid var(--color-border)',
          background: 'var(--color-bg-elevated)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <img
          id="event-poster"
          src="/poster.jpg"
          alt="ROBOELEN 5.0 Official Freshers' Party Poster - Visvesvaraya Technological University Belagavi"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'contain',
            touchAction: 'pinch-zoom',
          }}
          onError={(e) => {
            // Graceful fallback if poster not found
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.nextElementSibling;
            if (fallback) fallback.style.display = 'flex';
          }}
        />

        {/* Fallback container */}
        <div
          className="hidden flex-col items-center justify-center text-center p-8"
          style={{
            minHeight: 280,
            color: 'var(--color-text-muted)',
          }}
        >
          <svg className="w-10 h-10 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-text)' }}>
            Official Poster
          </p>
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Image asset located at <code className="text-gold">public/poster.jpg</code>
          </p>
        </div>
      </div>

      {/* Download Action */}
      <div className="w-full max-w-[280px] mb-4">
        <button
          id="download-poster-btn"
          className="btn-primary"
          onClick={handleDownload}
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a.75.75 0 01.75.75v7.69l2.22-2.22a.75.75 0 111.06 1.06l-3.5 3.5a.75.75 0 01-1.06 0l-3.5-3.5a.75.75 0 111.06-1.06l2.22 2.22V3.75A.75.75 0 0110 3zM3.5 14.25a.75.75 0 01.75.75v1c0 .414.336.75.75.75h10a.75.75 0 00.75-.75v-1a.75.75 0 011.5 0v1A2.25 2.25 0 0115 18.25H5A2.25 2.25 0 012.75 16v-1a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
          <span>Download Poster</span>
        </button>
      </div>

      {/* Closing Warm Message */}
      <p
        className="text-xs text-center font-medium leading-relaxed"
        style={{ color: 'var(--color-gold-paper)', opacity: 0.85 }}
      >
        See you at the party, <span className="font-bold">{name}</span>!
      </p>
      <p
        className="text-[10px] text-center tracking-wider uppercase mt-1"
        style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}
      >
        4th November • Auditorium VTU Belagavi
      </p>
    </motion.div>
  );
}
