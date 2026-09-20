"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { cn, EASE_OUT, isCvLabPath } from "@/lib";

/**
 * Soft page fade on client navigations. Avoid AnimatePresence mode="wait" /
 * it can leave the next page stuck at opacity 0 when moving between routes.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lab = isCvLabPath(pathname);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      className={cn("min-h-0 w-full", lab && "flex flex-1 flex-col")}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
