# LabAdı — Gıda Analiz Laboratuvarı Web Sitesi

Modern, animasyonlu, mobile-first kurumsal tanıtım sitesi.
**Next.js 15** (App Router · JavaScript) · **Tailwind v4** · **Framer Motion** · **Supabase**.

---

## Kurulum

```bash
npm install
cp .env.local.example .env.local   # (proje zaten .env.local içeriyor)
npm run dev
```

Tarayıcı: <http://localhost:3000>

### Production

```bash
npm run build
npm start
```

---

## Ortam Değişkenleri

`.env.local` içinde:

```
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-or-publishable-key>
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
# SUPABASE_SERVICE_ROLE_KEY=  (opsiyonel — admin paneli için ilerde)
```

Anon key + RLS politikası, teklif/iletişim formu için yeterli. Service role
key sadece ileride admin tarafına gerekli olduğunda eklenecek.

---

## Klasör Yapısı

```
/
├── app/                  Next.js App Router sayfaları
│   ├── layout.js         Root layout — fontlar, JSON-LD, global metadata
│   ├── page.js           Anasayfa (blocks/ içindekileri kompoze eder)
│   ├── globals.css       Tailwind v4 + tema + utility'ler
│   ├── sitemap.js        /sitemap.xml
│   ├── robots.js         /robots.txt
│   ├── icon.svg          Favicon (SVG)
│   ├── actions/teklif.js Server action — Supabase insert
│   └── (sayfa klasörleri)
├── blocks/               Sayfa section'ları (Hero, Navbar, …)
├── components/
│   ├── ui/               Button, Card, Badge, Input/Textarea
│   ├── animations/       FadeIn, StaggerChildren, CountUp, Marquee, RevealImage
│   └── forms/TeklifForm  Multi-step teklif formu (client)
├── lib/                  İçerik verileri + helper'lar
│   ├── analyses.js       Tüm analizler — kategori + metod + süre
│   ├── services.js       4 ana hizmet + showcase sahneleri
│   ├── navigation.js     Üst/alt menü + firma bilgileri
│   ├── testimonials.js   Müşteri görüşleri
│   ├── blog.js           Blog yazıları
│   ├── accreditation.js  Sertifikalar
│   ├── processSteps.js   Süreç adımları
│   ├── stats.js          Sayılar (count-up)
│   ├── company.js        Hakkımızda — değerler, ekip, tesis
│   ├── motion.js         Framer Motion preset'leri
│   ├── seo.js            metadata + JSON-LD üreticisi
│   └── supabase.js       createBrowserClient / createServiceClient
└── public/og-default.svg OG görseli
```

---

## Nereyi Nereden Değiştiririm?

| Değişiklik                | Dosya                            |
|---------------------------|----------------------------------|
| Renkler                   | `app/globals.css` → `@theme`     |
| Fontlar                   | `app/layout.js` (next/font)      |
| Şirket adı / iletişim     | `lib/navigation.js` → `company`  |
| Üst menü ve footer        | `lib/navigation.js`              |
| Hizmetler                 | `lib/services.js`                |
| Analizler                 | `lib/analyses.js`                |
| Sayılar (Stats)           | `lib/stats.js`                   |
| Müşteri görüşleri         | `lib/testimonials.js`            |
| Blog yazıları             | `lib/blog.js`                    |
| Akreditasyon belgeleri    | `lib/accreditation.js`           |
| Ekip ve değerler          | `lib/company.js`                 |
| Süreç timeline'ı          | `lib/processSteps.js`            |
| Sayfa metadata (SEO)      | Her `page.js` içinde `metadata`  |
| JSON-LD schema            | `lib/seo.js` → `siteJsonLd`      |

Gerçek görselleri eklemek için `next/image`'ı kullanın; harici hostlar için
`next.config.js` → `images.remotePatterns` listesine domain ekleyin.

---

## Veritabanı (Supabase)

Tek tablo: `quote_requests` (yaratıldı, RLS açık, anon insert serbest).

Kayıtları görmek için:

```sql
select * from quote_requests order by created_at desc limit 20;
```

Supabase Studio: <https://supabase.com/dashboard/project/qyyjpmchernldzjpfuzc>

Tablo kolonları:
- `company_name`, `tax_no`, `sector`
- `product_name`, `analysis_types[]`, `notes`
- `contact_name`, `email`, `phone`, `kvkk_accepted`
- `source` (`website-quote` / `website-contact`), `status` (`new` …)

---

## Vercel Deploy

1. Repoyu GitHub'a push'la.
2. Vercel'de **Import Project** → bu repo.
3. **Environment Variables** sekmesine `.env.local`'deki değerleri ekle.
4. Build settings: framework otomatik (Next.js) algılanır.
5. Domain bağla, `NEXT_PUBLIC_SITE_URL`'i prod domain'le güncelle.

---

## Tasarım Sistemi

| Token        | Değer       | Kullanım                       |
|--------------|-------------|--------------------------------|
| `--color-bg` | #FAFAF7     | Body arka plan                 |
| `--color-bg-alt` | #F4F4EE | Section ayrımı                 |
| `--color-ink` | #0A1929    | Birincil metin                 |
| `--color-ink-soft` | #4A5567 | İkincil metin               |
| `--color-brand` | #0F4C75  | Primary, butonlar, vurgular    |
| `--color-brand-2` | #3DA5D9 | Açık akrilik mavi            |
| `--color-lime` | #C4D82E   | Lab vurgu rengi                |
| `--color-line` | #E5E5DC   | Border'lar                     |

Tüm renkler `bg-brand`, `text-ink-soft` gibi Tailwind utility olarak kullanılabilir.

---

## Animasyon Felsefesi

- Section'lar **scroll reveal** (opacity + y, 0.6s)
- Grid'lerde **stagger** (0.08s gecikme)
- Hero'da **parallax** (`useScroll` + `useTransform`)
- `AnalysisShowcase` **sticky scroll storytelling**
- Stats'te **count-up** (görünür olunca)
- Trust bar **marquee** (sonsuz yatay)
- `prefers-reduced-motion` global olarak respect ediliyor (`globals.css`)

---

## İleride Admin Panel Eklemek İçin

Mimari hazır — şu adımlar yeterli:

1. **`/admin` route group** ekle: `app/(admin)/admin/...`
2. **Supabase Auth** kur:
   - Yeni `profiles` tablosu (`user_id`, `role`)
   - Email/şifre veya magic link
3. `lib/supabase.js` zaten **`createServiceClient`** export ediyor — server'da
   admin sorguları için kullan.
4. Yeni tablolar için MCP `apply_migration` ile geliştir:
   - `samples` (numune takip)
   - `analysis_orders` (sipariş)
   - `reports` (rapor dosyaları)
5. Middleware ile `/admin/*`'a auth kontrolü ekle.

`quote_requests` tablosu zaten `status` ve `id` kolonlarıyla hazır — admin
panelindeki "yeni talepler" listesini bu tablodan beslersin.

---

## Komutlar

```bash
npm run dev      # geliştirme
npm run build    # prod build
npm start        # prod server
npm run lint     # next lint
```
