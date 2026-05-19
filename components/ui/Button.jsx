import Link from "next/link";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg focus-visible:ring-brand disabled:opacity-60 disabled:cursor-not-allowed";

const variants = {
  primary:
    "bg-brand text-white hover:bg-ink hover:-translate-y-0.5 shadow-[0_8px_24px_-12px_rgba(15,76,117,0.5)]",
  secondary:
    "bg-ink text-white hover:bg-brand hover:-translate-y-0.5",
  ghost:
    "bg-transparent text-ink hover:bg-ink/5 border border-line hover:border-ink/30",
  outline:
    "bg-white text-ink border border-line hover:border-brand hover:text-brand",
  lightOnBrand:
    "bg-white text-brand hover:bg-bg-alt hover:-translate-y-0.5",
  outlineOnBrand:
    "bg-transparent text-white border border-white/40 hover:bg-white/10 hover:border-white",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export default function Button({
  as = "button",
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls} {...props}>
        {children}
      </Link>
    );
  }

  const Comp = as;
  return (
    <Comp className={cls} {...props}>
      {children}
    </Comp>
  );
}
