import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import { CLUB } from "../data/site";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="fixed bottom-5 right-4 z-50 flex items-center gap-2 sm:bottom-7 sm:right-7"
        >
          <a
            href={CLUB.phoneHref}
            aria-label={`Позвонить: ${CLUB.phone}`}
            className="glass-strong flex h-12 w-12 items-center justify-center rounded-full text-neon-cyan shadow-glow-cyan transition-transform duration-300 hover:scale-110"
          >
            <Phone className="h-5 w-5" />
          </a>
          <a
            href="#booking"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple px-5 py-3 text-sm font-bold text-white shadow-glow-pink transition-transform duration-300 hover:scale-105"
          >
            <CalendarCheck className="h-4 w-4" />
            Бронь
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
