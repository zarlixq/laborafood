"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";

export async function signIn(_prev, formData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();
  if (!email || !password) return { error: "missing" };

  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);

  const { error, data } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "invalid_credentials" };

  // Verify admin
  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", data.user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    return { error: "not_admin" };
  }

  redirect("/admin");
}

export async function signOut() {
  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);
  await supabase.auth.signOut();
  redirect("/admin/login");
}
