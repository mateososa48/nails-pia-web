import type { Metadata } from "next";
import Image from "next/image";
import AnimatedStats from "@/components/AnimatedStats";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { aboutText } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Pia — a creative nail artist who loves making fun, stylish, and trendy nail designs.",
};

const highlights = [
  { label: "Le Mini Macaron Products", description: "Safe, high-quality nail polish, gel kits, and tools" },
  { label: "Multiple Treatments", description: "Basic manicures, gel polish, and custom designs" },
  { label: "Perfect for Any Occasion", description: "Special events, hangouts, or just treating yourself" },
];

export default function AboutPage() {
  return (
    <div className="py-24 md:py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <AnimatedSection>
          <SectionHeading title="About Me" variant="landing" gradient />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center max-w-5xl mx-auto">
          {/* Image — shown first on desktop, second on mobile */}
          <AnimatedSection className="order-2 lg:order-1">
            <div className="relative w-full aspect-[3/4] max-w-[200px] sm:max-w-sm mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-pink/30 to-lavender/30 rounded-[2rem] sm:rounded-[2.5rem] rotate-3" />
              <div className="relative h-full rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden">
                <Image
                  src="/images/featured/about_pic.jpeg"
                  alt="Pia — nail artist"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Text — shown first on mobile */}
          <AnimatedSection delay={0.2} className="order-1 lg:order-2">
            <div className="space-y-6">
              {aboutText.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-lg text-black/70 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="pt-6 space-y-4">
                {highlights.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="mt-1 w-2 h-2 rounded-full bg-gradient-to-r from-pink to-lavender flex-shrink-0" />
                    <div>
                      <span className="font-semibold">{item.label}</span>
                      <span className="text-black/60"> — {item.description}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Button href="/contact">Work With Me</Button>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Animated Stats */}
        <AnimatedSection className="mt-20 pt-16">
          <AnimatedStats />
        </AnimatedSection>
      </div>
    </div>
  );
}
