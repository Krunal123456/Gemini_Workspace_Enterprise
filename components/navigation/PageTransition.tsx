"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        className="app-page-enter"
        initial={false}
        exit={{
          opacity: reduceMotion ? 1 : 0,
          transition: { duration: reduceMotion ? 0 : 0.14, ease: "easeOut" },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}