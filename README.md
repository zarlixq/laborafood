# LaboraFood — Food Analysis Lab Site (V2)

Modern, mobile-first kurumsal site + **çift dil (SQ default / EN)** + Supabase admin paneli + numune takip.

**Stack:** Next.js 15 (App Router · JS) · Tailwind v4 · Framer Motion · next-intl v4 · Supabase (auth + DB + storage).

---

## Hızlı kurulum

```bash
npm install
cp .env.local.example .env.local   # (.env.local zaten dolu)
npm run dev
```

Açılan adresler:
- **Public site (SQ default):** http://localhost:3000 → `/sq` redirect
- **Public site (EN):** http://localhost:3000/en
- **Admin panel:** http://localhost:3000/admin

### Production

```bash
npm run build
npm start
```

---

## Ortam Değişkenleri

`.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ... veya sb_publishable_...
NEXT_PUBLIC_SITE_URL=https://laborafood.com
# SUPABASE_SERVICE_ROLE_KEY=  (opsiyonel — şu an kullanılmıyor)
```

Mevcut projede zaten Supabase **laborafood** projesinin URL'i ve anon key'i dolu.

---

## Supabase yapısı

Tablolar (`apply_migration` ile oluşturuldu):

| Tablo | Amaç |
|---|---|
| `samples`         | Numune takip (her birinde `tracking_code` = `LF-YYYY-NNNN`) |
| `samples_public` (view) | Public API'nin okuduğu, sızdırmaya karşı korumalı view |
| `blog_posts`      | Çift dilli blog yazıları (title_sq, title_en, content_sq, content_en …) |
| `quote_requests`  | Form gönderileri (teklif + kontakt, `source` ile ayrılır) |
| `admins`          | Admin paneline erişebilen Supabase user_id'leri |

**Storage bucket:** `reports` (public, sadece admin upload edebilir, herkes indirebilir).

**RPC:** `generate_tracking_code()` — yıl + sıfır-dolgulu sayı üretir.

### İlk admin kullanıcısını eklemek (zorunlu)

1. Supabase Studio → **Authentication → Users → Add user** (email + parola).
2. SQL Editor:

```sql
insert into public.admins (user_id, email)
  select id, email from auth.users where email = 'admin@laborafood.com';
```

Sonra http://localhost:3000/admin/login adresinden bu kimlikle gir.

---

## Site Yapısı

```
app/
├── [locale]/                      Public site (sq, en)
│   ├── page.js                    Ana sayfa
│   ├── about|rreth-nesh/page.js
│   ├── services|sherbimet/page.js
│   ├── analyses|analizat/page.js
│   ├── accreditation|akreditimi/page.js
│   ├── tracking|gjurmim/page.js   Public numune takip
│   ├── blog/page.js
│   ├── contact|kontakt/page.js
│   ├── quote|oferta/page.js
│   └── not-found.js
├── admin/                         Admin (auth-protected, monolingual SQ)
│   ├── login/page.js
│   ├── page.js                    Dashboard
│   ├── samples/{page,new,[id]}    CRUD numune
│   ├── blog/{page,new,[id]}       CRUD blog
│   └── quotes/page.js             Gelen kutusu
├── api/tracking/route.js          GET ?code=LF-YYYY-NNNN
├── actions/                       Server actions
│   ├── auth.js, quote.js, samples.js, blog.js, quotes-admin.js
├── sitemap.js, robots.js, icon.svg, layout.js, globals.css

blocks/    — Public sayfa section'ları (Navbar, Hero, ServicesGrid, AnalysisShowcase, WhyLaboraFood, ProcessTimeline, AccreditationStatus, RegulatoryCompliance, TrackingCTA, BlogPreview, CTASection, Footer)
components/
├── ui/        Button, Card, Badge, Input
├── animations/  FadeIn, StaggerChildren, CountUp, Marquee, RevealImage
├── forms/     QuoteForm.jsx
├── admin/     AdminSidebar, StatusBadge, BlogEditor
├── LocaleSwitcher.jsx · TrackingTimeline.jsx · SetHtmlLang.jsx

lib/        Veriler + Supabase + SEO + motion presets
messages/   sq.json · en.json    (tüm UI metinleri buradan beslenir)
i18n/       routing.js (locales + lokalize URL slug'ları), request.js, navigation.js
middleware.js — admin auth + i18n birleşik
```

---

## Çift Dil (next-intl)

- **Default:** Arnavutça (`sq`)
- **EN:** İngilizce, lokalize URL slug'ları (örn. `/sq/sherbimet` ↔ `/en/services`)
- **Switcher:** Navbar sağ üstte minimal `SQ | EN` toggle (mobile'da hamburger yanında compact)

### Metin değiştirme

Tüm UI metinleri `messages/sq.json` ve `messages/en.json` içinde. Bir başlığı değiştirmek için:

1. `messages/sq.json` içinde key'i bul
2. Değeri güncelle
3. `messages/en.json` içinde aynı key'i çevir
4. Sayfayı yenile

### URL slug'ları değiştirme

`i18n/routing.js` içindeki `pathnames` objesinde tanımlı:

```js
"/services": { sq: "/sherbimet", en: "/services" }
```

---

## Renk paleti

`app/globals.css` `@theme` bloğunda:

| Token             | Hex      | Kullanım |
|-------------------|----------|----------|
| `--color-bg`      | `#FAFAF7`| Body |
| `--color-bg-alt`  | `#F1F0E8`| Section ayrımı |
| `--color-ink`     | `#0F1F1A`| Birincil metin |
| `--color-ink-soft`| `#4A5651`| İkincil metin |
| `--color-brand`   | `#1B4332`| Primary (derin yeşil) |
| `--color-brand-2` | `#2D6A4F`| Accent yeşil |
| `--color-brand-soft`|`#D8E2DC`| Pastel arka plan |
| `--color-accent`  | `#95D5B2`| Vurgu yeşili |
| `--color-line`    | `#E5E3D8`| Border'lar |

Tüm renkler Tailwind utility'leri olarak (`bg-brand`, `text-ink-soft`, `border-line` …) kullanılır.

---

## Numune Takip Akışı

1. **Admin** `/admin/samples/new` → form doldur → submit.
2. Sistem otomatik `LF-YYYY-NNNN` formatında tracking code üretir (RPC `generate_tracking_code`).
3. Müşteriye sözlü/yazılı olarak bu kod verilir.
4. **Müşteri** `/sq/gjurmim` (veya `/en/tracking`) → kodu girer → timeline + durum görür.
5. Status `completed` olunca admin PDF rapor upload eder → public sayfada "Shkarko PDF" butonu görünür.

### Status değerleri

`received → preparing → analyzing → verifying → completed`

Admin değiştirir; trigger `completed_at`'i otomatik doldurur.

### Gizlilik

Public tracking API'si `samples_public` view'ından okur — müşteri adı, telefon, email, internal notlar **döndürülmez**, sadece:
- `tracking_code`, `product_name`, `analysis_type`, `status`, `received_at`, `estimated_completion`, `completed_at`, `report_url`

---

## Akreditasyon — Dürüst Konum

**Sahte ISO/TÜRKAK/etc. logosu YOK.** Site açıkça belirtir:
- LaboraFood, **DAK (Drejtoria e Akreditimit e Kosovës)** akreditasyon sürecindedir
- ISO/IEC 17025:2017 standardına göre kalite sistemi kurulu
- Süreç adımları timeline ile gösteriliyor (3'ü tamamlandı, 1'i devam ediyor, 2'si bekliyor)

Mevzuat referansları (gerçek otoriteler — güvenle anılır):
- **AUV** (Agjencia e Ushqimit dhe Veterinarisë)
- **EU 178/2002**
- **SK EN ISO**

---

## Vercel Deploy

1. Repoyu GitHub'a push'la.
2. Vercel'de **Import Project** → bu repo.
3. **Environment Variables**'a `.env.local` değerlerini ekle (özellikle `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL=https://laborafood.com`).
4. Build settings: framework otomatik (Next.js) algılanır.
5. Domain bağla (`laborafood.com`), `NEXT_PUBLIC_SITE_URL`'i prod domain'e çevir.

---

## SEO

- `/sitemap.xml` — her sayfa için SQ + EN versiyonları, `alternates.languages` ile.
- `/robots.txt` — admin/api hariç tüm crawler'lara izin.
- Per-page metadata: `app/[locale]/*/page.js` içinde `generateMetadata()`.
- JSON-LD `MedicalBusiness` + `geo.region=XK` + `hreflang` (sq-XK, en, x-default) `lib/seo.js` üzerinden.

---

## Komutlar

```bash
npm run dev      # geliştirme
npm run build    # prod build
npm start        # prod server
npm run lint     # next lint
```

---

## Yapılan Düzeltmeler (V1 → V2)

| Değişiklik | Açıklama |
|---|---|
| 🌿 Renk paleti | Mavi → derin orman yeşili + krem |
| 🏷️ Marka | LabAdı → **LaboraFood** (Prizren, Kosova) |
| 🐛 AnalysisShowcase | Scroll bug → IntersectionObserver pattern ile baştan yazıldı |
| 🗑️ Sahte içerik | Testimonials/TrustBar/Stats kaldırıldı |
| ➕ Yeni section'lar | WhyLaboraFood, AccreditationStatus (dürüst), RegulatoryCompliance, TrackingCTA |
| 🌐 i18n | next-intl v4 entegrasyonu, SQ/EN, lokalize URL slug'ları |
| 🔐 Admin panel | Supabase Auth + sidebar + CRUD (samples / blog / quotes) |
| 📦 Numune takip | `LF-YYYY-NNNN` kodları + public tracking sayfası + PDF rapor indirme |
| 🧪 Hizmetler | 4 → 2 (sadece mikrobiyoloji + kimya) |
| 📐 Akreditasyon | Sahte logolar gitti, DAK süreç timeline'ı eklendi |
