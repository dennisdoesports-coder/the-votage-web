import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/about/about-hero";
import { GallerySection } from "@/components/about/gallery-section";
import { AfterHero } from "@/components/about/after-hero";
import { Beliefs } from "@/components/about/beliefs";
import { CoreValues } from "@/components/about/core-values";
import { LeadPastors } from "@/components/about/lead-pastors";
import { CallToAction } from "@/components/about/call-to-action";

export default function AboutPage() {
  return (
    <>
      <div className="relative bg-white w-full overflow-hidden">
        <Navbar darkText />

        <main className="pt-20 ">
          <div className="bg-white/90">
            <AboutHero />
            <GallerySection />
          </div>

          <AfterHero />
          <Beliefs />
          <CoreValues />
          <LeadPastors />
          <CallToAction />
        </main>

        <Footer />
      </div>
    </>
  );
}
