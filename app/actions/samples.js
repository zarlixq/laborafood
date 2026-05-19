"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase";

async function getClient() {
  const cookieStore = await cookies();
  return createServerClient(cookieStore);
}

export async function createSample(_prev, formData) {
  const supabase = await getClient();

  const payload = {
    customer_name: formData.get("customer_name")?.toString().trim(),
    customer_phone: formData.get("customer_phone")?.toString().trim() || null,
    customer_email: formData.get("customer_email")?.toString().trim() || null,
    product_name: formData.get("product_name")?.toString().trim(),
    analysis_type: formData.get("analysis_type")?.toString(),
    analysis_details: formData.get("analysis_details")?.toString().trim() || null,
    estimated_completion: formData.get("estimated_completion")?.toString() || null,
    notes: formData.get("notes")?.toString().trim() || null,
  };

  if (!payload.customer_name || !payload.product_name || !payload.analysis_type) {
    return { error: "missing_fields" };
  }

  const { data: codeRow, error: codeErr } = await supabase.rpc("generate_tracking_code");
  if (codeErr) {
    console.error("[createSample/rpc]", codeErr);
    return { error: "code_generation_failed" };
  }

  const trackingCode = typeof codeRow === "string" ? codeRow : codeRow?.toString();
  if (!trackingCode) return { error: "code_generation_failed" };

  const { data, error } = await supabase
    .from("samples")
    .insert({ ...payload, tracking_code: trackingCode })
    .select("id, tracking_code")
    .single();

  if (error) {
    console.error("[createSample/insert]", error);
    return { error: "insert_failed" };
  }

  revalidatePath("/admin/samples");
  revalidatePath("/admin");
  redirect(`/admin/samples/${data.id}?created=1`);
}

export async function updateSampleStatus(id, status) {
  const supabase = await getClient();
  const { error } = await supabase.from("samples").update({ status }).eq("id", id);
  if (error) {
    console.error("[updateSampleStatus]", error);
    return { error: "update_failed" };
  }
  revalidatePath(`/admin/samples/${id}`);
  revalidatePath("/admin/samples");
  revalidatePath("/admin");
  return { ok: true };
}

export async function updateSample(id, fields) {
  const supabase = await getClient();
  const { error } = await supabase.from("samples").update(fields).eq("id", id);
  if (error) {
    console.error("[updateSample]", error);
    return { error: "update_failed" };
  }
  revalidatePath(`/admin/samples/${id}`);
  return { ok: true };
}

export async function uploadSampleReport(id, formData) {
  const supabase = await getClient();
  const file = formData.get("file");
  if (!file || typeof file === "string") return { error: "no_file" };

  // Get tracking code
  const { data: sample } = await supabase
    .from("samples")
    .select("tracking_code")
    .eq("id", id)
    .single();

  if (!sample) return { error: "not_found" };

  const path = `${sample.tracking_code}.pdf`;
  const { error: uploadErr } = await supabase.storage
    .from("reports")
    .upload(path, file, { upsert: true, contentType: "application/pdf" });

  if (uploadErr) {
    console.error("[uploadReport]", uploadErr);
    return { error: "upload_failed" };
  }

  const { data: urlData } = supabase.storage.from("reports").getPublicUrl(path);
  const publicUrl = urlData.publicUrl;

  const { error: updErr } = await supabase
    .from("samples")
    .update({ report_url: publicUrl })
    .eq("id", id);

  if (updErr) {
    console.error("[uploadReport/update]", updErr);
    return { error: "update_failed" };
  }

  revalidatePath(`/admin/samples/${id}`);
  return { ok: true, url: publicUrl };
}

export async function deleteSample(id) {
  const supabase = await getClient();
  const { error } = await supabase.from("samples").delete().eq("id", id);
  if (error) {
    console.error("[deleteSample]", error);
    return { error: "delete_failed" };
  }
  revalidatePath("/admin/samples");
  redirect("/admin/samples");
}
