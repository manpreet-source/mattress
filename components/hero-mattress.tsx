'use client';

import Image from 'next/image';

const gallery = [
  { src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1600&q=90', alt: 'Real mattress and premium bedroom setting', className: 'absolute inset-x-[8%] top-[8%] h-[62%] w-[84%]' },
  { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=90', alt: 'Real mattress photographed in a modern bedroom', className: 'absolute bottom-[3%] left-[4%] h-[30%] w-[46%]' },
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=90', alt: 'Premium bedding and mattress detail', className: 'absolute bottom-[3%] right-[4%] h-[30%] w-[46%]' },
];

export function HeroMattress() {
  return (
    <div className="relative mx-auto h-[500px] w-full max-w-[700px] sm:h-[650px]" aria-label="Real mattress photography">
      <div className="absolute inset-8 rounded-[42px] bg-white/[.06]" />
      {gallery.map((item, index) => (
        <figure key={item.src} className={`${item.className} overflow-hidden rounded-[30px] border border-white/15 bg-[#102622] shadow-[0_30px_90px_rgba(0,0,0,.42)] ${index === 0 ? 'z-10' : 'z-20'}`}>
          <Image src={item.src} alt={item.alt} fill sizes="(max-width: 768px) 90vw, 600px" className="object-cover" unoptimized priority={index === 0} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041311]/55 via-transparent to-transparent" />
          {index === 0 && <figcaption className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-[#041311]/70 px-4 py-2 text-[10px] font-bold uppercase tracking-[.15em] text-white backdrop-blur-md">Real product context</figcaption>}
        </figure>
      ))}
      <div className="absolute right-[1%] top-[12%] z-30 rounded-2xl border border-white/20 bg-[#f8fbf9]/95 px-4 py-3 text-[#173c35] shadow-xl backdrop-blur-xl">
        <div className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#138d7e]">Built from real data</div>
        <div className="mt-1 text-xs text-[#52635e]">Materials · support · cooling</div>
      </div>
    </div>
  );
}
