import Image from 'next/image';

const frames = [
  { src: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=90', alt: 'Real mattress in a refined bedroom setting', label: 'Support architecture' },
  { src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=90', alt: 'Real mattress and soft bedding', label: 'Pressure relief' },
  { src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1400&q=90', alt: 'Real mattress photographed with premium bedding', label: 'Airflow + alignment' },
];

export function MotionImageWall() {
  return (
    <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2">
      {frames.map((frame, index) => (
        <figure key={frame.src} className={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-[#071f1b] shadow-[0_30px_90px_rgba(0,0,0,.28)] ${index === 0 ? 'md:col-span-7 md:row-span-2' : 'md:col-span-5'}`}>
          <div className={`relative ${index === 0 ? 'h-[520px]' : 'h-[250px]'}`}>
            <Image src={frame.src} alt={frame.alt} fill sizes="(max-width: 768px) 100vw, 55vw" className="object-cover" unoptimized />
            <div className="absolute inset-0 bg-gradient-to-t from-[#041311]/80 via-[#041311]/10 to-transparent" />
            <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-[.16em] text-[#69ead9]">Real mattress photography</span>
                <h3 className="mt-1 text-lg font-bold text-white">{frame.label}</h3>
              </div>
              <span className="rounded-full border border-white/20 bg-[#041311]/65 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-white/80 backdrop-blur-md">Verified context</span>
            </figcaption>
          </div>
        </figure>
      ))}
    </div>
  );
}
