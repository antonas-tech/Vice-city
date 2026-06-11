import { motion } from "framer-motion";
import { AUDIENCE, STATS } from "../data/site";
import { ICONS } from "../components/icons";
import { Reveal } from "../components/Reveal";
import { StatCounter } from "../components/StatCounter";

export function WhyUs() {
  return (
    <section id="why-us" className="relative px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon-blue/5 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-14 max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
            Vice City — больше, чем{" "}
            <span className="text-gradient">компьютерный клуб</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-slate-400 md:text-lg">
            Мы собрали мощное железо, комфортное пространство и атмосферу
            курортного города, чтобы каждая игровая сессия ощущалась как событие.
          </p>
        </Reveal>

        <div className="glass mb-16 grid grid-cols-2 gap-x-4 gap-y-10 rounded-3xl px-6 py-10 sm:grid-cols-3 lg:grid-cols-6">
          {STATS.map((stat) => (
            <StatCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>

        <Reveal className="mb-8 text-center">
          <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
            Для кого <span className="text-neon-cyan">Vice City Adler</span>
          </h3>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {AUDIENCE.map((aud, i) => {
            const Icon = ICONS[aud.icon];
            return (
              <motion.div
                key={aud.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-5 text-center transition-[border-color,box-shadow] duration-500 hover:border-neon-purple/40 hover:shadow-glow-purple"
              >
                <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-neon-purple">
                  <Icon className="h-5 w-5" />
                </span>
                <h4 className="mb-1.5 text-sm font-bold text-white">{aud.title}</h4>
                <p className="text-xs leading-relaxed text-slate-500">{aud.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
