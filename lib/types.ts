export type SleepPosition = 'side' | 'back' | 'stomach' | 'combination';
export type Temperature = 'hot' | 'neutral' | 'cold';
export type Motion = 'single' | 'couple';
export type Firmness = 'soft' | 'medium' | 'firm';
export type MattressType = 'foam' | 'hybrid' | 'innerspring';

export type SleepProfile = { position: SleepPosition; weight: number; firmness: Firmness; temperature: Temperature; motion: Motion; priority: 'pressure' | 'back' | 'hips-shoulders' | 'balanced'; budget: number; types: MattressType[] };
export type Mattress = { id:string; brand:string; model:string; type:MattressType; firmness:number; price:number; cooling:number; pressure:number; support:number; motion:number; edge:number; responsiveness:number; materials:string[]; trial:string; warranty:string; highlights:string[]; risks:string[]; image:string };
export type ScoreBreakdown = { overall:number; pressure:number; support:number; cooling:number; motion:number; edge:number; responsiveness:number; reasons:string[]; risks:string[] };
