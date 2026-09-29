'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const frames = [
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=88', alt: 'Layered premium mattress in a calm bedroom', label: 'Support architecture', className: 'left-[2%] top-[8%] w-[42%] md:left-[7%] md:w-[31%]' },
  { src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=88', alt: 'Soft bedroom and mattress texture', label: 'Pressure relief', className: 'right-[1%] top-[18%] w-[43%] md:right-[8%] md:w-[29%]' },
  { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=88', alt: 'Premium bed with structured support', label: 'Airflow + alignment', className: 'left-[22%] bottom-[3%] w-[52%] md:left-[34%] md:w-[31%]' },
];

export function MotionImageWall() {
  const [active, setActive] = useState(0);
  useEffect(() => { const id = window.setInterval(() => setActive(v => (v + 1) % frames.length), 3200); return () => window.clearInterval(id); }, []);
  return (
    <div className="relative mx-auto h-[520px] max-w-5xl overflow-hidden rounded-[40px] border border-white/10 bg-[#071f1b] shadow-[0_40px_120px_rgba(0,0,0,.35)] sm:h-[620px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(32,215,192,.15),transparent_55%)]" />
      <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#20d7c0]/20 shadow-[0_0_100px_rgba(32,215,192,.14)] animate-[spin_22s_linear_infinite]" />
      {frames.map((frame, index) => (
        <div key={frame.src} className={`absolute ${frame.className} aspect-[4/3] overflow-hidden rounded-[24px] border border-white/15 bg-white/5 shadow-2xl transition-all duration-[1200ms] ${index === active ? 'z-20 scale-[1.04] rotate-0 opacity-100' : 'opacity-65'} ${index % 2 ? 'rotate-2' : '-rotate-2'} hover:z-30 hover:scale-[1.06]`}>
          <Image src={frame.src} alt={frame.alt} fill sizes="(max-width: 768px) 50vw, 32vw" className="object-cover transition duration-[1800ms] hover:scale-110" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041311]/75 via-transparent to-transparent" />
          <span className="absolute bottom-4 left-4 rounded-full border border-white/20 bg-[#041311]/65 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.13em] text-white backdrop-blur-md">{frame.label}</span>
        </div>
      ))}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 gap-2 rounded-full border border-white/10 bg-[#041311]/70 px-3 py-2 backdrop-blur-xl">
        {frames.map((_, index) => <button key={index} aria-label={`Show image ${index + 1}`} onClick={() => setActive(index)} className={`h-1.5 rounded-full transition-all ${index === active ? 'w-8 bg-[#20d7c0]' : 'w-2 bg-white/30'}`} />)}
      </div>
    </div>
  );
}
