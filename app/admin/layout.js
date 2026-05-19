import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Panel administrativ — LaboraFood",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const supabase = createServerClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  // Login page renders without sidebar (no user yet).
  if (!user) {
    return <div className="bg-bg-alt min-h-screen">{children}</div>;
  }

  // Verify admin role.
  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!admin) {
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  return (
    <div className="bg-bg-alt min-h-screen flex">
      <AdminSidebar email={user.email} />
      <div className="flex-1 lg:ml-64">
        <main className="px-6 lg:px-10 py-8 lg:py-10 max-w-6xl">{children}</main>
      </div>
    </div>
  );
}
