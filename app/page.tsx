import Hero from "@/components/Hero";
import ServiceAccordion from "@/components/ServiceAccordion";
import NailPreview from "@/components/nail-preview/NailPreview";
import Testimonials from "@/components/Testimonials";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { services, testimonials } from "@/lib/config";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Services Preview */}
      <AnimatedSection className="pt-24 md:pt-32 pb-12 md:pb-16 px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Nail Menu"
            subtitle="Quality nail care with a creative touch"
            variant="landing"
            gradient
          />
          <ServiceAccordion services={services} />
          <div className="text-center mt-10">
            <Button href="/services" variant="outline">
              All Services
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Nail Preview */}
      <AnimatedSection>
        <div className="text-center mb-2 px-6 pt-12 md:pt-16">
          <SectionHeading
            title="Preview Your Look"
            subtitle="Pick a color to see it on the nails"
            variant="landing"
            gradient
          />
        </div>
        <NailPreview />
      </AnimatedSection>


      {/* Testimonials */}
      <AnimatedSection className="py-24 md:py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="What People Say"
            subtitle="Hear from happy clients"
            gradient
          />
          <Testimonials testimonials={testimonials} />
        </div>
      </AnimatedSection>

      {/* Contact CTA */}
      <AnimatedSection className="pt-8 md:pt-12 pb-24 md:pb-32 px-6">
        <div className="mx-auto max-w-4xl text-center bg-gradient-to-r from-pink/20 to-lavender/20 rounded-[2rem] p-14">
          <h2 className="text-3xl md:text-4xl mb-4 font-display">
            Let&apos;s Create Your Look
          </h2>
          <p className="text-black/60 text-lg mb-8 max-w-md mx-auto">
            Ready for nails that match your vibe? Reach out and let&apos;s make
            it happen.
          </p>
          <Button href="/contact">Get in Touch</Button>
        </div>
      </AnimatedSection>
    </>
  );
}
