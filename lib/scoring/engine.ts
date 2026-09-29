import type { Mattress, SleepProfile, ScoreBreakdown } from '@/lib/types';

export const SCORING_VERSION = '1.0.1';
const clamp=(n:number)=>Math.max(0,Math.min(100,Math.round(n)));

export function scoreMattress(m:Mattress,p:SleepProfile):ScoreBreakdown{
  const positionSupport=p.position==='back'||p.position==='stomach'?m.support:(p.position==='side'?Math.min(100,m.support*.82+m.pressure*.18):(m.support+m.pressure)/2);
  const pressure=p.priority==='pressure'||p.priority==='hips-shoulders'?m.pressure:(m.pressure*.65+m.support*.35);
  const cooling=p.temperature==='hot'?Math.min(100,m.cooling*1.08):(p.temperature==='cold'?Math.min(100,m.cooling*.7+30):m.cooling);
  const motion=p.motion==='couple'?m.motion:Math.min(100,m.motion+5);
  const firmnessFit=clamp(100-Math.abs(m.firmness-({soft:4,medium:6,firm:8}[p.firmness]))*13);
  const budgetFit=m.price<=p.budget?100:clamp(100-(m.price-p.budget)/p.budget*100);
  const typeFit=p.types.includes(m.type)?100:72;
  const overall=clamp(positionSupport*.25+pressure*.2+cooling*.15+motion*.12+m.edge*.08+m.responsiveness*.05+firmnessFit*.1+budgetFit*.03+typeFit*.02);
  const reasons:string[]=[]; const risks:string[]=[];
  if(positionSupport>=90) reasons.push('Strong support profile for your sleep position.');
  if(pressure>=90) reasons.push('High pressure-relief fit for your comfort priority.');
  if(p.temperature==='hot'&&cooling>=88) reasons.push('Cooling performance aligns with hot-sleeper needs.');
  if(p.motion==='couple'&&motion>=90) reasons.push('Strong motion isolation for shared sleep.');
  if(firmnessFit<75) risks.push('Firmness may feel different from your preferred surface feel.');
  if(budgetFit<80) risks.push('This mattress is above your selected budget.');
  if(positionSupport<78) risks.push('Support profile may be a weaker fit for your sleep position.');
  if(p.temperature==='hot'&&cooling<82) risks.push('Cooling may be a consideration for hot sleepers.');
  return {overall,pressure:clamp(pressure),support:clamp(positionSupport),cooling:clamp(cooling),motion:clamp(motion),edge:m.edge,responsiveness:m.responsiveness,reasons,risks};
}
