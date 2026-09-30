'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

const steps = [
  ['position', 'How do you sleep?', ['side', 'back', 'stomach', 'combination']],
  ['weight', 'What is your weight range?', ['<130', '130–180', '180–230', '230+']],
  ['height', 'How tall are you?', ['Under 5\'4"', '5\'4"–5\'9"', '5\'10"–6\'2"', 'Over 6\'2"']],
  ['firmness', 'What feel do you prefer?', ['soft', 'medium', 'firm']],
  ['surfaceFeel', 'How should the surface feel?', ['soft', 'medium', 'firm']],
  ['types', 'Which mattress types interest you?', ['foam', 'hybrid', 'innerspring']],
  ['temperature', 'How do you sleep temperature-wise?', ['hot', 'neutral', 'cold']],
  ['motion', 'Do you share your bed?', ['single', 'couple']],
  ['priority', 'What matters most to you?', ['pressure', 'back', 'hips-shoulders', 'balanced']],
  ['budget', 'What is your budget?', ['under-800', '800-1200', '1200-1800', '1800+']],
] as const;

const labels: Record<string,string> = {'<130':'Under 130 lb','130–180':'130–180 lb','180–230':'180–230 lb','230+':'230+ lb','under-800':'Under $800','800-1200':'$800–$1,200','1200-1800':'$1,200–$1,800','1800+':'$1,800+'};

export function MatchQuiz() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const selected = answers[steps[index][0]] || '';
  const progress = useMemo(() => ((index + 1) / steps.length) * 100, [index]);
  const choose = (value: string) => setAnswers(current => ({...current, [steps[index][0]]: value}));
  const next = () => { if (!selected) return; if (index === steps.length - 1) { router.push(`/results?${new URLSearchParams(answers).toString()}`); return; } setIndex(i => i + 1); };
  const back = () => { if (index > 0) setIndex(i => i - 1); };
  const step = steps[index];

  return <div className="relative overflow-hidden rounded-[36px] border border-white/70 bg-white/80 p-6 shadow-[0_35px_100px_rgba(10,45,40,.12)] backdrop-blur-xl sm:p-10">
    <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#6ce7d6]/20 blur-3xl" />
    <div className="relative">
      <div className="flex items-center justify-between gap-4"><div><div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.16em] text-[#168e7e]"><Sparkles size={14}/> Match profile</div><p className="mt-1 text-sm text-[#77847f]">A few answers. A score built around you.</p></div><div className="rounded-full bg-[#092e2a] px-3 py-1.5 text-xs font-extrabold text-white">{index + 1} / {steps.length}</div></div>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#e5ece8]"><div className="h-full rounded-full bg-[#18b7a2] transition-all duration-500" style={{width:`${progress}%`}} /></div>
      <div className="mt-10"><p className="text-xs font-bold uppercase tracking-[.15em] text-[#8a9691]">Question {index + 1}</p><h3 className="mt-2 max-w-2xl text-4xl font-extrabold tracking-[-.055em] sm:text-5xl">{step[1]}</h3></div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">{step[2].map((value, optionIndex) => <button key={value} type="button" onClick={() => choose(value)} className={`group min-h-[72px] rounded-[22px] border p-4 text-left transition-all duration-300 ${selected===value?'border-[#18b7a2] bg-[#e9f9f5] shadow-[0_12px_30px_rgba(24,183,162,.12)]':'border-[#dce4df] bg-white/80 hover:-translate-y-1 hover:border-[#9eb4ac] hover:shadow-[0_12px_28px_rgba(10,45,40,.07)]'}`}><span className="flex items-center gap-4"><span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-extrabold ${selected===value?'bg-[#092e2a] text-white':'bg-[#eef3f0] text-[#71807a]'}`}>{String.fromCharCode(65+optionIndex)}</span><span className="flex-1 font-bold capitalize text-[#193d38]">{labels[value] ?? value.replace('-', ' / ')}</span>{selected===value&&<Check size={19} className="text-[#118f7f]"/>}</span></button>)}</div>
      <div className="mt-8 flex gap-3">{index>0&&<button type="button" onClick={back} className="btn-secondary h-12 px-4" aria-label="Previous question"><ArrowLeft size={17}/></button>}<button type="button" onClick={next} disabled={!selected} className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40">{index===steps.length-1?'Reveal my Match Score':'Continue'} <ArrowRight size={17}/></button></div>
      <p className="mt-4 text-center text-xs text-[#84908b]">Your answers power the score; they are not used as a generic star rating.</p>
    </div>
  </div>;
}
