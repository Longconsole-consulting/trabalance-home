import { CursorProvider } from "@/components/interaction/CursorProvider";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Footer } from "@/components/layout/Footer";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { CustomerSpotlight } from "@/components/sections/CustomerSpotlight";
import { FAQ } from "@/components/sections/FAQ";
import { FeatureStrip } from "@/components/sections/FeatureStrip";
import { FourPillars } from "@/components/sections/FourPillars";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { IntelligenceLayer } from "@/components/sections/IntelligenceLayer";
import { PlatformModules } from "@/components/sections/PlatformModules";
import { TestimonialsGrid } from "@/components/sections/TestimonialsGrid";
import { TheShift } from "@/components/sections/TheShift";
import { TrustedBy } from "@/components/sections/TrustedBy";
import { WhyTrabalance } from "@/components/sections/WhyTrabalance";

export default function Home() {
  return (
    <CursorProvider>
      <SiteChrome>
        <main>
          <Hero />
          <TestimonialsGrid />
          <PlatformModules />
          <FourPillars />
          <TheShift />
          <HowItWorks />
          <IntelligenceLayer />
          <CustomerSpotlight />
          <WhyTrabalance />
          <TrustedBy />

          <FeatureStrip />
          <FAQ />
          <ClosingCTA />
        </main>
        <Footer />
      </SiteChrome>
    </CursorProvider>
  );
}
