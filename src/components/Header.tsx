import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { CLUB, NAV_LINKS } from "../data/site";
import { Button } from "./Button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("#hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.querySelector(l.href)
    ).filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/5 bg-night-950/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="group flex flex-col leading-none" aria-label="Topzol Adler — на главную">
          <span className="font-display text-lg font-bold tracking-wide text-white">
            TOP<span className="text-gradient">ZOL</span>
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.35em] text-slate-500 transition-colors group-hover:text-neon-cyan">
            {CLUB.tagline}
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                active === link.href
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-neon-cyan to-neon-pink"
                />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={CLUB.phoneHref}
            className="flex items-center gap-2 text-sm font-semibold text-slate-300 transition-colors hover:text-neon-cyan"
          >
            <Phone className="h-4 w-4 text-neon-cyan" />
            {CLUB.phone}
          </a>
          <Button href="#booking" size="md" magnetic>
            Забронировать
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={CLUB.phoneHref}
            aria-label={`Позвонить: ${CLUB.phone}`}
            className="glass flex h-10 w-10 items-center justify-center rounded-xl text-neon-cyan"
          >
            <Phone className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть меню"
            className="glass flex h-10 w-10 items-center justify-center rounded-xl text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>

    {createPortal(
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-night-950 lg:hidden"
          >
            <div className="flex h-[72px] items-center justify-between px-4 sm:px-6">
              <span className="font-display text-lg font-bold text-white">
                TOP<span className="text-gradient">ZOL</span>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Закрыть меню"
                className="glass flex h-10 w-10 items-center justify-center rounded-xl text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
              }}
              className="flex flex-col gap-2 px-6 pt-8"
              aria-label="Мобильная навигация"
            >
              {NAV_LINKS.map((link) => (
                <motion.a
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    show: { opacity: 1, x: 0 },
                  }}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/5 py-4 font-display text-2xl font-semibold text-slate-300 transition-colors hover:text-neon-cyan"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0 },
                }}
                className="mt-8 flex flex-col gap-3"
              >
                <Button href="#booking" size="lg" onClick={() => setMenuOpen(false)}>
                  Забронировать место
                </Button>
                <Button href={CLUB.phoneHref} variant="secondary" size="lg">
                  <Phone className="h-4 w-4" />
                  {CLUB.phone}
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}
