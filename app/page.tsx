import Hero from "@/components/Hero";
import ServiceAccordion from "@/components/ServiceAccordion";
import GalleryGrid from "@/components/GalleryGrid";
import NailPreview from "@/components/nail-preview/NailPreview";
import Testimonials from "@/components/Testimonials";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { services, galleryImages, aboutText, testimonials } from "@/lib/config";

export default function Home() {
  const previewImages = galleryImages.slice(0, 6);

  return (
    <>
      <Hero />

      {/* Services Preview */}
      <AnimatedSection className="pt-24 md:pt-32 pb-12 md:pb-16 px-6 section-divider">
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
      <AnimatedSection className="section-divider">
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

      {/* Gallery Preview */}
      <AnimatedSection className="py-24 md:py-32 px-6 bg-white/50 section-divider">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="My Work"
            subtitle="A look at some recent nail designs"
            gradient
          />
          <GalleryGrid images={previewImages} columns={3} />
          <div className="text-center mt-10">
            <Button href="/gallery" variant="lavender">
              View Full Gallery
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="py-24 md:py-32 px-6 section-divider">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="What People Say"
            subtitle="Hear from happy clients"
          />
          <Testimonials testimonials={testimonials} />
        </div>
      </AnimatedSection>

      {/* About Teaser */}
      <AnimatedSection className="py-24 md:py-32 px-6 section-divider">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading title="About Me" />
          <p className="text-lg text-black/60 leading-relaxed mb-8">
            {aboutText.split("\n\n")[0]}
          </p>
          <Button href="/about" variant="outline">
            Learn More
          </Button>
        </div>
      </AnimatedSection>

      {/* Contact CTA */}
      <AnimatedSection className="py-24 md:py-32 px-6 section-divider">
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
