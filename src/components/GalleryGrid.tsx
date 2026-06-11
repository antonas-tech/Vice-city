import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, X } from "lucide-react";
import { GALLERY, type GalleryItem } from "../data/site";

function GalleryVisual({ item, large = false }: { item: GalleryItem; large?: boolean }) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${item.gradient}`}
    >
      {/* decorative scene placeholder — swap for a real photo via <img> when available */}
      <div className="absolute inset-0 bg-grid-faint bg-[size:28px_28px] opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-night-950/90 to-transparent" />
      <Camera
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/15 ${
          large ? "h-20 w-20" : "h-10 w-10"
        }`}
      />
    </div>
  );
}

export function GalleryGrid() {
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY.map((item, i) => (
          <motion.button
            key={item.id}
            type="button"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            onClick={() => setSelected(item)}
            aria-label={`Открыть фото: ${item.title}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 text-left transition-all duration-500 hover:border-neon-cyan/40 hover:shadow-glow-cyan"
          >
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
              <GalleryVisual item={item} />
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10 p-5">
              <h3 className="font-display text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-slate-400">{item.subtitle}</p>
            </div>
            <span className="absolute right-4 top-4 z-10 rounded-full bg-night-950/50 p-2 text-slate-300 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
              <Camera className="h-4 w-4" />
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-night-950/90 p-4 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-label={selected.title}
          >
            <motion.div
              initial={{ scale: 0.9, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-white/15 shadow-glow-purple"
            >
              <div className="aspect-video">
                <GalleryVisual item={selected} large />
              </div>
              <div className="glass-strong flex items-center justify-between px-6 py-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-white">
                    {selected.title}
                  </h3>
                  <p className="text-sm text-slate-400">{selected.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Закрыть"
                  className="glass flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors hover:border-neon-pink/50 hover:text-neon-pink"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
