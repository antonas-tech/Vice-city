import { motion } from "framer-motion";
import { Check, Moon, Star } from "lucide-react";
import type { PricePlan } from "../data/site";
import { Badge } from "./Badge";
import { Button } from "./Button";

const ACCENT_TEXT: Record<PricePlan["accent"], string> = {
  cyan: "text-neon-cyan",
  purple: "text-neon-purple",
  pink: "text-neon-pink",
};

const ACCENT_BORDER: Record<PricePlan["accent"], string> = {
  cyan: "hover:border-neon-cyan/40 hover:shadow-glow-cyan",
  purple: "border-neon-purple/40 shadow-glow-purple",
  pink: "hover:border-neon-pink/40 hover:shadow-glow-pink",
};

type PricingCardProps = {
  plan: PricePlan;
  index: number;
};

export function PricingCard({ plan, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className={`glass relative flex h-full flex-col overflow-hidden rounded-3xl p-6 transition-[border-color,box-shadow] duration-500 sm:p-8 ${
        ACCENT_BORDER[plan.accent]
      } ${plan.premium ? "lg:-mt-4 lg:mb-4" : ""}`}
    >
      {plan.premium && (
        <>
          {/* shimmer sweep across the premium card */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/[0.06] to-transparent bg-[length:200%_100%]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 left-1/2 h-40 w-72 -translate-x-1/2 rounded-full bg-neon-purple/25 blur-3xl"
          />
        </>
      )}

      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h3 className={`font-display text-2xl font-bold ${ACCENT_TEXT[plan.accent]}`}>
            {plan.name}
          </h3>
          <p className="mt-2 text-sm text-slate-400">{plan.description}</p>
        </div>
        {plan.badge && (
          <Badge tone={plan.premium ? "gold" : plan.accent === "pink" ? "pink" : "cyan"}>
            {plan.premium && <Star className="h-3 w-3 fill-current" />}
            {plan.badge}
          </Badge>
        )}
      </div>

      <div className="mb-6 flex items-end gap-2">
        <span className="font-display text-5xl font-bold text-white">
          {plan.hourPrice}
        </span>
        <span className="pb-1.5 text-sm text-slate-400">₽ / час</span>
      </div>

      <ul className="mb-6 flex flex-col gap-2.5">
        {plan.specs.map((spec) => (
          <li key={spec} className="flex items-center gap-2.5 text-sm text-slate-300">
            <Check className={`h-4 w-4 shrink-0 ${ACCENT_TEXT[plan.accent]}`} />
            {spec}
          </li>
        ))}
      </ul>

      <div className="mb-7 flex flex-col gap-2">
        {plan.packages.map((pkg) => (
          <div
            key={pkg.name}
            className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors duration-300 ${
              pkg.accent
                ? "border-neon-gold/30 bg-neon-gold/[0.06]"
                : "border-white/8 bg-white/[0.03]"
            }`}
          >
            <span className="flex items-center gap-2 text-slate-300">
              {pkg.accent && <Moon className="h-3.5 w-3.5 text-neon-gold" />}
              <span>
                {pkg.name}
                {pkg.note && (
                  <span className="ml-1.5 text-xs text-slate-500">{pkg.note}</span>
                )}
              </span>
            </span>
            <span
              className={`font-display font-semibold ${
                pkg.accent ? "text-neon-gold" : "text-white"
              }`}
            >
              {pkg.price} ₽
            </span>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <Button
          href="#booking"
          variant={plan.premium ? "primary" : "secondary"}
          className="w-full"
        >
          Забронировать
        </Button>
      </div>
    </motion.div>
  );
}
