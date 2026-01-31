import { PlanYourVisitContactForm } from "@/components/plan-your-visit/plan-your-visit-form";
import { PlanYourVisitHero } from "@/components/plan-your-visit/plan-your-visit-hero";
import { CTASection } from "@/components/plan-your-visit/cta-section";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function PlanYourVisit() {
  return (
    <>
      <div className="relative w-full overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <PlanYourVisitHero />

        {/* Contact Form Section */}
        <PlanYourVisitContactForm />

        {/* CTA Section */}
        <CTASection />

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
