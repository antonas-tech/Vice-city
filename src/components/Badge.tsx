import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  tone?: "cyan" | "pink" | "purple" | "gold" | "neutral";
  className?: string;
};

const TONES: Record<NonNullable<BadgeProps["tone"]>, string> = {
  cyan: "border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan",
  pink: "border-neon-pink/30 bg-neon-pink/10 text-neon-pink",
  purple: "border-neon-purple/30 bg-neon-purple/10 text-neon-purple",
  gold: "border-neon-gold/30 bg-neon-gold/10 text-neon-gold",
  neutral: "border-white/15 bg-white/5 text-slate-300",
};

export function Badge({ children, tone = "neutral", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
