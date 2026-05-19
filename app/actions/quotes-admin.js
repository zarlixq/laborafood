"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase";

export async function updateQuoteStatus(id, status) {
  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);
  const { error } = await supabase.from("quote_requests").update({ status }).eq("id", id);
  if (error) return { error: "update_failed" };
  revalidatePath("/admin/quotes");
  return { ok: true };
}
