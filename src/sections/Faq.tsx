import { FAQ } from "../data/site";
import { FAQAccordion } from "../components/FAQAccordion";
import { SectionTitle } from "../components/SectionTitle";

export function Faq() {
  return (
    <section id="faq" className="relative px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="FAQ"
          title="Частые вопросы"
          subtitle="Все, что нужно знать перед визитом в Topzol Adler."
        />
        <FAQAccordion items={FAQ} />
      </div>
    </section>
  );
}
