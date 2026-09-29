import { NextResponse } from 'next/server';
import { mattresses } from '@/data/mattresses';
import { scoreMattress } from '@/lib/scoring/engine';
import type { SleepProfile } from '@/lib/types';

export async function POST(req:Request){try{const profile=await req.json() as SleepProfile;if(!profile?.position||!profile?.firmness||!profile?.temperature||!profile?.motion||!profile?.priority)return NextResponse.json({error:'Incomplete sleep profile'},{status:400});const results=mattresses.map(m=>({mattress:m,score:scoreMattress(m,profile)})).sort((a,b)=>b.score.overall-a.score.overall);return NextResponse.json({version:'1.0.0',results});}catch{return NextResponse.json({error:'Invalid request'},{status:400})}}
