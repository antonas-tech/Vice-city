import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, CheckCircle2, Phone, Send } from "lucide-react";
import { BOOKING_PACKAGES, CLUB, ZONES, type ZoneId } from "../data/site";
import { addBooking } from "../store/clubStore";
import { Button } from "./Button";

type FormState = {
  name: string;
  phone: string;
  zone: string;
  guests: string;
  date: string;
  time: string;
  pack: string;
  comment: string;
};

const INITIAL: FormState = {
  name: "",
  phone: "",
  zone: "standart",
  guests: "1",
  date: "",
  time: "",
  pack: "1 час",
  comment: "",
};

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").replace(/^8/, "7").slice(0, 11);
  if (!digits) return "";
  let result = "+7";
  if (digits.length > 1) result += ` (${digits.slice(1, 4)}`;
  if (digits.length >= 4) result += `) ${digits.slice(4, 7)}`;
  if (digits.length >= 7) result += `-${digits.slice(7, 9)}`;
  if (digits.length >= 9) result += `-${digits.slice(9, 11)}`;
  return result;
}

export function BookingForm() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = "Укажите имя";
    if (form.phone.replace(/\D/g, "").length < 11)
      next.phone = "Укажите телефон полностью";
    if (!form.date) next.date = "Выберите дату";
    if (!form.time) next.time = "Выберите время";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      // заявка попадает в панель администратора (localStorage)
      addBooking({
        name: form.name.trim(),
        phone: form.phone,
        zone: form.zone as ZoneId,
        guests: form.guests,
        date: form.date,
        time: form.time,
        pack: form.pack,
        comment: form.comment.trim(),
      });
      setSubmitted(true);
    }
  };

  return (
    <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8">
      {/* glow frame */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/70 to-transparent"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-neon-purple/20 blur-3xl"
      />

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="flex min-h-[420px] flex-col items-center justify-center gap-5 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.15 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 text-neon-cyan shadow-glow-cyan"
            >
              <CheckCircle2 className="h-10 w-10" />
            </motion.span>
            <h3 className="font-display text-2xl font-bold text-white">
              Заявка создана
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Для подтверждения брони администратор свяжется с вами по телефону.
            </p>
            <Button href={CLUB.phoneHref} size="lg" magnetic>
              <Phone className="h-4 w-4" />
              Позвонить сейчас: {CLUB.phone}
            </Button>
            <button
              type="button"
              onClick={() => {
                setForm(INITIAL);
                setSubmitted(false);
              }}
              className="text-sm text-slate-500 underline-offset-4 transition-colors hover:text-neon-cyan hover:underline"
            >
              Создать еще одну заявку
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Имя *
                </span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Как к вам обращаться"
                  className={`input-glass ${errors.name ? "border-neon-pink/60" : ""}`}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <span className="text-xs text-neon-pink">{errors.name}</span>
                )}
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Телефон *
                </span>
                <input
                  type="tel"
                  inputMode="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", formatPhone(e.target.value))}
                  placeholder="+7 (___) ___-__-__"
                  className={`input-glass ${errors.phone ? "border-neon-pink/60" : ""}`}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                  <span className="text-xs text-neon-pink">{errors.phone}</span>
                )}
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Зона
                </span>
                <select
                  value={form.zone}
                  onChange={(e) => set("zone", e.target.value)}
                  className="input-glass appearance-none bg-night-900"
                >
                  {ZONES.map((z) => (
                    <option key={z.id} value={z.id} className="bg-night-900">
                      {z.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Гостей / мест
                </span>
                <select
                  value={form.guests}
                  onChange={(e) => set("guests", e.target.value)}
                  className="input-glass appearance-none bg-night-900"
                >
                  {["1", "2", "3", "4", "5", "6+"].map((n) => (
                    <option key={n} value={n} className="bg-night-900">
                      {n}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Дата *
                </span>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => set("date", e.target.value)}
                  className={`input-glass [color-scheme:dark] ${
                    errors.date ? "border-neon-pink/60" : ""
                  }`}
                  aria-invalid={!!errors.date}
                />
                {errors.date && (
                  <span className="text-xs text-neon-pink">{errors.date}</span>
                )}
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Время *
                </span>
                <input
                  type="time"
                  value={form.time}
                  onChange={(e) => set("time", e.target.value)}
                  className={`input-glass [color-scheme:dark] ${
                    errors.time ? "border-neon-pink/60" : ""
                  }`}
                  aria-invalid={!!errors.time}
                />
                {errors.time && (
                  <span className="text-xs text-neon-pink">{errors.time}</span>
                )}
              </label>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Пакет
              </span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Выбор пакета">
                {BOOKING_PACKAGES.map((pack) => (
                  <button
                    key={pack}
                    type="button"
                    role="radio"
                    aria-checked={form.pack === pack}
                    onClick={() => set("pack", pack)}
                    className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition-all duration-300 sm:text-sm ${
                      form.pack === pack
                        ? "border-neon-cyan/60 bg-neon-cyan/10 text-neon-cyan shadow-glow-cyan"
                        : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {pack}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Комментарий
              </span>
              <textarea
                value={form.comment}
                onChange={(e) => set("comment", e.target.value)}
                placeholder="Например: места рядом для команды 5×5"
                rows={3}
                className="input-glass resize-none"
              />
            </label>

            <Button type="submit" size="lg" className="mt-2 w-full" magnetic>
              <Send className="h-4 w-4" />
              Отправить заявку
            </Button>
            <p className="flex items-center justify-center gap-2 text-center text-xs text-slate-500">
              <CalendarCheck className="h-3.5 w-3.5 text-neon-cyan" />
              Бронь подтверждается администратором по телефону
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
