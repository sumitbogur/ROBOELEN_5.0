import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from '../context/FormContext';
import { submitCheckin } from '../lib/submit';
import ProgressDots from '../components/ProgressDots';

const BRANCHES = [
  { id: 'ECE', label: 'ECE', badge: 'EC', desc: 'Electronics & Communication Engineering' },
  { id: 'VLSI', label: 'VLSI', badge: 'VL', desc: 'VLSI Design & Technology' },
  { id: 'Robotics and Automation', label: 'Robotics and Automation', badge: 'RA', desc: 'Robotics & Automation Engineering' },
];

export default function BranchPage() {
  const { name, branch, setBranch, submitted, setSubmitted } = useForm();
  const [selected, setSelected] = useState(branch);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  // Guard: redirect if missing name
  useEffect(() => {
    if (!name) {
      navigate('/', { replace: true });
    }
  }, [name, navigate]);

  async function handleNext() {
    if (!selected) return;
    setBranch(selected);
    setSubmitting(true);

    // Only submit if not already submitted
    if (!submitted) {
      // Fire and forget – don't block the user
      submitCheckin({ name, branch: selected })
        .then(() => setSubmitted(true))
        .catch(() => {
          // Still let the user through
          console.warn('[branch] Submit failed, user continues anyway');
        });
    }

    // Small delay for visual feedback
    await new Promise((r) => setTimeout(r, 400));
    setSubmitting(false);
    navigate('/welcome');
  }

  if (!name) return null;

  return (
    <motion.div
      className="flex-1 flex flex-col justify-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <ProgressDots current={2} total={2} />

      {/* Heading Block */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[11px] font-bold tracking-[0.16em] uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            DEPARTMENT AFFILIATION
          </span>
          <div className="h-px flex-1" style={{ background: 'var(--color-border)' }} />
        </div>

        <h2
          className="text-3xl sm:text-4xl font-bold uppercase tracking-tight leading-tight mb-2"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
        >
          Pick your <span style={{ color: 'var(--color-gold)' }}>branch</span>
        </h2>

        <p
          className="text-sm sm:text-base leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Select your engineering branch to complete check-in.
        </p>
      </div>

      {/* Branch Cards */}
      <div className="flex flex-col gap-3.5 mb-8" role="radiogroup" aria-label="Engineering Branch">
        {BRANCHES.map((b) => {
          const isSelected = selected === b.id;
          const buttonId = b.id === 'Robotics and Automation' ? 'branch-robotics-and-automation-btn' : `branch-${b.id.toLowerCase()}-btn`;

          return (
            <button
              key={b.id}
              id={buttonId}
              role="radio"
              aria-checked={isSelected}
              onClick={() => setSelected(b.id)}
              className="text-left relative overflow-hidden transition-all duration-200"
              style={{
                padding: '18px 20px',
                minHeight: 76,
                borderRadius: 'var(--radius-card)',
                border: isSelected
                  ? '2px solid var(--color-gold)'
                  : '1.5px solid var(--color-border)',
                background: isSelected
                  ? 'rgba(244, 185, 0, 0.08)'
                  : 'var(--color-bg-elevated)',
                boxShadow: isSelected
                  ? '0 8px 24px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(244, 185, 0, 0.2)'
                  : 'var(--shadow-card)',
                cursor: 'pointer',
              }}
            >
              <div className="flex items-center gap-4">
                {/* Monogram code badge instead of emoji */}
                <span
                  className="font-bold text-xs sm:text-sm tracking-wider px-2.5 py-1.5 rounded-lg flex items-center justify-center shrink-0 uppercase"
                  style={{
                    fontFamily: 'var(--font-heading)',
                    background: isSelected
                      ? 'rgba(244, 185, 0, 0.18)'
                      : 'var(--color-surface-input)',
                    border: isSelected
                      ? '1px solid var(--color-gold)'
                      : '1px solid var(--color-border)',
                    color: isSelected ? 'var(--color-gold)' : 'var(--color-text-muted)',
                    minWidth: 40,
                  }}
                  aria-hidden="true"
                >
                  {b.badge}
                </span>

                <div className="flex-1 min-w-0">
                  <div
                    className="font-bold text-lg sm:text-xl uppercase tracking-wide leading-snug"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      color: isSelected ? 'var(--color-gold)' : 'var(--color-text)',
                      transition: 'color 0.2s',
                    }}
                  >
                    {b.label}
                  </div>
                  <div
                    className="text-xs sm:text-sm truncate"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {b.desc}
                  </div>
                </div>

                {/* Custom accessible selection marker */}
                <div
                  className="shrink-0 flex items-center justify-center transition-all duration-200"
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: isSelected
                      ? 'linear-gradient(135deg, var(--color-gold-bright), var(--color-gold))'
                      : 'transparent',
                    border: isSelected
                      ? '1px solid var(--color-gold-bright)'
                      : '1.5px solid var(--color-border)',
                    boxShadow: isSelected ? 'var(--shadow-gold)' : 'none',
                  }}
                  aria-hidden="true"
                >
                  {isSelected && (
                    <span
                      style={{
                        color: 'var(--color-text-on-gold)',
                        fontSize: 14,
                        fontWeight: 900,
                        lineHeight: 1,
                      }}
                    >
                      ✓
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Button Controls */}
      <div className="flex gap-3">
        <button
          id="branch-back-btn"
          className="btn-secondary"
          onClick={() => navigate('/')}
          style={{ width: 'auto', flex: '0 0 auto', paddingInline: 22 }}
        >
          <span aria-hidden="true">←</span>
          <span>Back</span>
        </button>
        <button
          id="branch-next-btn"
          className="btn-primary"
          disabled={!selected || submitting}
          onClick={handleNext}
          style={{ flex: 1 }}
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <span
                className="inline-block animate-spin"
                style={{
                  width: 18,
                  height: 18,
                  border: '2px solid rgba(17,16,11,0.3)',
                  borderTopColor: 'var(--color-text-on-gold)',
                  borderRadius: '50%',
                }}
              />
              <span>Completing Check-in...</span>
            </span>
          ) : (
            <>
              <span>Let’s go</span>
              <span aria-hidden="true">→</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
