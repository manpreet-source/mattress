import { createHash } from 'node:crypto';
import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';

export const runtime = 'nodejs';
const ACTOR_ID = process.env.APIFY_RTINGS_ACTOR_ID || 'crawlerbros/rtings-scraper';

async function sync(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && request.headers.get('authorization') !== `Bearer ${cronSecret}`) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const token = process.env.APIFY_API_TOKEN; const db = getSupabaseAdmin();
  if (!token || !db) return NextResponse.json({ error: 'Apify or Supabase is not configured' }, { status: 503 });
  const { data: run, error: runError } = await db.from('ingestion_runs').insert({ source: 'rtings', actor_id: ACTOR_ID, status: 'started' }).select('id').single();
  if (runError || !run) return NextResponse.json({ error: runError?.message || 'Could not create ingestion run' }, { status: 500 });
  try {
    const start = await fetch(`https://api.apify.com/v2/acts/${encodeURIComponent(ACTOR_ID)}/runs?token=${encodeURIComponent(token)}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({}) });
    if (!start.ok) throw new Error(`Apify actor start failed (${start.status})`);
    const runData = await start.json() as { data?: { defaultDatasetId?: string } }; const datasetId = runData.data?.defaultDatasetId;
    if (!datasetId) throw new Error('Apify did not return a dataset id');
    const dataset = await fetch(`https://api.apify.com/v2/datasets/${encodeURIComponent(datasetId)}/items?token=${encodeURIComponent(token)}&format=json`, { cache: 'no-store' });
    if (!dataset.ok) throw new Error(`Apify dataset fetch failed (${dataset.status})`);
    const items = await dataset.json() as unknown[]; let upserted = 0; let rejected = 0; let duplicates = 0;
    for (const item of items) {
      const raw = item as Record<string, unknown>; const sourceKey = String(raw.id ?? raw.slug ?? raw.url ?? raw.model ?? '').trim();
      const brand = String(raw.brand ?? '').trim(); const model = String(raw.model ?? raw.name ?? '').trim();
      if (!sourceKey || !brand || !model) { rejected++; continue; }
      const fingerprint = createHash('sha256').update(JSON.stringify(raw)).digest('hex');
      const { data: existing } = await db.from('ingestion_records').select('id').eq('run_id', run.id).eq('source_key', sourceKey).eq('fingerprint', fingerprint).maybeSingle();
      if (existing) { duplicates++; continue; }
      const id = `${brand}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      const row = { id, brand, model, type: String(raw.type ?? 'unknown'), price: typeof raw.price === 'number' ? raw.price : null, firmness: typeof raw.firmness === 'number' ? raw.firmness : null, source: 'RTINGS', source_url: typeof raw.url === 'string' ? raw.url : null, raw_data: raw, source_updated_at: new Date().toISOString(), verified_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      const { error } = await db.from('mattresses').upsert(row, { onConflict: 'id' });
      if (error) { rejected++; await db.from('ingestion_records').insert({ run_id: run.id, source_key: sourceKey, fingerprint, payload: raw, validation_status: 'rejected' }); }
      else { upserted++; await db.from('ingestion_records').insert({ run_id: run.id, source_key: sourceKey, fingerprint, payload: raw, validation_status: 'accepted' }); }
    }
    await db.from('ingestion_runs').update({ status: 'completed', records_seen: items.length, records_upserted: upserted, records_rejected: rejected, completed_at: new Date().toISOString() }).eq('id', run.id);
    return NextResponse.json({ ok: true, actorId: ACTOR_ID, seen: items.length, upserted, rejected, duplicates });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown sync error';
    await db.from('ingestion_runs').update({ status: 'failed', error: message, completed_at: new Date().toISOString() }).eq('id', run.id);
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
export async function GET(request: Request) { return sync(request); }
export async function POST(request: Request) { return sync(request); }
