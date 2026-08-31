import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { SaleRail } from "@/components/home/SaleRail";
import { LatestDrops } from "@/components/home/LatestDrops";
import { EthosSection } from "@/components/home/EthosSection";

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col">
      <Hero />
      <AboutSection />
      <SaleRail />
      <LatestDrops />
      <EthosSection />
    </main>
  );
}
