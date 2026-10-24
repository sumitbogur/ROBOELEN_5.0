import { useEffect, useState, useMemo, useRef } from 'react';

const GOLD_PALETTE = [
  '#F4B900', // Mustard gold
  '#FFD23F', // Bright highlight gold
  '#B98200', // Deep vintage gold
  '#E5A910', // Poster title gold
  '#F8D96A', // Warm paper gold
  '#F7F3E8', // Off-white cream
  '#D99A00', // Amber
];

function checkReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function Confetti({ count = 45, duration = 3800 }) {
  const [show, setShow] = useState(() => !checkReducedMotion());
  const styleRef = useRef(null);

  // Generate deterministic pieces for this instance once
  const pieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Deterministic pseudorandom values per piece index
      const seed1 = ((i * 9301 + 49297) % 233280) / 233280;
      const seed2 = ((i * 49297 + 9301) % 233280) / 233280;
      const seed3 = ((i * 12345 + 67891) % 233280) / 233280;

      return {
        id: i,
        color: GOLD_PALETTE[i % GOLD_PALETTE.length],
        left: 4 + seed1 * 92,
        delay: seed2 * 1.6,
        duration: 2.2 + seed3 * 1.5,
        width: 6 + (seed1 * 6),
        height: 8 + (seed2 * 8),
        rotation: seed3 * 360,
        isRound: seed1 > 0.6,
      };
    });
  }, [count]);

  useEffect(() => {
    if (!show) return;

    // Inject keyframes
    if (!document.getElementById('confetti-keyframes')) {
      const style = document.createElement('style');
      style.id = 'confetti-keyframes';
      style.textContent = `
        @keyframes confetti-fall {
          0% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
          75% {
            opacity: 0.9;
          }
          100% {
            opacity: 0;
            transform: translateY(100vh) rotate(540deg) scale(0.6);
          }
        }
      `;
      document.head.appendChild(style);
      styleRef.current = style;
    }

    const timer = setTimeout(() => setShow(false), duration + 2500);
    return () => {
      clearTimeout(timer);
      if (styleRef.current) {
        styleRef.current.remove();
      }
    };
  }, [duration, show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {pieces.map((p) => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            top: '-16px',
            width: `${p.width}px`,
            height: `${p.height}px`,
            backgroundColor: p.color,
            borderRadius: p.isRound ? '50%' : '1px',
            transform: `rotate(${p.rotation}deg)`,
            animation: `confetti-fall ${p.duration}s ease-out ${p.delay}s forwards`,
            opacity: 0,
            boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
          }}
        />
      ))}
    </div>
  );
}
