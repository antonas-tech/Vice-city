import { useState } from "react";
import { CheckCircle2, MonitorCheck } from "lucide-react";
import {
  acceptBooking,
  getStation,
  useClubStore,
  ZONE_LABELS,
  ZONE_STATIONS,
  type Booking,
} from "../store/clubStore";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { StationGrid } from "./StationGrid";
import { formatDate } from "./ui";

type AssignStationsModalProps = {
  booking: Booking;
  onClose: () => void;
};

export function AssignStationsModal({ booking, onClose }: AssignStationsModalProps) {
  const state = useClubStore();
  const [selected, setSelected] = useState<string[]>([]);

  const stationIds = ZONE_STATIONS[booking.zone];
  const freeCount = stationIds.filter((id) => !getStation(state, id).occupied).length;
  const recommended = Math.min(
    parseInt(booking.guests, 10) || 1,
    stationIds.length
  );

  const toggle = (id: string) => {
    if (getStation(state, id).occupied) return;
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const confirm = () => {
    acceptBooking(booking.id, selected);
    onClose();
  };

  return (
    <Modal onClose={onClose} ariaLabel="Назначить компьютеры" className="max-w-2xl">
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div>
          <h2 className="flex items-center gap-2.5 font-display text-xl font-bold text-white">
            <MonitorCheck className="h-5 w-5 text-neon-cyan" />
            Назначить места
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Бронь: <span className="font-semibold text-white">{booking.name}</span> ·{" "}
            {ZONE_LABELS[booking.zone]} · {booking.guests}{" "}
            {booking.guests === "1" ? "гость" : "гостей"} · {formatDate(booking.date)}{" "}
            {booking.time} · {booking.pack}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm">
          <span className="text-slate-400">
            Свободно в зоне:{" "}
            <span className="font-semibold text-emerald-400">{freeCount}</span> из{" "}
            {stationIds.length}
          </span>
          <span
            className={
              selected.length >= recommended ? "text-emerald-400" : "text-neon-gold"
            }
          >
            Выбрано {selected.length} · рекомендовано {recommended}
          </span>
        </div>

        <StationGrid
          state={state}
          stationIds={stationIds}
          selected={selected}
          onStationClick={toggle}
          disableOccupied
        />

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={confirm}
            size="lg"
            className={`flex-1 ${selected.length === 0 ? "pointer-events-none opacity-40" : ""}`}
          >
            <CheckCircle2 className="h-4 w-4" />
            Принять бронь ({selected.length})
          </Button>
          <Button onClick={onClose} variant="secondary" size="lg">
            Отмена
          </Button>
        </div>
      </div>
    </Modal>
  );
}
