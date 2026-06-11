import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { DoorOpen, UserPlus } from "lucide-react";
import {
  freeStation,
  getStation,
  occupyStation,
  useClubStore,
  ZONE_LABELS,
  ZONE_STATIONS,
  zoneOfStation,
} from "../../store/clubStore";
import type { ZoneId } from "../../data/site";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { StationGrid } from "../StationGrid";
import { formatSince, ZoneIcon } from "../ui";

function StationModal({
  stationId,
  onClose,
}: {
  stationId: string;
  onClose: () => void;
}) {
  const state = useClubStore();
  const station = getStation(state, stationId);
  const [guestName, setGuestName] = useState("");
  const zone = zoneOfStation(stationId);
  const booking = station.bookingId
    ? state.bookings.find((b) => b.id === station.bookingId)
    : undefined;

  return (
    <Modal onClose={onClose} ariaLabel={`Станция ${stationId}`}>
      <div className="flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-xl border ${
              station.occupied
                ? "border-neon-pink/40 bg-neon-pink/10 text-neon-pink"
                : "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
            }`}
          >
            <ZoneIcon zone={zone} className="h-6 w-6" />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold text-white">{stationId}</h2>
            <p className="text-sm text-slate-400">
              {ZONE_LABELS[zone]} ·{" "}
              {station.occupied ? (
                <span className="text-neon-pink">занято</span>
              ) : (
                <span className="text-emerald-400">свободно</span>
              )}
            </p>
          </div>
        </div>

        {station.occupied ? (
          <>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm">
              <p className="text-slate-300">
                Гость:{" "}
                <span className="font-semibold text-white">{station.guestName}</span>
              </p>
              {station.since && (
                <p className="mt-1 text-slate-500">с {formatSince(station.since)}</p>
              )}
              {booking && (
                <p className="mt-1 text-slate-500">
                  По брони: {booking.pack} · {booking.phone}
                </p>
              )}
            </div>
            <Button
              onClick={() => {
                freeStation(stationId);
                onClose();
              }}
              variant="secondary"
              size="lg"
              className="w-full"
            >
              <DoorOpen className="h-4 w-4 text-neon-cyan" />
              Освободить место
            </Button>
            {booking && (
              <p className="text-center text-xs text-slate-500">
                Остальные места брони останутся занятыми. Завершить всю бронь можно
                в разделе «Брони».
              </p>
            )}
          </>
        ) : (
          <>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Имя гостя (необязательно)
              </span>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="Гость без брони"
                className="input-glass"
              />
            </label>
            <Button
              onClick={() => {
                occupyStation(stationId, guestName);
                onClose();
              }}
              size="lg"
              className="w-full"
            >
              <UserPlus className="h-4 w-4" />
              Посадить гостя
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}

export function MapView() {
  const state = useClubStore();
  const [selected, setSelected] = useState<string | null>(null);

  const zones = Object.keys(ZONE_STATIONS) as ZoneId[];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded border border-white/15 bg-white/[0.04]" />
          свободно
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded border border-neon-pink/50 bg-neon-pink/15" />
          занято
        </span>
        <span className="text-slate-500">
          Клик по месту — посадить гостя или освободить.
        </span>
      </div>

      {zones.map((zone) => {
        const stationIds = ZONE_STATIONS[zone];
        const occupied = stationIds.filter(
          (id) => getStation(state, id).occupied
        ).length;
        return (
          <section key={zone} className="glass rounded-2xl p-5 sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold text-white">
                <ZoneIcon zone={zone} className="h-5 w-5 text-neon-cyan" />
                {ZONE_LABELS[zone]} Zone
              </h3>
              <span className="text-sm text-slate-400">
                занято{" "}
                <span
                  className={
                    occupied > 0 ? "font-semibold text-neon-pink" : "font-semibold text-emerald-400"
                  }
                >
                  {occupied}
                </span>{" "}
                из {stationIds.length}
              </span>
            </div>
            <StationGrid
              state={state}
              stationIds={stationIds}
              onStationClick={setSelected}
            />
          </section>
        );
      })}

      <AnimatePresence>
        {selected && (
          <StationModal stationId={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
