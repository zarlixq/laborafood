"use client";

import { useState, useEffect } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X, Leaf } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { mainNav, company } from "@/lib/navigation";
import Button from "@/components/ui/Button";
import LocaleSwitcher from "@/components/LocaleSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");
  const locale = useLocale();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-bg/80 border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-app flex items-center justify-between h-16 lg:h-20">
        <Link href="/" aria-label={company.name} className="flex items-center gap-2 text-ink font-serif text-xl tracking-tight">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand text-accent">
            <Leaf className="h-5 w-5" strokeWidth={2} />
          </span>
          <span className="font-semibold">{company.name}</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7">
          {mainNav.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href} className="relative">
                <Link
                  href={item.href}
                  className={`text-sm transition-colors ${active ? "text-ink font-medium" : "text-ink-soft hover:text-ink"}`}
                >
                  {t(item.key)}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand rounded-full"
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-4">
          <LocaleSwitcher />
          <Button href="/quote" size="md">{t("quote")}</Button>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <LocaleSwitcher compact />
          <button
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-bg z-40 overflow-y-auto"
          >
            <div className="container-app py-8 flex flex-col gap-1">
              {mainNav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04 }}
                >
                  <Link href={item.href} className="block py-4 text-2xl font-serif text-ink border-b border-line">
                    {t(item.key)}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8">
                <Button href="/quote" size="lg" className="w-full">{t("quote")}</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
