import createIntlMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Admin routes — Supabase session guard, skip i18n entirely
  if (pathname.startsWith("/admin")) {
    let response = NextResponse.next();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll: () => req.cookies.getAll(),
          setAll: (cookies) => {
            cookies.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      }
    );
    const { data: { user } } = await supabase.auth.getUser();
    const isLogin = pathname === "/admin/login";

    if (!user && !isLogin) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
    if (user && isLogin) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return response;
  }

  // API + tracking endpoints skip i18n
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  // Match everything except static assets, _next, and files with extensions
  matcher: ["/((?!_next|.*\\..*).*)"],
};
