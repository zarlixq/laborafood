import Link from "next/link";
import { FlaskConical, Linkedin, Instagram, Twitter, Mail, Phone, MapPin, Clock } from "lucide-react";
import { footerNav, company } from "@/lib/navigation";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-white/80">
      <div className="container-app py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          <div className="col-span-2 lg:col-span-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white font-serif text-xl"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-2 text-ink">
                <FlaskConical className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="font-semibold">{company.name}</span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-white/65 max-w-sm">
              {company.description}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[
                { href: company.social.linkedin, Icon: Linkedin, label: "LinkedIn" },
                { href: company.social.instagram, Icon: Instagram, label: "Instagram" },
                { href: company.social.twitter, Icon: Twitter, label: "Twitter" },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 hover:bg-white hover:text-ink transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-sans text-xs uppercase tracking-widest text-white/50 mb-4">
              Hizmetler
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerNav.hizmetler.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-sans text-xs uppercase tracking-widest text-white/50 mb-4">
              Kurumsal
            </h4>
            <ul className="space-y-2.5 text-sm">
              {footerNav.kurumsal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-4">
            <h4 className="font-sans text-xs uppercase tracking-widest text-white/50 mb-4">
              İletişim
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-brand-2 flex-shrink-0" />
                <span>
                  {company.address.street}, {company.address.district}
                  <br />
                  {company.address.zip} {company.address.city}/
                  {company.address.country}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brand-2 flex-shrink-0" />
                <a href={`tel:${company.phone}`} className="hover:text-white">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brand-2 flex-shrink-0" />
                <a href={`mailto:${company.email}`} className="hover:text-white">
                  {company.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-brand-2 flex-shrink-0" />
                <span>{company.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 text-xs text-white/50">
          <p>© {year} {company.legalName}. Tüm hakları saklıdır.</p>
          <ul className="flex flex-wrap gap-4">
            {footerNav.yasal.map((l) => (
              <li key={l.label}>
                <Link href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
