# BENCHMARK REDESIGN — SERRA DO MAR ENGENHARIA

## Análise de Empresas de Engenharia Globais (Londres, NYC, Paris)

### Empresas analisadas:
- **Arup** (Londres) — www.arup.com
- **AECOM** (Global, HQ USA) — aecom.com
- **Buro Happold** (Londres) — www.burohappold.com
- **WSP** (Global)
- Referências de design premiado: Awwwards, Minale + Mann, GKC Architecture

---

## PADRÕES VISUAIS IDENTIFICADOS

### 1. HERO SECTION
- **Headlines gigantes e impactantes** — "We shape a better world" (Arup), "Delivering a better world" (AECOM)
- **Taglines curtas e ousadas** — máximo 6-8 palavras
- **Sem texto de apoio no hero** — só título + CTA
- **Vídeo ou imagem full-screen** — ocupando 80-100vh
- **CTA único e proeminente** — "Explore our work", "Learn more"

### 2. TIPOGRAFIA
- **Sans-serif modernas** — Gotham, Helvetica Neue, Inter, Circular
- **Weight contrast extremo:**
  - Headlines: 700-900 (ultra bold)
  - Body: 300-400 (light)
- **Tamanhos grandes:**
  - h1 hero: 4-6rem desktop, 2.5-3rem mobile
  - h2 seção: 2.5-3.5rem desktop
  - Body: 1-1.1rem (não menor que 0.95rem)
- **Line-height generoso:** 1.5-1.6 para títulos, 1.7-1.9 para corpo
- **Letter-spacing:**
  - Headlines: -0.02em a -0.04em (apertado)
  - Corpo: 0em a 0.01em (normal)

### 3. WHITESPACE
- **Espaçamento entre seções:** 8-12rem desktop, 5-7rem mobile
- **Container max-width:** 1200-1400px (não 1000px — muito estreito)
- **Padding lateral:** 5-10% do viewport (não fixo em rem)
- **Cards com padding interno:** 3-4rem desktop, 2rem mobile
- **Gaps em grids:** 3-5rem entre items

### 4. LAYOUT E GRID
- **Asymmetric grids** — 60/40, 70/30 (não 50/50)
- **Single column predominante** — texto centralizado, max-width 800px
- **Full-bleed images** — imagens sangram até as bordas (não confinadas)
- **Alternância ritmo:** texto → imagem → texto → grid → texto
- **Cards sem bordas** — só sombra sutil ou nenhuma

### 5. IMAGENS E MÍDIA
- **Fotos de projetos reais** — não ilustrações, não texturas como hero principal
- **Aspect ratio 16:9 ou 21:9** — cinemático
- **Overlays sutis** — 0.2-0.4 opacity (não 0.6+)
- **Imagens ocupam 50-70% da tela** em seções split
- **Sem molduras** — imagens com border-radius 0 ou máximo 8px

### 6. COR E PALETA
- **Monocromático + 1 accent** — preto, cinza claro, branco + azul/verde/laranja
- **Backgrounds neutros** — branco puro (#fff) ou cinza muito claro (#f5f5f5, #fafafa)
- **Accent usado com moderação** — só em CTAs, links, highlights
- **Sem gradientes** — cores sólidas
- **Desaturação** — se houver cor de marca, usar em 70-80% saturação

### 7. NAVEGAÇÃO
- **Header minimalista** — logo + 4-6 links + CTA
- **Sticky header fino** — 60-80px altura, não 100px+
- **Hamburger só mobile** — desktop sempre mostra menu completo
- **Footer generoso** — 3-4 colunas, links organizados por categoria

### 8. CONTEÚDO EDITORIAL
- **Parágrafos de 2-3 linhas** — máximo 60-70 caracteres por linha
- **Bullet points espaçados** — gap 1.5-2rem entre items
- **Números e stats em destaque** — 3-4x tamanho do corpo, weight 700
- **Citações (pull quotes)** — tipografia grande, bordas finas, padding generoso
- **Sem blocos de texto > 4 parágrafos seguidos**

### 9. ANIMAÇÕES E INTERATIVIDADE
- **Scroll reveal sutil** — fade in + translate 20-30px
- **Hover states minimalistas** — scale 1.02-1.05 ou opacity 0.8
- **Sem parallax agressivo** — movimento sutil se houver
- **Transições rápidas** — 0.2-0.3s ease-out

### 10. SEÇÕES TÍPICAS (ordem)
1. **Hero** — headline gigante + imagem/vídeo full-screen
2. **Intro statement** — 1-2 parágrafos centralizados, max-width 800px
3. **Featured projects** — grid 2-3 colunas, imagens grandes
4. **Services/Expertise** — cards com ícones minimalistas ou só texto
5. **Stats/Numbers** — números grandes em linha ou grid
6. **Testimonials** — citações grandes, foto do cliente pequena
7. **Team (opcional)** — fotos pequenas (200px), nomes grandes
8. **CTA final** — headline + botão, background accent ou imagem full-bleed
9. **Footer** — links organizados, social media, endereço

---

## DIRETRIZES ESPECÍFICAS PARA SERRA DO MAR

### O QUE MANTER:
- ✅ Texturas geotécnicas SVG (mas usar como **detalhe sutil**, não hero principal)
- ✅ Cores da marca (ajustar saturação)
- ✅ Estrutura de páginas (home, serviços, projetos, sobre, contato, insights)

### O QUE MUDAR RADICALMENTE:

#### HERO
- **Antes:** Texto longo + textura SVG ocupando tudo
- **Depois:** 
  - Headline de **1 linha** (ex: "Engenharia geotécnica de precisão")
  - Tagline de 1 linha (ex: "Fundações que sustentam grandes ideias")
  - **Foto real de obra** como background (não textura)
  - Textura SVG como overlay sutil (10-15% opacity)
  - CTA único: "Ver nossos projetos"

#### SEÇÕES DE CONTEÚDO
- **Antes:** Parágrafos longos, cards apertados
- **Depois:**
  - Espaçamento 10rem entre seções
  - Parágrafos de 2 linhas
  - h2 com 3rem de tamanho
  - Grids com gap 4rem

#### PROJETOS
- **Antes:** Cards pequenos com texto denso
- **Depois:**
  - Grid 2 colunas (desktop), 1 coluna (mobile)
  - Imagens 16:9, ocupando 70% do card
  - Título grande (1.8rem)
  - Descrição de 1 linha
  - Hover: scale 1.03

#### SERVIÇOS
- **Antes:** Lista vertical com ícones
- **Depois:**
  - Grid 3 colunas
  - Sem ícones (ou ícones minimalistas 32px)
  - Título do serviço em 1.5rem weight 600
  - Descrição de 2-3 linhas weight 300

#### FOOTER
- **Antes:** Footer compacto
- **Depois:**
  - 4 colunas: Serviços | Empresa | Contato | Social
  - Padding vertical 5rem
  - Tipografia 0.95rem
  - Textura topográfica como background sutil

---

## PALETA RECOMENDADA

```css
/* Neutrals */
--white: #ffffff;
--gray-50: #fafafa;
--gray-100: #f5f5f5;
--gray-200: #e5e5e5;
--gray-800: #1a1a1a;
--black: #000000;

/* Brand (ajustado — desaturado) */
--primary: hsl(210, 25%, 45%); /* azul técnico dessaturado */
--accent: hsl(25, 30%, 50%); /* terra/ocre dessaturado */

/* Uso */
background: var(--white);
text: var(--gray-800);
headlines: var(--black);
accent-cta: var(--primary);
```

---

## TIPOGRAFIA RECOMENDADA

**Opção 1 (moderna):**
- Headlines: **Inter** (weights 300, 600, 800)
- Body: **Inter** (weights 300, 400)

**Opção 2 (sofisticada):**
- Headlines: **Sohne** ou **Founders Grotesk** (weights 400, 600)
- Body: **Söhne** ou **Inter** (weight 300)

**Opção 3 (atual otimizada):**
- Headlines: **Montserrat** (weights 600, 800)
- Body: **Inter** (weight 300)

---

## CHECKLIST DE EXECUÇÃO

### HTML
- [ ] Simplificar hero para 1 headline + 1 tagline + CTA
- [ ] Quebrar todos os parágrafos em 2-3 linhas
- [ ] Adicionar spacers (10rem) entre todas as seções
- [ ] Reorganizar projetos em grid 2 colunas
- [ ] Adicionar seção de stats/números (opcional)

### CSS
- [ ] h1 hero: clamp(2.5rem, 6vw, 5rem)
- [ ] h2 seção: clamp(2rem, 4vw, 3.5rem)
- [ ] Body: 1rem weight 300
- [ ] Sections padding: 10rem 5%
- [ ] Grid gap: 4rem
- [ ] Cards padding: 3rem
- [ ] Container max-width: 1400px
- [ ] Bordas: rgba(0,0,0,0.08)
- [ ] Sombras: 0 4px 20px rgba(0,0,0,0.05)
- [ ] Texturas: background-opacity 0.1

### FOTOS
- [ ] Substituir hero por foto real de obra (se disponível)
- [ ] Aspect ratio 16:9 em todos os projetos
- [ ] Remover texturas como hero principal (mover para overlays)

---

## INSPIRAÇÃO VISUAL (mental)

Imagine:
- **Apple** — whitespace extremo, tipografia gigante
- **Stripe** — conteúdo editorial, hierarquia clara
- **Linear** — minimalismo técnico, cores dessaturadas
- **Arup** — projetos em destaque, headlines ousadas

**Tom:** Confiante, técnico, sofisticado — não corporativo genérico.

---

**MISSÃO FINAL:**
Transformar o site da Serra do Mar de "denso e apertado" para "respiratório e editorial" — um site que **parece uma revista de arquitetura**, não um PDF de apresentação.
