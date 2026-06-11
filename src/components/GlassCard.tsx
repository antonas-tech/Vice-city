import type { ReactNode } from "react";
import { motion } from "framer-motion";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "cyan" | "purple" | "pink" | "none";
};

const GLOW: Record<NonNullable<GlassCardProps["glow"]>, string> = {
  cyan: "hover:border-neon-cyan/40 hover:shadow-glow-cyan",
  purple: "hover:border-neon-purple/40 hover:shadow-glow-purple",
  pink: "hover:border-neon-pink/40 hover:shadow-glow-pink",
  none: "",
};

export function GlassCard({
  children,
  className = "",
  hover = true,
  glow = "cyan",
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -6 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={`glass rounded-2xl transition-[border-color,box-shadow] duration-500 ${GLOW[glow]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
