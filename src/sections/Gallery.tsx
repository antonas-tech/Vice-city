import { GalleryGrid } from "../components/GalleryGrid";
import { SectionTitle } from "../components/SectionTitle";

export function Gallery() {
  return (
    <section id="gallery" className="relative px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Галерея"
          title="Атмосфера клуба"
          subtitle="Неон, море и полный фокус на игре. Загляните внутрь Vice City Adler."
        />
        <GalleryGrid />
      </div>
    </section>
  );
}
