export const analysisCategories = [
  { id: "mikrobiyoloji", label: "Mikrobiyoloji" },
  { id: "kimya", label: "Kimya" },
  { id: "su", label: "Su & Çevre" },
  { id: "raf-omru", label: "Raf Ömrü" },
];

export const analyses = [
  // Mikrobiyoloji
  { id: "salmonella", name: "Salmonella spp.", category: "mikrobiyoloji", duration: "3–5 gün", method: "ISO 6579-1", description: "Et, süt, sebze ve hazır gıdalarda Salmonella varlığı." },
  { id: "listeria", name: "Listeria monocytogenes", category: "mikrobiyoloji", duration: "4–7 gün", method: "ISO 11290-1", description: "Soğuk zincir ürünlerde Listeria tespiti." },
  { id: "ecoli", name: "E. coli & E. coli O157", category: "mikrobiyoloji", duration: "2–4 gün", method: "ISO 16649-2", description: "Fekal kontaminasyon indikatörü ve patojenik varyant." },
  { id: "staphylococcus", name: "Koagülaz pozitif Stafilokok", category: "mikrobiyoloji", duration: "2–3 gün", method: "ISO 6888-1", description: "Süt ürünleri ve şarküteride toksin üretici stafilokok." },
  { id: "kuf-maya", name: "Küf ve Maya Sayımı", category: "mikrobiyoloji", duration: "5–7 gün", method: "ISO 21527-1/2", description: "Bozulma indikatörü mikroorganizma sayımı." },
  { id: "koliform", name: "Koliform / E. coli (su)", category: "mikrobiyoloji", duration: "1–2 gün", method: "ISO 9308-1", description: "İçme ve kullanma suyunda mikrobiyolojik kalite." },
  { id: "tamc", name: "Toplam Aerobik Bakteri Sayımı", category: "mikrobiyoloji", duration: "2–3 gün", method: "ISO 4833-1", description: "Genel mikrobiyolojik yük göstergesi." },
  { id: "campylobacter", name: "Campylobacter spp.", category: "mikrobiyoloji", duration: "4–6 gün", method: "ISO 10272-1", description: "Kümes hayvanları ürünlerinde Campylobacter." },

  // Kimya
  { id: "agir-metal", name: "Ağır Metal Paneli (Pb, Cd, As, Hg)", category: "kimya", duration: "5–7 gün", method: "ICP-MS", description: "Kurşun, kadmiyum, arsenik ve cıva tayini." },
  { id: "pestisit", name: "Pestisit Kalıntı Taraması (>500)", category: "kimya", duration: "5–8 gün", method: "LC-MS/MS, GC-MS/MS", description: "Geniş spektrumlu pestisit kalıntı analizi." },
  { id: "mikotoksin", name: "Mikotoksin (Aflatoksin, OTA, DON)", category: "kimya", duration: "4–6 gün", method: "HPLC-FLD / LC-MS", description: "Tahıl, kuruyemiş ve baharatlarda mikotoksin." },
  { id: "katki", name: "Gıda Katkı Maddesi", category: "kimya", duration: "3–5 gün", method: "HPLC-DAD", description: "Koruyucu, renklendirici, tatlandırıcı analizleri." },
  { id: "besin", name: "Besin Değeri (Nutrition Panel)", category: "kimya", duration: "5–7 gün", method: "Çeşitli", description: "Enerji, protein, yağ, karbonhidrat, lif, tuz." },
  { id: "yag-asidi", name: "Yağ Asidi Profili", category: "kimya", duration: "4–6 gün", method: "GC-FID", description: "Doymuş, tekli/çoklu doymamış yağ asitleri, trans yağ." },
  { id: "akrilamid", name: "Akrilamid", category: "kimya", duration: "5–7 gün", method: "LC-MS/MS", description: "Fırın ürünleri ve kahvede akrilamid tayini." },
  { id: "histamin", name: "Histamin", category: "kimya", duration: "3–4 gün", method: "HPLC", description: "Balık ve balık ürünlerinde histamin." },

  // Su & Çevre
  { id: "icme-suyu", name: "İçme Suyu Uygunluk Paketi", category: "su", duration: "5–7 gün", method: "TS 266 / İYS Yön.", description: "Mikrobiyolojik + kimyasal + fiziksel tam paket." },
  { id: "kullanma-suyu", name: "Kullanma Suyu Analizi", category: "su", duration: "3–5 gün", method: "İYS Yönetmeliği", description: "Endüstriyel ve sıhhi kullanım suyu kalitesi." },
  { id: "havuz-suyu", name: "Havuz Suyu", category: "su", duration: "2–3 gün", method: "Yüzme Havuzları Yön.", description: "Yüzme havuzu suyu hijyen analizi." },
  { id: "atik-su", name: "Atıksu Deşarj Analizi", category: "su", duration: "5–7 gün", method: "SKKY", description: "Su Kirliliği Kontrolü Yönetmeliği'ne göre deşarj parametreleri." },
  { id: "yuzey-suyu", name: "Yüzey Suyu İzleme", category: "su", duration: "5–7 gün", method: "Yüzey Sul. Yön.", description: "Göl, nehir ve baraj suları izleme." },

  // Raf Ömrü
  { id: "raf-mikro", name: "Raf Ömrü — Mikrobiyolojik Takip", category: "raf-omru", duration: "Ürüne göre değişir", method: "Süreli izleme", description: "Belirli zaman aralıklarında mikrobiyolojik takip." },
  { id: "raf-kimya", name: "Raf Ömrü — Kimyasal Stabilite", category: "raf-omru", duration: "Ürüne göre değişir", method: "Çoklu metod", description: "Peroksit, asit, vitamin kaybı izleme." },
  { id: "duyusal", name: "Duyusal Değerlendirme Panel", category: "raf-omru", duration: "1–3 gün", method: "Eğitimli panel", description: "Renk, koku, tat, doku skorlaması." },
  { id: "hizlandirilmis", name: "Hızlandırılmış Raf Ömrü", category: "raf-omru", duration: "2–4 hafta", method: "Stres testi", description: "Yüksek sıcaklık/nem ile hızlandırılmış stabilite." },
];
