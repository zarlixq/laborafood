"use client";

import { motion } from "framer-motion";
import { stagger, fadeUp, viewportOnce } from "@/lib/motion";

export function StaggerGroup({
  children,
  delay = 0.08,
  className = "",
  as = "div",
}) {
  const MotionComp = motion[as] || motion.div;
  return (
    <MotionComp
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(delay)}
      className={className}
    >
      {children}
    </MotionComp>
  );
}

export function StaggerItem({
  children,
  className = "",
  as = "div",
  y = 24,
}) {
  const MotionComp = motion[as] || motion.div;
  const item = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
    },
  };
  return (
    <MotionComp variants={item} className={className}>
      {children}
    </MotionComp>
  );
}
