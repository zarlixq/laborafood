"use client";

export default function Marquee({ children, className = "" }) {
  return (
    <div
      className={`overflow-hidden relative ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="marquee-track gap-12 lg:gap-16">
        {children}
        {children}
      </div>
    </div>
  );
}
