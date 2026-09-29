'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
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

export function MatchQuiz() {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const selected = answers[steps[index][0]] || '';
  const progress = useMemo(() => ((index + 1) / steps.length) * 100, [index]);

  const choose = (value: string) => setAnswers((current) => ({ ...current, [steps[index][0]]: value }));

  const next = () => {
    if (!selected) return;
    if (index === steps.length - 1) {
      const params = new URLSearchParams(answers);
      router.push(`/results?${params.toString()}`);
      return;
    }
    setIndex((current) => current + 1);
  };

  const back = () => { if (index > 0) setIndex((current) => current - 1); };
  const step = steps[index];

  return (
    <div className="rounded-[32px] border border-white/70 bg-white p-6 shadow-[0_25px_80px_rgba(10,45,40,.09)] sm:p-10">
      <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-[.16em] text-[#178f80]">Quick match</span><span className="text-sm text-[#66706d]">{index + 1} / {steps.length}</span></div>
      <div className="mt-4 h-1 overflow-hidden rounded-full bg-[#e5ece8]"><div className="h-full rounded-full bg-[#18b7a2] transition-all duration-500" style={{ width: `${progress}%` }} /></div>
      <h3 className="mt-9 text-3xl font-bold tracking-[-.03em]">{step[1]}</h3>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {step[2].map((value) => <button key={value} type="button" onClick={() => choose(value)} className={`flex min-h-14 items-center justify-between rounded-2xl border px-5 text-left transition ${selected === value ? 'border-[#18b7a2] bg-[#eaf9f6] shadow-[0_8px_25px_rgba(24,183,162,.1)]' : 'border-[#dce4df] bg-white hover:-translate-y-0.5 hover:border-[#a9bbb5]'}`}><span className="capitalize">{value.replace('-', ' / ')}</span>{selected === value && <Check size={18} className="text-[#128f80" />}</button>)}
      </div>
      <div className="mt-7 flex gap-3">{index > 0 && <button type="button" onClick={back} className="btn-secondary" aria-label="Previous question"><ArrowLeft size={17} /></button>}<button type="button" onClick={next} disabled={!selected} className="btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-40">{index === steps.length - 1 ? 'Calculate my match' : 'Continue'} <ArrowRight size={17} /></button></div>
      <p className="mt-4 text-xs text-[#7b8783]">Your answers are used only to calculate this match.</p>
    </div>
  );
}
