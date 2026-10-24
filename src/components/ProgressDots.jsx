export default function ProgressDots({ current, total = 2 }) {
  return (
    <div
      className="flex items-center justify-between mb-8 px-1"
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Step ${current} of ${total}`}
    >
      <div className="flex items-center gap-2">
        {Array.from({ length: total }, (_, i) => {
          const step = i + 1;
          const isActive = step === current;
          const isComplete = step < current;

          return (
            <div
              key={step}
              className="transition-all duration-300"
              style={{
                width: isActive ? 28 : 10,
                height: 8,
                borderRadius: 4,
                background: isActive
                  ? 'linear-gradient(135deg, var(--color-gold-bright), var(--color-gold))'
                  : isComplete
                    ? 'var(--color-gold-deep)'
                    : 'var(--color-surface-input)',
                border: isActive
                  ? '1px solid var(--color-gold-bright)'
                  : isComplete
                    ? '1px solid var(--color-gold-deep)'
                    : '1px solid var(--color-border)',
                boxShadow: isActive ? 'var(--shadow-gold)' : 'none',
              }}
              aria-current={isActive ? 'step' : undefined}
            />
          );
        })}
      </div>
      <span
        className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase"
        style={{ color: 'var(--color-gold-paper)', fontFamily: 'var(--font-body)' }}
      >
        STEP {current} OF {total}
      </span>
    </div>
  );
}
