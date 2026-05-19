"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useTransform, animate } from "framer-motion";

function formatNumber(n, decimals = 0, separator = "") {
  const fixed = decimals > 0 ? n.toFixed(decimals) : Math.round(n).toString();
  if (!separator) return fixed;
  const [intPart, decPart] = fixed.split(".");
  const withSep = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  return decPart ? `${withSep},${decPart}` : withSep;
}

export default function CountUp({
  to = 0,
  duration = 1.6,
  suffix = "",
  decimals = 0,
  separator = "",
  className = "",
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(formatNumber(0, decimals, separator));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(formatNumber(v, decimals, separator)),
    });
    return () => controls.stop();
  }, [inView, to, duration, decimals, separator, mv]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
