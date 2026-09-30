'use client';

import type { ReactNode } from 'react';

export function FluidGlassPanel({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-[30px] border border-white/20 bg-white/[0.075] shadow-[0_28px_90px_rgba(0,0,0,.24)] backdrop-blur-2xl ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(255,255,255,.20),transparent_32%),linear-gradient(135deg,rgba(255,255,255,.10),transparent_45%,rgba(31,215,193,.08))]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      <div className="relative">{children}</div>
    </div>
  );
}
