import Image from 'next/image';

const layers = [
  { n: '01', name: 'Cooling cover', signal: 'Heat & airflow', copy: 'Surface materials influence how quickly heat and moisture move away from the sleeper.', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=88', alt: 'Close view of premium mattress and bedding fabric' },
  { n: '02', name: 'Comfort layer', signal: 'Pressure relief', copy: 'The upper comfort system shapes pressure distribution around shoulders, hips and other contact points.', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1200&q=88', alt: 'Premium bedding material detail' },
  { n: '03', name: 'Transition layer', signal: 'Alignment', copy: 'A transition system helps balance contouring with the support needed to keep the body aligned.', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=88', alt: 'Mattress in a premium bedroom setting' },
  { n: '04', name: 'Core support', signal: 'Support & durability', copy: 'The underlying support system is where construction, body profile and sleep position meet.', image: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?auto=format&fit=crop&w=1200&q=88', alt: 'Mattress product context in a bedroom' },
];

export function MattressConstruction() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
        <div className="rounded-[34px] border border-white/10 bg-white/[.035] p-7 sm:p-9">
          <span className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#52ead8]">Inside the mattress</span>
          <h3 className="mt-4 text-3xl font-extrabold tracking-[-.05em] sm:text-4xl">Construction matters as much as the label.</h3>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/45">A mattress is a system of materials. We use construction signals to explain the tradeoffs behind support, pressure relief, cooling and motion—not to turn a material claim into a universal rating.</p>
          <div className="mt-8 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-[.12em] text-white/50">
            {['Pressure relief', 'Support', 'Cooling', 'Motion', 'Edge support'].map((x) => <span key={x} className="rounded-full border border-white/10 bg-white/[.035] px-3 py-2">{x}</span>)}
          </div>
        </div>
        <div className="relative min-h-[300px] overflow-hidden rounded-[34px] border border-white/10 bg-[#0a2520]">
          <Image src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=90" alt="Real mattress in a premium bedroom" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" unoptimized />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041311]/85 via-[#041311]/15 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4"><div><div className="text-[10px] font-bold uppercase tracking-[.16em] text-[#75f3e2]">Product context</div><div className="mt-1 text-xl font-bold">See the build before the score.</div></div><span className="rounded-full border border-white/15 bg-black/20 px-3 py-2 text-[10px] font-bold uppercase tracking-[.12em] text-white/65 backdrop-blur">Real photography</span></div>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {layers.map((layer) => (
          <article key={layer.n} className="group overflow-hidden rounded-[30px] border border-white/10 bg-white/[.035] transition-colors hover:border-[#20d7c0]/35">
            <div className="relative aspect-[16/9] overflow-hidden bg-[#0b211d]"><Image src={layer.image} alt={layer.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.025]" unoptimized /><div className="absolute inset-0 bg-gradient-to-t from-[#041311]/80 via-transparent to-transparent" /><span className="absolute left-5 top-5 rounded-full border border-white/15 bg-[#041311]/65 px-3 py-1.5 text-[10px] font-extrabold tracking-[.12em] text-[#a8f7ee] backdrop-blur">{layer.n}</span></div>
            <div className="p-6"><div className="flex items-center justify-between gap-3"><h4 className="text-xl font-extrabold tracking-[-.03em]">{layer.name}</h4><span className="text-[10px] font-bold uppercase tracking-[.13em] text-[#52ead8]">{layer.signal}</span></div><p className="mt-3 text-sm leading-6 text-white/40">{layer.copy}</p></div>
          </article>
        ))}
      </div>
    </div>
  );
}
