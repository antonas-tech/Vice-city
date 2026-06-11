import { PRICING } from "../data/site";
import { PricingCard } from "../components/PricingCard";
import { SectionTitle } from "../components/SectionTitle";

export function Pricing() {
  return (
    <section id="pricing" className="relative px-4 py-20 sm:px-6 md:py-28 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[640px] -translate-x-1/2 rounded-full bg-neon-purple/8 blur-3xl"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="Прайс"
          title={
            <>
              Честные цены. <span className="text-gradient">Максимум игры.</span>
            </>
          }
          subtitle="Почасовая оплата и выгодные пакеты. Ночной пакет — 10 часов игры по цене, которую сложно игнорировать."
        />
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PRICING.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-slate-500">
          Актуальные акции и спецпредложения уточняйте у администратора клуба.
        </p>
      </div>
    </section>
  );
}
