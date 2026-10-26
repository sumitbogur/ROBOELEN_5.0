import React from 'react';

/**
 * CreatorCredit Component
 * Displays a subtle, elegant creator signature: "Crafted with zest by SXM"
 * Styled to harmonize with the ROBOELEN mustard-gold and ink-black poster theme.
 */
export default function CreatorCredit({ className = '', style = {} }) {
  return (
    <div
      id="creator-credit"
      className={`creator-credit inline-flex items-center justify-center text-center select-none pointer-events-auto ${className}`}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '9.5px',
        letterSpacing: '0.14em',
        lineHeight: 1.4,
        ...style,
      }}
      aria-label="Crafted with zest by SXM"
    >
      <span
        style={{
          color: 'rgba(247, 243, 232, 0.62)',
          fontWeight: 400,
        }}
      >
        Crafted with zest by
      </span>
      <span
        style={{
          color: 'var(--color-gold)',
          fontWeight: 600,
          marginLeft: '4px',
          letterSpacing: '0.16em',
        }}
      >
        SXM
      </span>
    </div>
  );
}
