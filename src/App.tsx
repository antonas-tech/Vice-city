import { AdminApp } from "./admin/AdminApp";
import { FloatingCTA } from "./components/FloatingCTA";
import { GameTicker } from "./components/GameTicker";
import { Header } from "./components/Header";
import { ScrollProgress } from "./components/ScrollProgress";
import { useHashRoute } from "./hooks/useHashRoute";
import { Booking } from "./sections/Booking";
import { Contacts } from "./sections/Contacts";
import { Faq } from "./sections/Faq";
import { Features } from "./sections/Features";
import { Footer } from "./sections/Footer";
import { Gallery } from "./sections/Gallery";
import { Hero } from "./sections/Hero";
import { Offers } from "./sections/Offers";
import { Pricing } from "./sections/Pricing";
import { WhyUs } from "./sections/WhyUs";
import { Zones } from "./sections/Zones";

export default function App() {
  const route = useHashRoute();

  if (route.startsWith("#/admin")) {
    return <AdminApp />;
  }

  return (
    <div className="relative overflow-x-clip">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <GameTicker />
        <Features />
        <Zones />
        <Pricing />
        <Booking />
        <Gallery />
        <Offers />
        <WhyUs />
        <Faq />
        <Contacts />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
}
