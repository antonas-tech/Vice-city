import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gamepad2, MonitorPlay, Users } from "lucide-react";
import { ZONES, type ZoneId } from "../data/site";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { SectionTitle } from "../components/SectionTitle";
import { ZoneTabs } from "../components/ZoneTabs";

const ACCENT_TONE = { cyan: "cyan", purple: "purple", pink: "pink" } as const;

const ZONE_ICONS = {
  standart: MonitorPlay,
  vip: Users,
  ps5: Gamepad2,
} as const;

export function Zones() {
  const [active, setActive] = useState<ZoneId>("standart");
  const zone = ZONES.find((z) => z.id === active)!;
  const ZoneIcon = ZONE_ICONS[zone.id];

  return (
    <section id="zones" className="relative px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-72 w-72 rounded-full bg-neon-cyan/5 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Залы"
          title="Игровые зоны"
          subtitle="Три пространства под разный сценарий: соло-катки, премиальный комфорт и консольные вечера."
        />

        <ZoneTabs
          tabs={ZONES.map((z) => ({ id: z.id, label: z.label }))}
          active={active}
          onChange={(id) => setActive(id as ZoneId)}
          layoutId="zone-tab"
        />

        <div className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={zone.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-10"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent"
              />
              <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
                <div className="flex flex-col items-start gap-5">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-neon-cyan shadow-glow-cyan">
                    <ZoneIcon className="h-7 w-7" />
                  </span>
                  <h3 className="font-display text-3xl font-bold text-white">
                    {zone.title}
                  </h3>
                  <p className="text-base leading-relaxed text-slate-400">
                    {zone.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {zone.highlights.map((h) => (
                      <Badge key={h} tone={ACCENT_TONE[zone.accent]}>
                        {h}
                      </Badge>
                    ))}
                  </div>
                  <Button href="#booking" className="mt-2" magnetic>
                    Забронировать {zone.label}
                  </Button>
                </div>

                <motion.ul
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
                  }}
                  className="grid gap-3 sm:grid-cols-2"
                >
                  {zone.specs.map((spec) => (
                    <motion.li
                      key={spec.label}
                      variants={{
                        hidden: { opacity: 0, x: 16 },
                        show: { opacity: 1, x: 0 },
                      }}
                      className={`rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3.5 transition-colors duration-300 hover:border-white/20 ${
                        spec.label === "Игры" ? "sm:col-span-2" : ""
                      }`}
                    >
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        {spec.label}
                      </p>
                      <p className="mt-1 text-sm font-medium leading-snug text-slate-200">
                        {spec.value}
                      </p>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
