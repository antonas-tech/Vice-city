import { motion } from "framer-motion";
import { FEATURES } from "../data/site";
import { ICONS } from "../components/icons";
import { SectionTitle } from "../components/SectionTitle";

const ACCENTS = [
  "text-neon-cyan group-hover:shadow-glow-cyan",
  "text-neon-purple group-hover:shadow-glow-purple",
  "text-neon-pink group-hover:shadow-glow-pink",
] as const;

export function Features() {
  return (
    <section id="features" className="relative px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Преимущества"
          title={
            <>
              Почему <span className="text-gradient">Topzol Adler</span>?
            </>
          }
          subtitle="Мощное железо, курортная атмосфера и сервис, ради которого возвращаются."
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                className="glass group rounded-2xl p-6 transition-[border-color,box-shadow] duration-500 hover:border-neon-cyan/30 hover:shadow-glow-soft sm:p-7"
              >
                <span
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-all duration-500 group-hover:scale-110 ${ACCENTS[i % 3]}`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2 font-display text-lg font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {feature.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
