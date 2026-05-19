"use client";

import { motion } from "framer-motion";

export default function RevealImage({ children, className = "" }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.0, ease: [0.83, 0, 0.17, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
