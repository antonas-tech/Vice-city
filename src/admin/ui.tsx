import { Gamepad2, Monitor } from "lucide-react";
import type { BookingStatus } from "../store/clubStore";
import type { ZoneId } from "../data/site";

export const STATUS_META: Record<
  BookingStatus,
  { label: string; classes: string }
> = {
  new: {
    label: "Новая",
    classes: "border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan",
  },
  accepted: {
    label: "Принята",
    classes: "border-emerald-400/40 bg-emerald-400/10 text-emerald-400",
  },
  rejected: {
    label: "Отклонена",
    classes: "border-neon-pink/40 bg-neon-pink/10 text-neon-pink",
  },
  completed: {
    label: "Завершена",
    classes: "border-white/15 bg-white/5 text-slate-400",
  },
};

export function StatusBadge({ status }: { status: BookingStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${meta.classes}`}
    >
      {meta.label}
    </span>
  );
}

export const ZONE_BADGE_CLASSES: Record<ZoneId, string> = {
  standart: "border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan",
  vip: "border-neon-purple/30 bg-neon-purple/10 text-neon-purple",
  ps5: "border-neon-pink/30 bg-neon-pink/10 text-neon-pink",
};

export function ZoneIcon({ zone, className }: { zone: ZoneId; className?: string }) {
  const Icon = zone === "ps5" ? Gamepad2 : Monitor;
  return <Icon className={className} />;
}

export function formatDate(iso: string): string {
  if (!iso) return "—";
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export function formatTimeAgo(ts: number): string {
  const minutes = Math.max(0, Math.round((Date.now() - ts) / 60000));
  if (minutes < 1) return "только что";
  if (minutes < 60) return `${minutes} мин назад`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ч ${minutes % 60} мин назад`;
  return new Date(ts).toLocaleDateString("ru-RU");
}

export function formatSince(ts?: number): string {
  if (!ts) return "";
  return new Date(ts).toLocaleTimeString("ru-RU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
