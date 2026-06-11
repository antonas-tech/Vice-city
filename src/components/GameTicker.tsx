import { GAME_TICKER } from "../data/site";

export function GameTicker() {
  const items = [...GAME_TICKER, ...GAME_TICKER];

  return (
    <div
      className="relative overflow-hidden border-y border-white/5 bg-night-900/60 py-3"
      aria-hidden="true"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-night-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-night-950 to-transparent" />
      <div className="flex w-max animate-ticker gap-10">
        {items.map((game, i) => (
          <span
            key={`${game}-${i}`}
            className="flex items-center gap-10 whitespace-nowrap font-display text-sm font-medium uppercase tracking-[0.25em] text-slate-500"
          >
            {game}
            <span className="h-1 w-1 rounded-full bg-neon-pink/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
