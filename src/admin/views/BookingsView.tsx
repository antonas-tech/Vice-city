import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  Clock,
  Inbox,
  MessageSquare,
  Phone,
  RotateCcw,
  Users,
  X,
} from "lucide-react";
import {
  completeBooking,
  rejectBooking,
  reopenBooking,
  useClubStore,
  ZONE_LABELS,
  type Booking,
  type BookingStatus,
} from "../../store/clubStore";
import { AssignStationsModal } from "../AssignStationsModal";
import { formatDate, formatTimeAgo, StatusBadge, ZONE_BADGE_CLASSES } from "../ui";

type Filter = BookingStatus | "all";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "new", label: "Новые" },
  { id: "accepted", label: "Принятые" },
  { id: "completed", label: "Завершенные" },
  { id: "rejected", label: "Отклоненные" },
  { id: "all", label: "Все" },
];

function BookingCard({
  booking,
  onAssign,
}: {
  booking: Booking;
  onAssign: (b: Booking) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="font-display text-lg font-semibold text-white">
              {booking.name}
            </h3>
            <StatusBadge status={booking.status} />
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${ZONE_BADGE_CLASSES[booking.zone]}`}
            >
              {ZONE_LABELS[booking.zone]}
            </span>
          </div>
          <a
            href={`tel:${booking.phone.replace(/[^+\d]/g, "")}`}
            className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 transition-colors hover:text-neon-cyan"
          >
            <Phone className="h-3.5 w-3.5 text-neon-cyan" />
            {booking.phone}
          </a>
        </div>
        <span className="text-xs text-slate-500">{formatTimeAgo(booking.createdAt)}</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <span className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2 text-xs text-slate-300">
          <CalendarDays className="h-3.5 w-3.5 shrink-0 text-slate-500" />
          {formatDate(booking.date)}
        </span>
        <span className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2 text-xs text-slate-300">
          <Clock className="h-3.5 w-3.5 shrink-0 text-slate-500" />
          {booking.time || "—"} · {booking.pack}
        </span>
        <span className="flex items-center gap-2 rounded-lg border border-white/8 bg-white/[0.03] px-3 py-2 text-xs text-slate-300">
          <Users className="h-3.5 w-3.5 shrink-0 text-slate-500" />
          {booking.guests} {booking.guests === "1" ? "гость" : "гостей"}
        </span>
        {booking.stations.length > 0 && (
          <span className="col-span-2 flex flex-wrap items-center gap-1.5 rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-3 py-2 text-xs text-emerald-400 sm:col-span-1">
            {booking.stations.join(", ")}
          </span>
        )}
      </div>

      {booking.comment && (
        <p className="mt-3 flex items-start gap-2 text-sm text-slate-400">
          <MessageSquare className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" />
          {booking.comment}
        </p>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {booking.status === "new" && (
          <>
            <button
              type="button"
              onClick={() => onAssign(booking)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-400 transition-all hover:bg-emerald-400/20 hover:shadow-[0_0_18px_rgba(52,211,153,0.25)]"
            >
              <Check className="h-4 w-4" />
              Принять и выбрать места
            </button>
            <button
              type="button"
              onClick={() => rejectBooking(booking.id)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-neon-pink/40 bg-neon-pink/10 px-4 py-2 text-sm font-semibold text-neon-pink transition-all hover:bg-neon-pink/20"
            >
              <X className="h-4 w-4" />
              Отклонить
            </button>
          </>
        )}
        {booking.status === "accepted" && (
          <button
            type="button"
            onClick={() => completeBooking(booking.id)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition-all hover:border-neon-cyan/40 hover:text-neon-cyan"
          >
            <Check className="h-4 w-4" />
            Завершить и освободить места
          </button>
        )}
        {booking.status === "rejected" && (
          <button
            type="button"
            onClick={() => reopenBooking(booking.id)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition-all hover:border-neon-cyan/40 hover:text-neon-cyan"
          >
            <RotateCcw className="h-4 w-4" />
            Вернуть в новые
          </button>
        )}
      </div>
    </motion.div>
  );
}

export function BookingsView() {
  const state = useClubStore();
  const [filter, setFilter] = useState<Filter>("new");
  const [assigning, setAssigning] = useState<Booking | null>(null);

  const counts = useMemo(() => {
    const result: Record<Filter, number> = {
      new: 0,
      accepted: 0,
      completed: 0,
      rejected: 0,
      all: state.bookings.length,
    };
    for (const b of state.bookings) result[b.status] += 1;
    return result;
  }, [state.bookings]);

  const visible = state.bookings.filter(
    (b) => filter === "all" || b.status === filter
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
              filter === f.id
                ? "border-neon-cyan/50 bg-neon-cyan/10 text-neon-cyan shadow-glow-cyan"
                : "border-white/10 bg-white/[0.03] text-slate-400 hover:border-white/25 hover:text-white"
            }`}
          >
            {f.label}
            <span
              className={`rounded-full px-1.5 text-[11px] ${
                filter === f.id ? "bg-neon-cyan/20" : "bg-white/10"
              }`}
            >
              {counts[f.id]}
            </span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="glass flex flex-col items-center gap-3 rounded-2xl py-16 text-center">
          <Inbox className="h-10 w-10 text-slate-600" />
          <p className="font-semibold text-slate-400">Заявок нет</p>
          <p className="max-w-xs text-sm text-slate-500">
            Новые брони с формы на сайте появятся здесь автоматически.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <AnimatePresence mode="popLayout">
            {visible.map((booking) => (
              <BookingCard key={booking.id} booking={booking} onAssign={setAssigning} />
            ))}
          </AnimatePresence>
        </div>
      )}

      <AnimatePresence>
        {assigning && (
          <AssignStationsModal
            booking={assigning}
            onClose={() => setAssigning(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
