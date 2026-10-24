import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from '../context/FormContext';
import ProgressDots from '../components/ProgressDots';
import { PlaceholdersAndVanishInput } from '../components/ui/placeholders-and-vanish-input';

const NAME_PLACEHOLDERS = [
  'e.g. Rahul Sharma',
  'e.g. Ananya Deshmukh',
  'e.g. Vikramaditya Patil',
  'e.g. Sneha Kulkarni',
  'Type your full name to begin...',
];

export default function NamePage() {
  const { name, setName } = useForm();
  const [value, setValue] = useState(name);
  const navigate = useNavigate();

  const isValid = value.trim().length >= 2;

  function handleVanishComplete(submittedName) {
    const finalName = (submittedName || value).trim();
    if (finalName.length < 2) return;
    setName(finalName);
    navigate('/branch');
  }

  function handleDirectNext() {
    if (!isValid) return;
    setName(value.trim());
    navigate('/branch');
  }

  return (
    <motion.div
      className="flex-1 flex flex-col justify-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.24, ease: 'easeOut' }}
    >
      <ProgressDots current={1} />

      {/* Heading Block */}
      <div className="mb-7">
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[11px] font-bold tracking-[0.16em] uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            A NEW CHAPTER
          </span>
          <div className="h-px flex-1" style={{ background: 'var(--color-border)' }} />
        </div>

        <h2
          className="text-3xl sm:text-4xl font-bold uppercase tracking-tight leading-tight mb-2"
          style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}
        >
          Let’s start with <span style={{ color: 'var(--color-gold)' }}>your name</span>
        </h2>

        <p
          className="text-sm sm:text-base leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Enter your full name to join the freshers celebration.
        </p>
      </div>

      {/* Dynamic Animated Input with Gold Dissolution Particles */}
      <div className="mb-8">
        <label
          htmlFor="vanish-name-input"
          className="block text-xs font-semibold uppercase tracking-[0.12em] mb-2"
          style={{ color: 'var(--color-gold-paper)', opacity: 0.9 }}
        >
          Full Name
        </label>
        <PlaceholdersAndVanishInput
          id="vanish-name-input"
          placeholders={NAME_PLACEHOLDERS}
          defaultValue={name}
          particleColor="#F4B900"
          onChange={(e) => setValue(e.target.value)}
          onVanishComplete={handleVanishComplete}
        />
      </div>

      {/* Action Button */}
      <div>
        <button
          id="name-next-btn"
          className="btn-primary"
          disabled={!isValid}
          onClick={handleDirectNext}
        >
          <span>Next</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </motion.div>
  );
}
