import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
  size?: "md" | "lg";
  className?: string;
  ariaLabel?: string;
  magnetic?: boolean;
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple text-night-950 font-bold shadow-glow-cyan hover:shadow-glow-purple",
  secondary:
    "glass text-soft hover:border-neon-pink/50 hover:shadow-glow-pink",
  ghost:
    "text-slate-300 hover:text-white border border-transparent hover:border-white/15",
};

const SIZES: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  ariaLabel,
  magnetic = false,
}: ButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  const handleMove = (e: MouseEvent) => {
    if (!magnetic || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.25);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const classes = `relative inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-300 active:scale-[0.97] ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const content = (
    <motion.span
      ref={ref}
      style={{ x: sx, y: sy }}
      className="inline-flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className={classes}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={classes}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
