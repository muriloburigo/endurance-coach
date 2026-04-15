-- ─────────────────────────────────────────
-- PLANS
-- ─────────────────────────────────────────
create table if not exists plans (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  subtitle        text,
  slug            text not null unique,
  description     text,
  long_description text,
  level           text not null check (level in ('iniciante','intermediario','avancado')),
  distance        text not null check (distance in ('5k','10k','21k','42k')),
  duration_weeks  int  not null check (duration_weeks in (12,16)),
  sessions_per_week int default 4,
  weekly_hours_min  int default 5,
  weekly_hours_max  int default 8,
  highlights      jsonb default '[]',
  training_peaks_url text,
  price_display   text,
  is_active       boolean not null default true,
  sort_order      int default 0,
  created_at      timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- LEADS (email capture / intent to buy)
-- ─────────────────────────────────────────
create table if not exists leads (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  name        text,
  plan_id     uuid references plans(id) on delete set null,
  plan_title  text,
  plan_slug   text,
  converted   boolean not null default false,
  notes       text,
  ip_address  text,
  user_agent  text,
  referrer    text,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- TESTIMONIALS
-- ─────────────────────────────────────────
create table if not exists testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  photo_url   text,
  content     text not null,
  achievement text,
  plan_id     uuid references plans(id) on delete set null,
  plan_title  text,
  is_active   boolean not null default true,
  sort_order  int default 0,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- VIDEOS
-- ─────────────────────────────────────────
create table if not exists videos (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  youtube_url text not null,
  category    text not null default 'geral'
                check (category in ('geral','dica','motivacao','plano')),
  is_active   boolean not null default true,
  sort_order  int default 0,
  created_at  timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- ADMIN USERS
-- ─────────────────────────────────────────
create table if not exists admin_users (
  id         uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  name       text,
  created_at timestamptz not null default now()
);

-- ─────────────────────────────────────────
-- RLS
-- ─────────────────────────────────────────
alter table plans        enable row level security;
alter table leads        enable row level security;
alter table testimonials enable row level security;
alter table videos       enable row level security;
alter table admin_users  enable row level security;

-- Public can read active plans
create policy "public read active plans" on plans
  for select using (is_active = true);

-- Public can read active testimonials
create policy "public read active testimonials" on testimonials
  for select using (is_active = true);

-- Public can read active videos
create policy "public read active videos" on videos
  for select using (is_active = true);

-- ─────────────────────────────────────────
-- SEED: 24 plans (3 levels × 4 distances × 2 durations)
-- ─────────────────────────────────────────
insert into plans (title, subtitle, slug, level, distance, duration_weeks, sessions_per_week, weekly_hours_min, weekly_hours_max, highlights, description, is_active, sort_order) values

-- INICIANTE
('Do Zero ao 5K', '12 Semanas', 'iniciante-5k-12-semanas', 'iniciante', '5k', 12, 3, 3, 5,
 '["Treinos de 30 a 45 min", "3 sessões por semana", "Ideal para quem nunca correu", "Progressão gradual e segura"]'::jsonb,
 'O ponto de partida da sua jornada. Em 12 semanas você vai sair do zero e cruzar a linha de chegada dos 5K com confiança.', true, 1),

('Do Zero ao 5K', '16 Semanas', 'iniciante-5k-16-semanas', 'iniciante', '5k', 16, 3, 3, 5,
 '["Progressão ainda mais suave", "Ideal para sedentários", "3 sessões por semana", "Foco em criar o hábito de correr"]'::jsonb,
 'Para quem quer construir a base com calma. 16 semanas para desenvolver o hábito e a resistência necessários para os 5K.', true, 2),

('Primeiro 10K', '12 Semanas', 'iniciante-10k-12-semanas', 'iniciante', '10k', 12, 4, 4, 6,
 '["4 sessões por semana", "Longão aos finais de semana", "Inclui treinos de ritmo", "Base de endurance sólida"]'::jsonb,
 'Dobrar a distância é possível. Este plano vai te preparar para completar seu primeiro 10K do início ao fim, com energia.', true, 3),

('Rumo ao 10K', '16 Semanas', 'iniciante-10k-16-semanas', 'iniciante', '10k', 16, 4, 4, 6,
 '["Construção gradual de volume", "4 sessões por semana", "Treinos de caminhada-corrida", "Chegada sem lesões"]'::jsonb,
 '16 semanas com progressão cuidadosa para quem está começando. Você vai chegar ao 10K preparado e sem exageros.', true, 4),

('Primeira Meia Maratona', '12 Semanas', 'iniciante-21k-12-semanas', 'iniciante', '21k', 12, 4, 5, 7,
 '["Longões semanais progressivos", "4 sessões por semana", "Estratégia de prova inclusa", "Semana de tapering"]'::jsonb,
 '21 quilômetros parece muito — até você cruzar a linha de chegada. Este plano vai te levar lá com segurança.', true, 5),

('Minha Primeira Meia', '16 Semanas', 'iniciante-21k-16-semanas', 'iniciante', '21k', 16, 4, 5, 7,
 '["Preparação mais longa e segura", "Foco em chegar sem lesões", "Longão semanal progressivo", "Nutrição e hidratação orientadas"]'::jsonb,
 'Com 16 semanas, você tem tempo para construir a distância sem pressa. A meia maratona vai parecer natural na largada.', true, 6),

('Primeira Maratona', '12 Semanas', 'iniciante-42k-12-semanas', 'iniciante', '42k', 12, 5, 6, 9,
 '["Longões de até 35K", "5 sessões por semana", "Estratégia de pace inclusa", "Semana de tapering de 3 semanas"]'::jsonb,
 'A maratona é a prova dos sonhos. Este plano foi desenhado para te levar aos 42K sem quebrar, sem drama — só glória.', true, 7),

('Rumo à Maratona', '16 Semanas', 'iniciante-42k-16-semanas', 'iniciante', '42k', 16, 5, 6, 9,
 '["A preparação mais completa para iniciantes", "Longões progressivos semanais", "5 sessões/semana", "Foco em chegar na linha de chegada"]'::jsonb,
 '16 semanas para a maior prova da sua vida. Cada treino te aproxima do momento em que você vai dizer: eu fiz uma maratona.', true, 8),

-- INTERMEDIÁRIO
('5K Performance', '12 Semanas', 'intermediario-5k-12-semanas', 'intermediario', '5k', 12, 4, 4, 6,
 '["Treinos de velocidade (tiros)", "Fartleks e intervalados", "4 sessões/semana", "Melhora de 5 a 10% no tempo"]'::jsonb,
 'Você já correu. Agora é hora de correr mais rápido. Treinos de qualidade para quebrar seu recorde pessoal nos 5K.', true, 9),

('Evoluindo no 5K', '16 Semanas', 'intermediario-5k-16-semanas', 'intermediario', '5k', 16, 4, 4, 6,
 '["Desenvolvimento de velocidade progressivo", "Tiros e tempo runs", "Foco em economia de corrida", "4 sessões/semana"]'::jsonb,
 'Uma temporada inteira dedicada a melhorar seu 5K. Construção de base + velocidade para um resultado que vai te surpreender.', true, 10),

('10K Performance', '12 Semanas', 'intermediario-10k-12-semanas', 'intermediario', '10k', 12, 5, 5, 7,
 '["Intervalados de alta intensidade", "Corridas em ritmo de corrida", "Longões moderados", "5 sessões/semana"]'::jsonb,
 'O 10K exige equilíbrio entre velocidade e resistência. Este plano vai te dar os dois, com treinos inteligentes e específicos.', true, 11),

('Dominando o 10K', '16 Semanas', 'intermediario-10k-16-semanas', 'intermediario', '10k', 16, 5, 5, 7,
 '["Base aeróbica sólida + velocidade", "Periodização completa", "Testes de ritmo quinzenais", "5 sessões/semana"]'::jsonb,
 '16 semanas de periodização para dominar cada quilômetro. Você vai chegar na largada sabendo exatamente o que fazer.', true, 12),

('Meia Maratona', '12 Semanas', 'intermediario-21k-12-semanas', 'intermediario', '21k', 12, 5, 6, 8,
 '["Longões de até 28K", "Treinos em ritmo de corrida", "5 sessões/semana", "Periodização por fases"]'::jsonb,
 'Para quem já tem uma meia nas pernas e quer ir mais rápido. Treinos específicos para melhorar seu tempo nos 21K.', true, 13),

('Meia Maratona Performance', '16 Semanas', 'intermediario-21k-16-semanas', 'intermediario', '21k', 16, 5, 6, 8,
 '["Preparação completa em 3 fases", "Volume progressivo", "Treinos de limiar", "5 sessões/semana"]'::jsonb,
 'A preparação mais completa para a meia maratona. 16 semanas em 3 blocos de treinamento para chegar no seu melhor.', true, 14),

('Maratona', '12 Semanas', 'intermediario-42k-12-semanas', 'intermediario', '42k', 12, 5, 7, 10,
 '["Longões de até 38K", "Treinos de pace de corrida", "5 sessões/semana", "Estratégia de divisão de pace"]'::jsonb,
 'Para quem já tem uma maratona no currículo e quer melhorar. Treinos precisos para um resultado mais rápido nos 42K.', true, 15),

('Maratona Performance', '16 Semanas', 'intermediario-42k-16-semanas', 'intermediario', '42k', 16, 5, 7, 10,
 '["A preparação mais completa para maratona", "Periodização em blocos", "Longões específicos de corrida", "5 sessões/semana"]'::jsonb,
 '16 semanas é o tempo certo para uma maratona bem preparada. Siga o plano e chegue na largada confiante e pronto para o seu melhor.', true, 16),

-- AVANÇADO
('5K Veloz', '12 Semanas', 'avancado-5k-12-semanas', 'avancado', '5k', 12, 5, 5, 7,
 '["Alta intensidade", "Sessões de pista", "Repetições curtas e longas", "5 sessões/semana"]'::jsonb,
 'Para corredores sérios que querem extrair o máximo dos 5K. Treinos de alta qualidade com foco em velocidade de pico.', true, 17),

('5K Sub-20', '16 Semanas', 'avancado-5k-16-semanas', 'avancado', '5k', 16, 5, 5, 7,
 '["Meta: 5K abaixo de 20 minutos", "Sessões de pista semanais", "Volume + intensidade equilibrados", "5 sessões/semana"]'::jsonb,
 'Sub-20 no 5K é um marco para qualquer corredor. Este plano foi desenhado especificamente para você cruzar essa barreira.', true, 18),

('10K Rápido', '12 Semanas', 'avancado-10k-12-semanas', 'avancado', '10k', 12, 6, 6, 8,
 '["Treinos de limiar lactatico", "Corridas de tempo", "6 sessões/semana", "Alta carga de qualidade"]'::jsonb,
 'Velocidade real nos 10K exige treinos específicos e alta qualidade. Este plano entrega os dois.', true, 19),

('10K Sub-40', '16 Semanas', 'avancado-10k-16-semanas', 'avancado', '10k', 16, 6, 6, 8,
 '["Meta: 10K abaixo de 40 minutos", "Periodização avançada", "Treinos de pista + estrada", "6 sessões/semana"]'::jsonb,
 'Sub-40 é o objetivo de todo corredor sério. 16 semanas de treinamento avançado para você conquistar essa marca.', true, 20),

('Meia Sub-1h45', '12 Semanas', 'avancado-21k-12-semanas', 'avancado', '21k', 12, 6, 7, 9,
 '["Treinos de limiar e VO2max", "Longões rápidos", "Simulações de prova", "6 sessões/semana"]'::jsonb,
 'Para corredores que querem cravar menos de 1h45 na meia maratona. Treinos avançados com alto rendimento.', true, 21),

('Meia Sub-1h40', '16 Semanas', 'avancado-21k-16-semanas', 'avancado', '21k', 16, 6, 7, 9,
 '["Meta: meia maratona em menos de 1h40", "Alta intensidade e volume", "Preparação completa em fases", "6 sessões/semana"]'::jsonb,
 '1h40 na meia maratona coloca você entre os melhores amadores. Este plano vai te levar lá com ciência e precisão.', true, 22),

('Maratona Sub-3h30', '12 Semanas', 'avancado-42k-12-semanas', 'avancado', '42k', 12, 6, 8, 11,
 '["Longões rápidos de até 38K", "Treinos específicos de pace de corrida", "6 sessões/semana", "Estratégia negativa de pace"]'::jsonb,
 'Sub-3h30 é o sonho de todo maratonista sério. Um plano exigente e preciso para você cruzar essa linha.', true, 23),

('Maratona Sub-3h15', '16 Semanas', 'avancado-42k-16-semanas', 'avancado', '42k', 16, 6, 8, 11,
 '["A preparação mais exigente para maratona", "Periodização avançada em blocos", "Volume e intensidade elevados", "6 sessões/semana"]'::jsonb,
 'Sub-3h15 é para poucos. Mas com 16 semanas de preparação inteligente e disciplinada, você vai chegar lá.', true, 24)

on conflict (slug) do nothing;
