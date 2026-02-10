import type { Metadata } from "next";
import ServiceAccordion from "@/components/ServiceAccordion";
import PricingCards from "@/components/PricingCards";
import NailPreview from "@/components/nail-preview/NailPreview";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { services } from "@/lib/config";

export const metadata: Metadata = {
  title: "Nail Menu",
  description:
    "Nail services by Pia — basic manicures and custom nail designs using safe, high-quality products.",
};

export default function ServicesPage() {
  return (
    <>
      <div className="py-24 md:py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection>
            <SectionHeading
              title="Nail Menu"
              subtitle="Included with hand massage & cuticle removal"
              variant="landing"
              gradient
            />
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <PricingCards services={services} />
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-display mb-2">Color Options</h3>
              <p className="text-black/60">Expand each service to see all available colors</p>
            </div>
            <ServiceAccordion services={services} />
          </AnimatedSection>
        </div>
      </div>

      {/* Interactive Nail Preview — full bleed, hand flush to left edge */}
      <AnimatedSection className="mt-0">
        <div className="text-center mb-6 px-6">
          <SectionHeading
            title="Preview Your Look"
            subtitle="Pick a color to see it on the nails"
            variant="landing"
            gradient
          />
        </div>
        <NailPreview />
      </AnimatedSection>

      <div className="py-24 md:py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <AnimatedSection className="mt-0">
            <div className="max-w-2xl mx-auto text-center bg-gradient-to-r from-pink/10 to-lavender/10 rounded-[1.25rem] p-10 border border-pink/[0.12]">
              <h3 className="text-xl mb-3 font-display">
                Looking for something custom?
              </h3>
              <p className="text-black/60 mb-6">
                Have a specific design in mind? Send me a reference photo and
                I&apos;ll bring it to life.
              </p>
              <Button href="/contact">Let&apos;s Talk</Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </>
  );
}
