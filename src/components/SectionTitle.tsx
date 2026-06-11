import type { ReactNode } from "react";
import { motion } from "framer-motion";

type SectionTitleProps = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: SectionTitleProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`mb-12 flex flex-col gap-4 md:mb-16 ${alignment}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-neon-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-neon-cyan">
          <span className="h-1.5 w-1.5 rounded-full bg-neon-cyan animate-pulse-glow" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
