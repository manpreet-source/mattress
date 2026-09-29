import Link from 'next/link';

const images=[
  ['Sleep sanctuary','https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85'],
  ['Premium materials','https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=85'],
  ['Rest, refined','https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=85'],
  ['Bedroom calm','https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=85']
];

export function SiteFooter(){return <footer className="border-t border-[#dce4df] bg-[#092e2a] text-white">
  <div className="mx-auto max-w-[1240px] px-6 pt-10">
    <div className="mb-10 grid grid-cols-2 gap-3 overflow-hidden rounded-[28px] sm:grid-cols-4">
      {images.map(([label,src])=><div key={label} className="group relative h-32 overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:h-40">
        <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110" style={{backgroundImage:`linear-gradient(to top,rgba(4,19,17,.72),rgba(4,19,17,.05)),url(${src})`}}/>
        <span className="absolute bottom-3 left-3 text-xs font-bold text-white/85">{label}</span>
      </div>)}
    </div>
  </div>
  <div className="mx-auto grid max-w-[1240px] gap-10 px-6 pb-14 md:grid-cols-[1.5fr_1fr_1fr]">
    <div><Link href="/" className="text-xl font-extrabold tracking-[-.04em]">mattress match</Link><p className="mt-4 max-w-sm text-sm leading-6 text-white/60">Personalized mattress discovery built around your sleep profile, transparent scoring and visible tradeoffs.</p></div>
    <div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#6ce7d6]">Explore</p><div className="mt-4 grid gap-3 text-sm text-white/75"><Link href="/mattresses">Mattresses</Link><Link href="/guides">Buying guides</Link><Link href="/methodology">Methodology</Link><Link href="/faq">FAQ</Link></div></div>
    <div><p className="text-xs font-bold uppercase tracking-[.16em] text-[#6ce7d6]">Transparency</p><div className="mt-4 grid gap-3 text-sm text-white/75"><Link href="/affiliate-disclosure">Affiliate disclosure</Link><Link href="/sponsored-policy">Sponsored policy</Link></div></div>
  </div>
  <div className="mx-auto max-w-[1240px] border-t border-white/10 px-6 py-6 text-xs text-white/45">© {new Date().getFullYear()} Mattress Match Score. Match scores are informational and should be evaluated alongside your own needs and retailer terms.</div>
</footer>}
