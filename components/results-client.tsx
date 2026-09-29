'use client';

import Link from 'next/link';
import { ArrowRight, CheckCircle2, AlertTriangle, SlidersHorizontal } from 'lucide-react';
import type { Mattress, ScoreBreakdown, SleepProfile } from '@/lib/types';

export type MatchResult = { mattress: Mattress; score: ScoreBreakdown };

export function ResultsClient({ results, profile }: { results: MatchResult[]; profile: SleepProfile }) {
  return (
    <main className="min-h-screen bg-[#eef4f0] px-5 pb-20 pt-28 sm:px-8">
      <div className="mx-auto max-w-[1240px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Your personalized match</span>
            <h1 className="mt-4 max-w-3xl text-5xl font-extrabold tracking-[-.05em] sm:text-7xl">Three mattresses worth a closer look.</h1>
            <p className="mt-5 max-w-2xl leading-7 text-[#66706d]">These scores are calculated from your sleep profile. We show the reasons and tradeoffs instead of hiding them behind a single rating.</p>
          </div>
          <Link href="/#match" className="btn-secondary"><SlidersHorizontal size={17}/> Refine match</Link>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {results.slice(0, 3).map(({ mattress, score }, index) => (
            <article key={mattress.id} className={`group overflow-hidden rounded-[32px] border bg-white shadow-[0_24px_70px_rgba(9,46,42,.08)] transition duration-500 hover:-translate-y-1 ${index === 0 ? 'border-[#18b7a2]/50' : 'border-[#dce4df]'}`}>
              <div className="relative h-56 overflow-hidden bg-[#dfe9e4]">
                <img src={mattress.image} alt={`${mattress.brand} ${mattress.model}`} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                {index === 0 && <span className="absolute left-4 top-4 rounded-full bg-[#092e2a] px-3 py-1.5 text-xs font-bold text-white">Top match</span>}
              </div>
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold text-[#178f80]">{mattress.brand}</p><h2 className="mt-1 text-2xl font-extrabold">{mattress.model}</h2></div><div className="text-right"><div className="text-4xl font-extrabold tracking-[-.06em] text-[#092e2a]">{score.overall}</div><div className="text-[10px] font-bold uppercase tracking-[.14em] text-[#77847f]">match</div></div></div>
                <div className="mt-6 space-y-3">{([['Pressure relief', score.pressure], ['Support', score.support], ['Cooling', score.cooling], ['Motion', score.motion]] as const).map(([label, value]) => <div key={label}><div className="mb-1 flex justify-between text-xs font-semibold"><span>{label}</span><span>{value}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-[#e4ebe7]"><div className="h-full rounded-full bg-[#18b7a2]" style={{ width: `${value}%` }}/></div></div>)}</div>
                <div className="mt-6 space-y-2 text-sm">{score.reasons.slice(0, 2).map((reason) => <p key={reason} className="flex gap-2 text-[#36544e]"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#18a895]"/>{reason}</p>)}{score.risks.slice(0, 2).map((risk) => <p key={risk} className="flex gap-2 text-[#65706d]"><AlertTriangle size={17} className="mt-0.5 shrink-0 text-[#c58b35]"/>{risk}</p>)}</div>
                <Link href={`/mattress/${mattress.id}`} className="btn-primary mt-7 w-full">See full match <ArrowRight size={17}/></Link>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-8 rounded-[32px] bg-[#092e2a] p-7 text-white sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-5"><div><span className="text-xs font-bold uppercase tracking-[.16em] text-[#6ce7d6]">Your profile</span><h2 className="mt-2 text-2xl font-bold">Why these results are personalized</h2><p className="mt-2 text-sm text-white/60">{profile.position} sleeper · {profile.temperature} sleeper · {profile.motion === 'couple' ? 'shared bed' : 'solo sleeper'} · {profile.firmness} feel · ${profile.budget} budget signal</p></div><Link href="/#match" className="btn-secondary !border-white/20 !bg-white/10 !text-white">Change answers <SlidersHorizontal size={16}/></Link></div>
        </section>
      </div>
    </main>
  );
}
