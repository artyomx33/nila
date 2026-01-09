import { HomeHero } from "@/components/sections/HomeHero";
import { StatsSection } from "@/components/sections/StatsSection";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { WhyNILA } from "@/components/sections/WhyNILA";
import { TeamSection } from "@/components/sections/TeamSection";
import { HomeCTA } from "@/components/sections/HomeCTA";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <StatsSection />
      <ServicesOverview />
      <WhyNILA />
      <TeamSection />
      <HomeCTA />
    </main>
  );
}
