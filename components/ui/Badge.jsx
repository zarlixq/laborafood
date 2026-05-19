export default function Badge({ children, className = "", tone = "neutral" }) {
  const tones = {
    neutral: "bg-bg-alt text-ink-soft border-line",
    brand: "bg-brand/8 text-brand border-brand/20",
    lime: "bg-lime/20 text-ink border-lime/40",
    white: "bg-white text-ink border-line",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
