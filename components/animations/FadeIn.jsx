"use client";

import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "@/lib/motion";

export default function FadeIn({
  children,
  delay = 0,
  className = "",
  as = "div",
  y = 28,
  duration = 0.6,
  ...props
}) {
  const variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const MotionComp = motion[as] || motion.div;

  return (
    <MotionComp
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </MotionComp>
  );
}
