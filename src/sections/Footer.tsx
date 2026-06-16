import { MapPin, Phone } from "lucide-react";
import { CLUB, NAV_LINKS } from "../data/site";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-4 pb-10 pt-14 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-xl font-bold text-white">
              TOP<span className="text-gradient">ZOL</span> ADLER
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
              Gaming Club · Adler · 24/7
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Элитный компьютерный клуб на первой береговой линии Черного моря.
              Место, где катка становится событием.
            </p>
          </div>

          <nav className="flex flex-col gap-2.5" aria-label="Навигация в подвале">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Навигация
            </p>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="w-fit text-sm text-slate-500 transition-colors hover:text-neon-cyan"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Контакты
            </p>
            <a
              href={CLUB.phoneHref}
              className="flex w-fit items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-neon-cyan"
            >
              <Phone className="h-4 w-4 text-neon-cyan" />
              {CLUB.phone}
            </a>
            <p className="flex items-start gap-2 text-sm text-slate-500">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neon-pink" />
              {CLUB.address}, {CLUB.addressNote}
            </p>
            <p className="text-sm text-slate-500">{CLUB.schedule}</p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Topzol Adler. Все права защищены.
          </p>
          <p className="text-xs tracking-wide text-slate-600">
            Designed for premium gaming experience
          </p>
        </div>
      </div>
    </footer>
  );
}
