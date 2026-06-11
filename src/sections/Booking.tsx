import { Clock, Phone, ShieldCheck } from "lucide-react";
import { CLUB, TRUST_BADGES } from "../data/site";
import { Badge } from "../components/Badge";
import { BookingForm } from "../components/BookingForm";
import { Button } from "../components/Button";
import { GlassCard } from "../components/GlassCard";
import { Reveal } from "../components/Reveal";
import { SectionTitle } from "../components/SectionTitle";

export function Booking() {
  return (
    <section id="booking" className="relative px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div
        className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 rounded-full bg-neon-pink/8 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Бронирование"
          title="Забронировать место"
          subtitle="Бронируй место заранее — особенно на вечер и ночь. Это бесплатно и занимает минуту."
        />

        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col gap-6">
            <GlassCard glow="pink" className="rounded-3xl p-6 sm:p-8">
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-neon-pink">
                <Phone className="h-6 w-6" />
              </span>
              <h3 className="mb-2 font-display text-xl font-semibold text-white">
                Быстрое бронирование
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-slate-400">
                Позвоните нам — подберем места для вас и друзей за пару минут.
              </p>
              <Button href={CLUB.phoneHref} size="lg" variant="secondary" className="w-full">
                <Phone className="h-4 w-4 text-neon-cyan" />
                {CLUB.phone}
              </Button>
            </GlassCard>

            <GlassCard glow="cyan" className="rounded-3xl p-6 sm:p-8">
              <div className="mb-4 flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-sm font-semibold text-emerald-400">
                  Открыто сейчас · 24/7
                </span>
              </div>
              <p className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-400">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-neon-gold" />
                Вечером и ночью клуб загружен сильнее всего — бронируйте заранее,
                чтобы гарантировать места рядом для всей команды.
              </p>
            </GlassCard>

            <div className="flex flex-wrap gap-2">
              {TRUST_BADGES.map((badge) => (
                <Badge key={badge} tone="neutral">
                  <ShieldCheck className="h-3 w-3 text-neon-cyan" />
                  {badge}
                </Badge>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <BookingForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
