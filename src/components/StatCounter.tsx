import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type StatCounterProps = {
  value: number;
  suffix?: string;
  label: string;
};

export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || value === 0) return;
    const duration = 1400;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center">
      <span className="font-display text-4xl font-bold text-transparent sm:text-5xl bg-gradient-to-b from-white to-slate-400 bg-clip-text">
        {value === 0 ? suffix : `${display}${suffix}`}
      </span>
      <span className="text-sm text-slate-500">{label}</span>
    </div>
  );
}
