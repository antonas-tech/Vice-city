import { motion } from "framer-motion";
import { OFFERS } from "../data/site";
import { ICONS } from "../components/icons";
import { Badge } from "../components/Badge";
import { SectionTitle } from "../components/SectionTitle";

export function Offers() {
  return (
    <section id="offers" className="relative px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div
        className="pointer-events-none absolute right-0 bottom-0 h-72 w-72 rounded-full bg-neon-gold/5 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Акции"
          title={
            <>
              Акции и <span className="text-gradient">спецпредложения</span>
            </>
          }
          subtitle="Выгодные пакеты и форматы для тех, кто играет по-крупному."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OFFERS.map((offer, i) => {
            const Icon = ICONS[offer.icon];
            return (
              <motion.div
                key={offer.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl p-px"
              >
                {/* animated gradient border */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-cyan/30 via-neon-purple/30 to-neon-pink/30 bg-[length:200%_200%] opacity-50 transition-opacity duration-500 animate-border-run group-hover:opacity-100"
                />
                <div className="relative flex h-full flex-col gap-4 rounded-2xl bg-night-900/95 p-6">
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-neon-gold transition-transform duration-500 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    {offer.badge && <Badge tone="pink">{offer.badge}</Badge>}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {offer.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {offer.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
