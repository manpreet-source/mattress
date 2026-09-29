create extension if not exists pgcrypto;

create table if not exists public.mattresses (
  id text primary key,
  brand text not null,
  model text not null,
  type text not null,
  price numeric,
  firmness numeric,
  cooling integer,
  support integer,
  pressure integer,
  motion integer,
  edge integer,
  responsiveness integer,
  materials jsonb not null default '[]'::jsonb,
  highlights jsonb not null default '[]'::jsonb,
  risks jsonb not null default '[]'::jsonb,
  image text,
  trial text,
  warranty text,
  source text,
  source_url text,
  source_confidence numeric,
  source_updated_at timestamptz,
  verified_at timestamptz,
  raw_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists mattresses_brand_idx on public.mattresses(brand);
create index if not exists mattresses_type_idx on public.mattresses(type);
create index if not exists mattresses_verified_idx on public.mattresses(verified_at desc);

create table if not exists public.mattress_reviews (
  id uuid primary key default gen_random_uuid(),
  mattress_id text not null references public.mattresses(id) on delete cascade,
  source text not null,
  source_url text,
  title text,
  excerpt text not null,
  tags jsonb not null default '[]'::jsonb,
  confidence numeric,
  published_at timestamptz,
  updated_at timestamptz not null default now(),
  unique(mattress_id, source, title, excerpt)
);

create table if not exists public.retailer_offers (
  id uuid primary key default gen_random_uuid(),
  mattress_id text not null references public.mattresses(id) on delete cascade,
  retailer text not null,
  url text not null,
  price numeric,
  affiliate boolean not null default false,
  verified boolean not null default false,
  last_verified timestamptz,
  disclosure text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sponsored_placements (
  id uuid primary key default gen_random_uuid(),
  mattress_id text not null references public.mattresses(id) on delete cascade,
  partner text not null,
  label text not null default 'Sponsored',
  verified boolean not null default false,
  last_verified timestamptz,
  disclosure text not null,
  active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ingestion_runs (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  status text not null check (status in ('started','completed','failed')),
  actor_id text,
  records_seen integer not null default 0,
  records_upserted integer not null default 0,
  records_rejected integer not null default 0,
  error text,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table if not exists public.ingestion_records (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references public.ingestion_runs(id) on delete cascade,
  source_key text not null,
  fingerprint text not null,
  payload jsonb not null,
  validation_status text not null check (validation_status in ('accepted','rejected','duplicate')),
  created_at timestamptz not null default now(),
  unique(run_id, source_key, fingerprint)
);

alter table public.mattresses enable row level security;
alter table public.mattress_reviews enable row level security;
alter table public.retailer_offers enable row level security;
alter table public.sponsored_placements enable row level security;
alter table public.ingestion_runs enable row level security;
alter table public.ingestion_records enable row level security;

create policy "public can read verified mattresses" on public.mattresses for select using (verified_at is not null);
create policy "public can read reviews" on public.mattress_reviews for select using (true);
create policy "public can read verified offers" on public.retailer_offers for select using (verified = true);
create policy "public can read active sponsored placements" on public.sponsored_placements for select using (active = true);
