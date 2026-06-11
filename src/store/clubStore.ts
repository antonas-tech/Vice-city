import { useSyncExternalStore } from "react";
import type { ZoneId } from "../data/site";

export type BookingStatus = "new" | "accepted" | "rejected" | "completed";

export type Booking = {
  id: string;
  name: string;
  phone: string;
  zone: ZoneId;
  guests: string;
  date: string;
  time: string;
  pack: string;
  comment: string;
  status: BookingStatus;
  createdAt: number;
  stations: string[];
};

export type StationState = {
  occupied: boolean;
  bookingId?: string;
  guestName?: string;
  since?: number;
};

export type ClubState = {
  bookings: Booking[];
  stations: Record<string, StationState>;
};

export const ZONE_STATIONS: Record<ZoneId, string[]> = {
  standart: Array.from({ length: 24 }, (_, i) => `S-${String(i + 1).padStart(2, "0")}`),
  vip: Array.from({ length: 5 }, (_, i) => `V-0${i + 1}`),
  ps5: Array.from({ length: 3 }, (_, i) => `PS-0${i + 1}`),
};

export const ZONE_LABELS: Record<ZoneId, string> = {
  standart: "Standart",
  vip: "VIP",
  ps5: "PS5",
};

export const ALL_STATIONS = Object.values(ZONE_STATIONS).flat();

export function zoneOfStation(stationId: string): ZoneId {
  if (stationId.startsWith("PS")) return "ps5";
  if (stationId.startsWith("V")) return "vip";
  return "standart";
}

const STORAGE_KEY = "vc_club_state_v1";

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function today(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().slice(0, 10);
}

/** Demo-данные для первого запуска, чтобы панель не была пустой. */
function seed(): ClubState {
  const acceptedId = makeId();
  return {
    bookings: [
      {
        id: makeId(),
        name: "Даниил",
        phone: "+7 (938) 123-45-67",
        zone: "standart",
        guests: "5",
        date: today(),
        time: "20:00",
        pack: "3 часа",
        comment: "Катка в CS2, нужны места рядом",
        status: "new",
        createdAt: Date.now() - 1000 * 60 * 18,
        stations: [],
      },
      {
        id: acceptedId,
        name: "Артем",
        phone: "+7 (918) 765-43-21",
        zone: "vip",
        guests: "2",
        date: today(),
        time: "18:00",
        pack: "5 часов",
        comment: "",
        status: "accepted",
        createdAt: Date.now() - 1000 * 60 * 95,
        stations: ["V-01", "V-02"],
      },
    ],
    stations: {
      "V-01": { occupied: true, bookingId: acceptedId, guestName: "Артем", since: Date.now() - 1000 * 60 * 40 },
      "V-02": { occupied: true, bookingId: acceptedId, guestName: "Артем", since: Date.now() - 1000 * 60 * 40 },
      "S-03": { occupied: true, guestName: "Гость (без брони)", since: Date.now() - 1000 * 60 * 110 },
    },
  };
}

function load(): ClubState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ClubState;
      if (parsed && Array.isArray(parsed.bookings) && parsed.stations) {
        return parsed;
      }
    }
  } catch {
    // поврежденное состояние — начинаем заново
  }
  const seeded = seed();
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
  } catch {
    // localStorage недоступен (например, приватный режим) — работаем в памяти
  }
  return seeded;
}

let state: ClubState = load();
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function update(mutate: (prev: ClubState) => ClubState) {
  state = mutate(state);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
  emit();
}

// синхронизация между вкладками: форма на сайте + админка
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY && e.newValue) {
      try {
        state = JSON.parse(e.newValue) as ClubState;
        emit();
      } catch {
        // ignore
      }
    }
  });
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getState(): ClubState {
  return state;
}

export function useClubStore(): ClubState {
  return useSyncExternalStore(subscribe, getState);
}

export function getStation(s: ClubState, stationId: string): StationState {
  return s.stations[stationId] ?? { occupied: false };
}

// ---------- actions ----------

export type NewBookingInput = Omit<
  Booking,
  "id" | "status" | "createdAt" | "stations"
>;

export function addBooking(input: NewBookingInput): Booking {
  const booking: Booking = {
    ...input,
    id: makeId(),
    status: "new",
    createdAt: Date.now(),
    stations: [],
  };
  update((prev) => ({ ...prev, bookings: [booking, ...prev.bookings] }));
  return booking;
}

export function acceptBooking(bookingId: string, stationIds: string[]) {
  update((prev) => {
    const booking = prev.bookings.find((b) => b.id === bookingId);
    if (!booking) return prev;
    const stations = { ...prev.stations };
    for (const id of stationIds) {
      stations[id] = {
        occupied: true,
        bookingId,
        guestName: booking.name,
        since: Date.now(),
      };
    }
    return {
      stations,
      bookings: prev.bookings.map((b) =>
        b.id === bookingId ? { ...b, status: "accepted", stations: stationIds } : b
      ),
    };
  });
}

export function rejectBooking(bookingId: string) {
  update((prev) => ({
    ...prev,
    bookings: prev.bookings.map((b) =>
      b.id === bookingId ? { ...b, status: "rejected" } : b
    ),
  }));
}

export function reopenBooking(bookingId: string) {
  update((prev) => ({
    ...prev,
    bookings: prev.bookings.map((b) =>
      b.id === bookingId ? { ...b, status: "new", stations: [] } : b
    ),
  }));
}

/** Завершить бронь: освобождает закрепленные за ней станции. */
export function completeBooking(bookingId: string) {
  update((prev) => {
    const stations = { ...prev.stations };
    for (const [id, st] of Object.entries(stations)) {
      if (st.bookingId === bookingId) delete stations[id];
    }
    return {
      stations,
      bookings: prev.bookings.map((b) =>
        b.id === bookingId ? { ...b, status: "completed" } : b
      ),
    };
  });
}

/** Посадить гостя без брони (walk-in). */
export function occupyStation(stationId: string, guestName: string) {
  update((prev) => ({
    ...prev,
    stations: {
      ...prev.stations,
      [stationId]: {
        occupied: true,
        guestName: guestName.trim() || "Гость (без брони)",
        since: Date.now(),
      },
    },
  }));
}

export function freeStation(stationId: string) {
  update((prev) => {
    const stations = { ...prev.stations };
    delete stations[stationId];
    return { ...prev, stations };
  });
}
