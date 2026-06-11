import { getStation, zoneOfStation, type ClubState } from "../store/clubStore";
import { ZoneIcon } from "./ui";

type StationGridProps = {
  state: ClubState;
  stationIds: string[];
  /** выбранные станции (режим выбора в модалке принятия брони) */
  selected?: string[];
  onStationClick?: (stationId: string) => void;
  /** запрещать клик по занятым станциям */
  disableOccupied?: boolean;
  compact?: boolean;
};

export function StationGrid({
  state,
  stationIds,
  selected = [],
  onStationClick,
  disableOccupied = false,
  compact = false,
}: StationGridProps) {
  return (
    <div
      className={`grid gap-2 ${
        compact
          ? "grid-cols-4 sm:grid-cols-6"
          : "grid-cols-4 sm:grid-cols-6 lg:grid-cols-8"
      }`}
    >
      {stationIds.map((id) => {
        const station = getStation(state, id);
        const isSelected = selected.includes(id);
        const disabled = disableOccupied && station.occupied;
        const zone = zoneOfStation(id);

        let tileClasses =
          "border-white/10 bg-white/[0.03] text-slate-300 hover:border-neon-cyan/50 hover:bg-neon-cyan/5";
        if (station.occupied) {
          tileClasses =
            "border-neon-pink/40 bg-neon-pink/[0.08] text-neon-pink" +
            (disabled ? " opacity-50 cursor-not-allowed" : " hover:border-neon-pink/70");
        }
        if (isSelected) {
          tileClasses =
            "border-neon-cyan/70 bg-neon-cyan/15 text-neon-cyan shadow-glow-cyan";
        }

        return (
          <button
            key={id}
            type="button"
            disabled={disabled || !onStationClick}
            onClick={() => onStationClick?.(id)}
            aria-pressed={isSelected}
            aria-label={`${id}: ${station.occupied ? `занято${station.guestName ? ` — ${station.guestName}` : ""}` : "свободно"}`}
            className={`flex flex-col items-center gap-1 rounded-xl border px-2 py-2.5 transition-all duration-200 ${tileClasses} ${
              !onStationClick ? "cursor-default" : ""
            }`}
          >
            <ZoneIcon zone={zone} className="h-4 w-4" />
            <span className="text-[11px] font-bold tracking-wide">{id}</span>
            {!compact && (
              <span className="max-w-full truncate text-[10px] leading-tight text-slate-500">
                {station.occupied ? station.guestName ?? "Занято" : "свободно"}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
