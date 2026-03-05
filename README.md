# Serra do Mar Engenharia

Site institucional da Serra do Mar Engenharia — Geotecnia & Infraestrutura.

## Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS v4**
- **SDCMS** (Headless CMS para blog/insights)
- Deploy: **Vercel**

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar localmente
npm run dev

# Build de produção
npm run build
```

## Variáveis de Ambiente

Copie `.env.example` para `.env.local` e configure:

```bash
CMS_BASE_URL=https://sdcms-web.vercel.app
CMS_API_KEY=cms_xxxxxxxxxxxxx
CMS_WEBHOOK_SECRET=xxxxxxxxxxxxxxxx
NEXT_PUBLIC_SITE_URL=https://serradomar-engenharia.vercel.app
```

## Estrutura

```
app/
├── page.tsx              # Home
├── servicos/page.tsx     # Serviços
├── setores/page.tsx      # Setores
├── projetos/page.tsx     # Projetos
├── insights/page.tsx     # Blog (SDCMS)
├── insights/[slug]/      # Post individual
├── sobre/page.tsx        # Sobre
├── contato/page.tsx      # Contato (lead form)
├── api/sdcms/            # Health + Revalidate
├── components/           # Header, Footer, ScrollReveal, LayerGraphic
├── sitemap.ts            # Sitemap dinâmico
└── robots.ts             # Robots.txt
lib/
├── cms.ts                # SDCMS API client
├── sdcms-webhook.ts      # Webhook signature verification
└── formatters.ts         # Date formatting
packages/
└── sdcms-nextjs/         # SDCMS SDK (local copy)
```

## SDCMS Integration

- **Blog/Insights**: Puxa posts do SDCMS via API (`/api/public/content`)
- **Revalidação**: Webhook em `/api/sdcms/revalidate` para ISR automático
- **Health Check**: `/api/sdcms/health` para verificação de conectividade
- **Lead Forms**: Formulário de contato integrado com SDCMS lead capture
