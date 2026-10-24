import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from '../context/FormContext';
import Confetti from '../components/Confetti';

export default function WelcomePage() {
  const { name, branch } = useForm();
  const navigate = useNavigate();

  // Guard
  useEffect(() => {
    if (!name || !branch) {
      navigate('/', { replace: true });
    }
  }, [name, branch, navigate]);

  if (!name || !branch) return null;

  return (
    <>
      <Confetti count={45} />
      <motion.div
        className="flex-1 flex flex-col items-center justify-center text-center py-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {/* Celebratory Poster Badge with clean SVG insignia */}
        <motion.div
          className="relative mb-6"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 220, damping: 20 }}
        >
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center mx-auto relative"
            style={{
              background: 'radial-gradient(circle at 40% 30%, #2A2415 0%, #11110F 100%)',
              border: '2px solid var(--color-gold)',
              boxShadow: 'var(--shadow-card), var(--shadow-gold)',
            }}
          >
            {/* Inner decorative dotted ring */}
            <div
              className="absolute inset-1.5 rounded-full pointer-events-none"
              style={{
                border: '1px dashed var(--color-gold-deep)',
                opacity: 0.8,
              }}
            />
            {/* Academic graduation celebration SVG insignia */}
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" fill="rgba(244, 185, 0, 0.15)" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
        </motion.div>

        {/* Eyebrow Label */}
        <motion.div
          className="inline-block px-3 py-1 rounded-full mb-3"
          style={{
            background: 'rgba(244, 185, 0, 0.1)',
            border: '1px solid var(--color-border)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <span
            className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            CHECK-IN COMPLETE
          </span>
        </motion.div>

        {/* Display Headline */}
        <motion.h2
          className="text-4xl sm:text-5xl font-black uppercase tracking-tight leading-none mb-2"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-text)',
            letterSpacing: '0.04em',
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          YOU’RE IN!
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl font-bold uppercase tracking-[0.14em] mb-2"
          style={{
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-gold)',
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
        >
          WELCOME JUNIORS
        </motion.p>

        <motion.p
          className="text-base sm:text-lg mb-1 font-medium"
          style={{ color: 'var(--color-text)' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.46 }}
        >
          Hey <span style={{ color: 'var(--color-gold-bright)', fontWeight: 700 }}>{name}</span>!
        </motion.p>

        <motion.p
          className="text-xs sm:text-sm max-w-xs mx-auto mb-8 leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.54 }}
        >
          Step into a new beginning — avenue of music, culture & friendships.
        </motion.p>

        {/* Reveal Button */}
        <motion.div
          className="w-full max-w-[280px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
        >
          <button
            id="reveal-btn"
            className="btn-primary"
            onClick={() => navigate('/poster')}
          >
            <span>Reveal what’s next</span>
            <span aria-hidden="true">→</span>
          </button>
        </motion.div>
      </motion.div>
    </>
  );
}
