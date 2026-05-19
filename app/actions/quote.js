"use server";

import { createAnonClient } from "@/lib/supabase";

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

function fail(message) {
  return { ok: false, error: message };
}

export async function submitQuoteRequest(payload) {
  try {
    const {
      company_name,
      contact_person,
      email,
      phone,
      product_type,
      analyses_needed,
      message,
      privacy_accepted,
      source = "website-quote",
    } = payload || {};

    if (!company_name || typeof company_name !== "string") return fail("companyRequired");
    if (!contact_person || typeof contact_person !== "string") return fail("contactRequired");
    if (!email || !isEmail(email)) return fail("emailInvalid");
    if (!privacy_accepted) return fail("privacyRequired");

    const supabase = createAnonClient();
    const { error } = await supabase.from("quote_requests").insert([
      {
        company_name: company_name.trim(),
        contact_person: contact_person.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        product_type: product_type?.trim() || null,
        analyses_needed: Array.isArray(analyses_needed) ? analyses_needed : [],
        message: message?.trim() || null,
        source,
      },
    ]);

    if (error) {
      console.error("[submitQuoteRequest]", error);
      return fail("generic");
    }
    return { ok: true };
  } catch (err) {
    console.error("[submitQuoteRequest unexpected]", err);
    return fail("generic");
  }
}

export async function submitContactMessage(payload) {
  const { name, email, message } = payload || {};
  if (!name || !email || !message) return fail("allRequired");
  if (!isEmail(email)) return fail("emailInvalid");
  return submitQuoteRequest({
    company_name: name,
    contact_person: name,
    email,
    phone: null,
    message,
    analyses_needed: [],
    privacy_accepted: true,
    source: "website-contact",
  });
}
