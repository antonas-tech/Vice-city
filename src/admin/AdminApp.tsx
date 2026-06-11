import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarCheck,
  Globe,
  LayoutDashboard,
  LogOut,
  Map,
  ShieldCheck,
} from "lucide-react";
import { isAuthed, logout } from "./auth";
import { navigate } from "../hooks/useHashRoute";
import { useClubStore } from "../store/clubStore";
import { AdminLoginModal } from "./AdminLoginModal";
import { Button } from "../components/Button";
import { BookingsView } from "./views/BookingsView";
import { DashboardView } from "./views/DashboardView";
import { MapView } from "./views/MapView";

type AdminView = "dashboard" | "bookings" | "map";

const VIEWS: { id: AdminView; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Дашборд", icon: LayoutDashboard },
  { id: "bookings", label: "Брони", icon: CalendarCheck },
  { id: "map", label: "Карта клуба", icon: Map },
];

const VIEW_TITLES: Record<AdminView, { title: string; subtitle: string }> = {
  dashboard: {
    title: "Дашборд",
    subtitle: "Состояние клуба в реальном времени",
  },
  bookings: {
    title: "Входящие брони",
    subtitle: "Принимайте заявки и назначайте компьютеры",
  },
  map: {
    title: "Карта клуба",
    subtitle: "Занятость мест по зонам · клик по месту для действий",
  },
};

function AuthGate({ onLogin }: { onLogin: () => void }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-neon-purple/40 bg-neon-purple/10 text-neon-purple shadow-glow-purple">
        <ShieldCheck className="h-8 w-8" />
      </span>
      <div>
        <h1 className="font-display text-2xl font-bold text-white">
          Панель администратора
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Доступ только для персонала Vice City Adler
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={() => setShowLogin(true)}>
          <ShieldCheck className="h-4 w-4" />
          Войти
        </Button>
        <Button onClick={() => navigate("#hero")} variant="secondary">
          <Globe className="h-4 w-4 text-neon-cyan" />
          На сайт
        </Button>
      </div>
      <AnimatePresence>
        {showLogin && (
          <AdminLoginModal
            onClose={() => setShowLogin(false)}
            onSuccess={onLogin}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export function AdminApp() {
  const [authed, setAuthed] = useState(isAuthed);
  const [view, setView] = useState<AdminView>("dashboard");
  const state = useClubStore();
  const newCount = state.bookings.filter((b) => b.status === "new").length;

  if (!authed) {
    return <AuthGate onLogin={() => setAuthed(true)} />;
  }

  const handleLogout = () => {
    logout();
    setAuthed(false);
    navigate("#hero");
  };

  const meta = VIEW_TITLES[view];

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* sidebar (desktop) / topbar (mobile) */}
      <aside className="glass-strong sticky top-0 z-40 flex w-full shrink-0 flex-row items-center gap-2 border-b border-white/5 px-4 py-3 lg:h-screen lg:w-64 lg:flex-col lg:items-stretch lg:border-b-0 lg:border-r lg:px-5 lg:py-6">
        <div className="mr-auto flex items-center gap-3 lg:mb-8 lg:mr-0">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-neon-purple/40 bg-neon-purple/10 text-neon-purple">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="hidden sm:block">
            <p className="font-display text-sm font-bold leading-tight text-white">
              VICE CITY <span className="text-gradient">ADMIN</span>
            </p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
              Control Panel
            </p>
          </div>
        </div>

        <nav
          className="flex flex-row gap-1 lg:flex-col lg:gap-1.5"
          aria-label="Разделы панели"
        >
          {VIEWS.map((v) => {
            const isActive = view === v.id;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => setView(v.id)}
                className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors lg:px-4 ${
                  isActive
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="admin-nav"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-cyan/15 to-neon-purple/15 ring-1 ring-inset ring-neon-cyan/30"
                  />
                )}
                <v.icon className="relative z-10 h-4 w-4 shrink-0" />
                <span className="relative z-10 hidden sm:inline">{v.label}</span>
                {v.id === "bookings" && newCount > 0 && (
                  <span className="relative z-10 flex h-5 min-w-5 items-center justify-center rounded-full bg-neon-pink px-1.5 text-[11px] font-bold text-white">
                    {newCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="flex flex-row gap-1 lg:mt-auto lg:flex-col lg:gap-1.5">
          <button
            type="button"
            onClick={() => navigate("#hero")}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-400 transition-colors hover:text-neon-cyan lg:px-4"
          >
            <Globe className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Открыть сайт</span>
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-400 transition-colors hover:text-neon-pink lg:px-4"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline">Выйти</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 px-4 py-6 sm:px-6 lg:overflow-y-auto lg:px-10 lg:py-10">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 lg:mb-8">
            <h1 className="font-display text-2xl font-bold text-white sm:text-3xl">
              {meta.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">{meta.subtitle}</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {view === "dashboard" && (
                <DashboardView onOpenBookings={() => setView("bookings")} />
              )}
              {view === "bookings" && <BookingsView />}
              {view === "map" && <MapView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
