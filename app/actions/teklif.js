"use server";

import { createBrowserClient } from "@/lib/supabase";

function fail(message) {
  return { ok: false, error: message };
}

function isEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function submitQuoteRequest(payload) {
  try {
    const {
      company_name,
      tax_no,
      sector,
      product_name,
      analysis_types,
      notes,
      contact_name,
      email,
      phone,
      kvkk_accepted,
      source = "website-quote",
    } = payload || {};

    if (!company_name || typeof company_name !== "string") {
      return fail("Firma adı gerekli.");
    }
    if (!contact_name || typeof contact_name !== "string") {
      return fail("İletişim kişisi gerekli.");
    }
    if (!email || !isEmail(email)) {
      return fail("Geçerli bir e-posta adresi girin.");
    }
    if (!phone || typeof phone !== "string" || phone.length < 6) {
      return fail("Geçerli bir telefon numarası girin.");
    }
    if (!kvkk_accepted) {
      return fail("Devam etmek için KVKK aydınlatma metnini onaylamalısınız.");
    }

    const supabase = createBrowserClient();
    const { error } = await supabase.from("quote_requests").insert([
      {
        company_name: company_name.trim(),
        tax_no: tax_no?.trim() || null,
        sector: sector?.trim() || null,
        product_name: product_name?.trim() || null,
        analysis_types: Array.isArray(analysis_types) ? analysis_types : [],
        notes: notes?.trim() || null,
        contact_name: contact_name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        kvkk_accepted: !!kvkk_accepted,
        source,
      },
    ]);

    if (error) {
      console.error("[submitQuoteRequest] supabase error:", error);
      return fail("Kayıt sırasında bir sorun oluştu. Lütfen tekrar deneyin.");
    }

    return { ok: true };
  } catch (err) {
    console.error("[submitQuoteRequest] unexpected:", err);
    return fail("Beklenmedik bir hata oluştu.");
  }
}

export async function submitContactMessage(payload) {
  const { name, email, message } = payload || {};

  if (!name || !email || !message) {
    return fail("Tüm alanlar gerekli.");
  }
  if (!isEmail(email)) {
    return fail("Geçerli bir e-posta adresi girin.");
  }

  // Reuse quote_requests with source='contact' to avoid an extra table.
  return submitQuoteRequest({
    company_name: name,
    contact_name: name,
    email,
    phone: "—",
    notes: message,
    analysis_types: [],
    kvkk_accepted: true,
    source: "website-contact",
  });
}
