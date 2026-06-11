import { motion } from "framer-motion";
import { CalendarCheck, Inbox, MonitorPlay, Percent } from "lucide-react";
import {
  ALL_STATIONS,
  getStation,
  useClubStore,
  ZONE_LABELS,
  ZONE_STATIONS,
} from "../../store/clubStore";
import type { ZoneId } from "../../data/site";
import { formatDate, formatTimeAgo, StatusBadge, ZONE_BADGE_CLASSES } from "../ui";

type DashboardViewProps = {
  onOpenBookings: () => void;
};

export function DashboardView({ onOpenBookings }: DashboardViewProps) {
  const state = useClubStore();

  const newCount = state.bookings.filter((b) => b.status === "new").length;
  const acceptedCount = state.bookings.filter((b) => b.status === "accepted").length;
  const occupiedCount = ALL_STATIONS.filter(
    (id) => getStation(state, id).occupied
  ).length;
  const occupancy = Math.round((occupiedCount / ALL_STATIONS.length) * 100);

  const cards = [
    {
      icon: Inbox,
      label: "Новые заявки",
      value: String(newCount),
      accent: "text-neon-cyan",
      onClick: onOpenBookings,
    },
    {
      icon: CalendarCheck,
      label: "Активные брони",
      value: String(acceptedCount),
      accent: "text-emerald-400",
      onClick: onOpenBookings,
    },
    {
      icon: MonitorPlay,
      label: "Занято мест",
      value: `${occupiedCount} / ${ALL_STATIONS.length}`,
      accent: "text-neon-pink",
    },
    {
      icon: Percent,
      label: "Загрузка клуба",
      value: `${occupancy}%`,
      accent: "text-neon-gold",
    },
  ];

  const recent = state.bookings.slice(0, 5);
  const zones = Object.keys(ZONE_STATIONS) as ZoneId[];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((card, i) => (
          <motion.button
            key={card.label}
            type="button"
            disabled={!card.onClick}
            onClick={card.onClick}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className={`glass rounded-2xl p-5 text-left transition-all ${
              card.onClick ? "hover:border-neon-cyan/40 hover:shadow-glow-cyan" : "cursor-default"
            }`}
          >
            <card.icon className={`mb-3 h-5 w-5 ${card.accent}`} />
            <p className="font-display text-2xl font-bold text-white sm:text-3xl">
              {card.value}
            </p>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">{card.label}</p>
          </motion.button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5 sm:p-6">
          <h3 className="mb-5 font-display text-lg font-semibold text-white">
            Загрузка по зонам
          </h3>
          <div className="flex flex-col gap-5">
            {zones.map((zone) => {
              const ids = ZONE_STATIONS[zone];
              const occupied = ids.filter((id) => getStation(state, id).occupied).length;
              const percent = Math.round((occupied / ids.length) * 100);
              return (
                <div key={zone}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-300">
                      {ZONE_LABELS[zone]}
                    </span>
                    <span className="text-slate-500">
                      {occupied} / {ids.length}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-pink"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-2xl p-5 sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold text-white">
              Последние заявки
            </h3>
            <button
              type="button"
              onClick={onOpenBookings}
              className="text-sm font-semibold text-neon-cyan transition-colors hover:text-white"
            >
              Все брони →
            </button>
          </div>
          {recent.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">
              Заявок пока нет. Новые брони с сайта появятся здесь.
            </p>
          ) : (
            <ul className="flex flex-col divide-y divide-white/5">
              {recent.map((b) => (
                <li key={b.id} className="flex flex-wrap items-center gap-2.5 py-3">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-white">
                      {b.name}
                    </span>
                    <span className="block text-xs text-slate-500">
                      {formatDate(b.date)} {b.time} · {b.pack} ·{" "}
                      {formatTimeAgo(b.createdAt)}
                    </span>
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${ZONE_BADGE_CLASSES[b.zone]}`}
                  >
                    {ZONE_LABELS[b.zone]}
                  </span>
                  <StatusBadge status={b.status} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
