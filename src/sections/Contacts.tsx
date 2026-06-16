import { Clock, MapPin, Navigation, Phone, Waves } from "lucide-react";
import { CLUB } from "../data/site";
import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";
import { SectionTitle } from "../components/SectionTitle";

export function Contacts() {
  return (
    <section id="contacts" className="relative px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-neon-cyan/5 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Контакты"
          title="Как нас найти"
          subtitle="Мы находимся на первой береговой линии Черного моря — идеально для отдыха, игры и вечерних встреч с друзьями."
        />

        <div className="grid gap-8 lg:grid-cols-2">
          <Reveal className="glass flex flex-col gap-6 rounded-3xl p-6 sm:p-8">
            <h3 className="font-display text-2xl font-bold text-white">
              {CLUB.name}
            </h3>

            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-neon-pink">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">{CLUB.address}</p>
                  <p className="text-sm text-slate-500">{CLUB.addressNote} · {CLUB.city}</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-neon-cyan">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <a
                    href={CLUB.phoneHref}
                    className="font-semibold text-white transition-colors hover:text-neon-cyan"
                  >
                    {CLUB.phone}
                  </a>
                  <p className="text-sm text-slate-500">бронирование и вопросы</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-neon-gold">
                  <Clock className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">{CLUB.schedule}</p>
                  <p className="text-sm text-slate-500">без перерывов и выходных</p>
                </div>
              </li>
              <li className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-neon-purple">
                  <Waves className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-semibold text-white">1-я береговая линия</p>
                  <p className="text-sm text-slate-500">Черное море в паре минут</p>
                </div>
              </li>
            </ul>

            <div className="mt-auto flex flex-wrap gap-3">
              <Button href={CLUB.phoneHref} magnetic>
                <Phone className="h-4 w-4" />
                Позвонить
              </Button>
              <Button href={CLUB.mapsHref} variant="secondary">
                <Navigation className="h-4 w-4 text-neon-cyan" />
                Открыть маршрут
              </Button>
              <Button href="#booking" variant="ghost">
                Забронировать
              </Button>
            </div>
          </Reveal>

          {/* dark map placeholder */}
          <Reveal delay={0.15}>
            <a
              href={CLUB.mapsHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Открыть адрес клуба в Яндекс.Картах"
              className="group relative block h-full min-h-[360px] overflow-hidden rounded-3xl border border-white/10 transition-all duration-500 hover:border-neon-cyan/40 hover:shadow-glow-cyan"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-night-800 via-night-900 to-night-950" />
              <div className="absolute inset-0 bg-grid-faint bg-[size:36px_36px]" />
              {/* stylized roads */}
              <div className="absolute left-0 top-1/3 h-px w-full -rotate-6 bg-white/10" aria-hidden="true" />
              <div className="absolute left-0 top-2/3 h-px w-full rotate-3 bg-white/10" aria-hidden="true" />
              <div className="absolute left-1/3 top-0 h-full w-px rotate-6 bg-white/10" aria-hidden="true" />
              {/* sea */}
              <div
                className="absolute -bottom-10 -right-10 h-56 w-72 rounded-[50%] bg-gradient-to-tl from-neon-cyan/25 to-neon-blue/10 blur-sm"
                aria-hidden="true"
              />
              <span className="absolute bottom-8 right-10 text-xs font-semibold uppercase tracking-[0.3em] text-neon-cyan/60">
                Черное море
              </span>

              {/* glow marker */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-neon-pink/20" />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-neon-pink to-neon-purple shadow-glow-pink">
                  <MapPin className="h-6 w-6 text-white" />
                </span>
                <p className="mt-3 whitespace-nowrap text-center font-display text-sm font-bold text-white">
                  Topzol Adler
                </p>
                <p className="whitespace-nowrap text-center text-xs text-slate-400">
                  ул. Бестужева 1/1, 2 этаж
                </p>
              </div>

              <span className="glass absolute bottom-5 left-5 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-300 group-hover:text-neon-cyan">
                Открыть в Яндекс.Картах →
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
