import { motion } from 'framer-motion';
import { SonarGrid } from './ui/sonar-grid';
import CreatorCredit from './CreatorCredit';

export default function Layout({ children }) {
  return (
    <SonarGrid
      id="app-root-sonar"
      color="#F4B900"
      baseOpacity={0.22}
      dotRadius={1.25}
      spacing={26}
      speed={220}
      ringWidth={85}
      amplitude={2.0}
      pingEvery={3.5}
      interactive={true}
      className="app-background flex flex-col items-center min-h-[100svh] relative overflow-x-hidden !cursor-default"
    >
      {/* Subtle print texture grain overlay */}
      <div className="texture-overlay pointer-events-none" aria-hidden="true" />

      {/* Decorative distressed top accent inspired by poster brushwork */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-32 opacity-25"
        style={{
          background: 'radial-gradient(ellipse at 50% -20%, rgba(244, 185, 0, 0.35) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <motion.header
        className="w-full pt-6 pb-4 text-center relative z-10 px-4"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        {/* University / Event eyebrow */}
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <span
            className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-gold-paper)', opacity: 0.9 }}
          >
            VTU BELAGAVI
          </span>
          <span style={{ color: 'var(--color-border)' }}>•</span>
          <span
            className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-gold)' }}
          >
            FRESHERS’ PARTY
          </span>
        </div>

        {/* Poster Wordmark */}
        <h1
          className="text-2xl sm:text-3xl font-black uppercase tracking-[0.14em] leading-none"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-gold)',
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
          }}
        >
          ROBOELEN 5.0
        </h1>

        {/* Poster decorative rule */}
        <div className="max-w-[200px] mx-auto mt-2.5">
          <hr className="poster-rule" />
        </div>
      </motion.header>

      {/* Main registration container */}
      <main className="flex-1 flex flex-col w-full max-w-[448px] px-5 pb-6 sm:pb-8 relative z-10">
        {children}
      </main>

      {/* Shared Footer / Subtle Creator Signature */}
      <footer
        className="w-full relative z-10 text-center pb-3 pt-1 px-4 mt-auto flex justify-center items-center pointer-events-auto"
        style={{
          paddingBottom: 'max(12px, calc(env(safe-area-inset-bottom, 0px) + 8px))',
        }}
      >
        <CreatorCredit />
      </footer>
    </SonarGrid>
  );
}
