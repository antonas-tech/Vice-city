import { motion } from "framer-motion";
import { Eye, MonitorPlay, Palmtree, Phone, Waves, Zap } from "lucide-react";
import { CLUB, HERO_BADGES } from "../data/site";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

function NeonScene() {
  return (
    <div className="relative h-[380px] w-full max-w-md lg:h-[480px]" aria-hidden="true">
      {/* aurora glow blobs */}
      <div className="absolute left-1/4 top-1/4 h-56 w-56 animate-aurora rounded-full bg-neon-purple/25 blur-3xl" />
      <div className="absolute bottom-1/4 right-0 h-48 w-48 animate-aurora rounded-full bg-neon-cyan/20 blur-3xl [animation-delay:-6s]" />
      <div className="absolute bottom-0 left-0 h-40 w-40 animate-aurora rounded-full bg-neon-pink/20 blur-3xl [animation-delay:-11s]" />

      {/* stylized gaming monitor */}
      <motion.div
        initial={{ opacity: 0, y: 40, rotate: -2 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
        className="absolute left-1/2 top-[38%] w-[78%] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="animate-float">
          <div className="relative rounded-2xl border border-neon-cyan/40 bg-night-900/90 p-2 shadow-glow-cyan backdrop-blur">
            <div className="relative h-40 overflow-hidden rounded-xl bg-gradient-to-br from-night-800 via-[#140b2e] to-[#2a0a33] lg:h-52">
              {/* sunset sun */}
              <div className="absolute left-1/2 top-[42%] h-20 w-20 -translate-x-1/2 rounded-full bg-gradient-to-b from-neon-gold via-neon-pink to-transparent opacity-90 blur-[1px] lg:h-28 lg:w-28" />
              {/* sea horizon lines */}
              <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-b from-neon-purple/30 to-night-950">
                <div className="h-full w-full bg-grid-faint bg-[size:22px_14px] [transform:perspective(220px)_rotateX(55deg)] origin-top" />
              </div>
              {/* palms */}
              <Palmtree className="absolute bottom-[38%] left-3 h-12 w-12 text-night-950 drop-shadow-[0_0_6px_rgba(255,46,147,0.6)] lg:h-16 lg:w-16" />
              <Palmtree className="absolute bottom-[38%] right-3 h-9 w-9 -scale-x-100 text-night-950 drop-shadow-[0_0_6px_rgba(0,229,255,0.6)] lg:h-12 lg:w-12" />
              {/* scanline shimmer */}
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/[0.05] to-transparent bg-[length:200%_100%]" />
            </div>
            {/* monitor stand */}
            <div className="mx-auto mt-2 h-5 w-16 rounded-b-xl bg-gradient-to-b from-white/10 to-transparent" />
          </div>
        </div>
      </motion.div>

      {/* floating spec cards */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute -left-2 top-[12%] sm:left-0"
      >
        <div className="glass animate-float rounded-xl px-4 py-3 shadow-glow-pink [animation-delay:-2s]">
          <div className="flex items-center gap-2.5">
            <Zap className="h-4 w-4 text-neon-pink" />
            <div>
              <p className="text-xs font-bold text-white">RTX 40-series</p>
              <p className="text-[10px] text-slate-500">VIP Zone</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="absolute -right-2 top-[55%] sm:right-0"
      >
        <div className="glass animate-float rounded-xl px-4 py-3 shadow-glow-cyan [animation-delay:-4s]">
          <div className="flex items-center gap-2.5">
            <MonitorPlay className="h-4 w-4 text-neon-cyan" />
            <div>
              <p className="text-xs font-bold text-white">до 380 Гц</p>
              <p className="text-[10px] text-slate-500">ASUS ROG</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.3 }}
        className="absolute bottom-[4%] left-[12%]"
      >
        <div className="glass animate-float rounded-xl px-4 py-3 shadow-glow-purple [animation-delay:-1s]">
          <div className="flex items-center gap-2.5">
            <Waves className="h-4 w-4 text-neon-purple" />
            <div>
              <p className="text-xs font-bold text-white">Черное море</p>
              <p className="text-[10px] text-slate-500">пара минут пешком</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="noise-overlay relative flex min-h-screen items-center overflow-hidden pb-16 pt-28 lg:pt-32"
    >
      {/* background grid + glows */}
      <div
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-neon-purple/10 blur-3xl"
        aria-hidden="true"
      />
      {/* running neon line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[72px] h-px overflow-hidden"
        aria-hidden="true"
      >
        <div className="h-full w-1/3 animate-ticker bg-gradient-to-r from-transparent via-neon-cyan to-transparent" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6"
        >
          {/* live status */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Открыто сейчас · 24/7
            </span>
            <span className="hidden items-center gap-1.5 text-xs text-slate-500 sm:inline-flex">
              <Eye className="h-3.5 w-3.5" />
              Лучше бронировать заранее вечером и ночью
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            VICE CITY
            <br />
            <span className="text-gradient drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]">
              ADLER
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-xl text-lg font-semibold text-slate-200 sm:text-xl"
          >
            Элитный компьютерный клуб на 1-й береговой линии Черного моря
          </motion.p>

          <motion.p variants={item} className="text-sm font-medium tracking-wide text-neon-cyan/90 sm:text-base">
            24/7 · мощные игровые ПК · VIP-зал · PS5 · прохладительные напитки ·
            чистота и комфорт
          </motion.p>

          <motion.p variants={item} className="max-w-xl text-base leading-relaxed text-slate-400">
            Премиальное игровое пространство в Адлере для тех, кто хочет играть
            на максималках, отдыхать с друзьями и наслаждаться атмосферой
            ночного Сочи.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <Button href="#booking" size="lg" magnetic>
              Забронировать место
            </Button>
            <Button href="#pricing" variant="secondary" size="lg">
              Смотреть прайс
            </Button>
            <Button href={CLUB.phoneHref} variant="ghost" size="lg" ariaLabel={`Позвонить: ${CLUB.phone}`}>
              <Phone className="h-4 w-4 text-neon-cyan" />
              Позвонить
            </Button>
          </motion.div>

          <motion.div variants={item} className="flex flex-wrap gap-2">
            {HERO_BADGES.map((badge, i) => (
              <Badge
                key={badge}
                tone={(["cyan", "purple", "pink", "gold", "neutral"] as const)[i % 5]}
              >
                {badge}
              </Badge>
            ))}
          </motion.div>
        </motion.div>

        <div className="hidden justify-center lg:flex">
          <NeonScene />
        </div>
      </div>
    </section>
  );
}
