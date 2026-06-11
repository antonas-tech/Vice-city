import { motion } from "framer-motion";

type Tab = { id: string; label: string };

type ZoneTabsProps = {
  tabs: readonly Tab[] | Tab[];
  active: string;
  onChange: (id: string) => void;
  layoutId: string;
};

export function ZoneTabs({ tabs, active, onChange, layoutId }: ZoneTabsProps) {
  return (
    <div
      role="tablist"
      className="glass mx-auto flex w-fit max-w-full gap-1 overflow-x-auto rounded-2xl p-1.5 scrollbar-none"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onChange(tab.id)}
            className={`relative whitespace-nowrap rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors duration-300 sm:px-7 ${
              isActive ? "text-white" : "text-slate-400 hover:text-white"
            }`}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-neon-cyan/20 via-neon-blue/20 to-neon-purple/20 ring-1 ring-inset ring-neon-cyan/40"
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
