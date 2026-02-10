"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import FloatingDecoration from "@/components/ui/FloatingDecoration";
import { siteConfig } from "@/lib/config";

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 400], [0, 120]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background gradient with parallax */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cream via-pink/10 to-lavender/20"
        style={{ y: bgY }}
      />

      {/* Floating decorations */}
      <FloatingDecoration color="pink" size={32} className="top-[15%] left-[8%]" delay={0} />
      <FloatingDecoration color="lavender" size={20} className="top-[30%] right-[12%]" delay={1.5} />
      <FloatingDecoration color="pink" size={16} className="bottom-[20%] left-[15%]" delay={0.8} />

      <div className="relative mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-pink/20 text-pink text-sm font-medium mb-6">
            Nail Art & Design
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-tight mb-6 font-display bg-clip-text text-transparent bg-gradient-to-r from-[#E84393] via-pink to-lavender">
            Nails by Pia
          </h1>
          <p className="text-lg md:text-xl text-black/60 max-w-lg mb-8">
            {siteConfig.tagline}. Simple, cute, and trendy looks that help you
            express your personality.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/gallery">View My Work</Button>
            <Button href="/contact" variant="outline">
              Get in Touch
            </Button>
          </div>
        </motion.div>

        {/* Hero Marquee */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative flex justify-center"
        >
          <div className="relative w-[240px] h-[320px] md:w-[320px] md:h-[440px] lg:w-[360px] lg:h-[480px]">
            <div className="absolute inset-0 bg-gradient-to-br from-pink/30 to-lavender/30 rounded-[2.5rem] blur-2xl scale-110" />
            <div className="relative z-10 h-full rounded-[2.25rem] overflow-hidden marquee-fade">
              <div className="marquee-track flex items-center gap-0 h-full px-0.5">
                {[
                  "/images/featured/yes1.png",
                  "/images/featured/yes2.png",
                  "/images/featured/yes3.png",
                  "/images/featured/yes4.png",
                  "/images/featured/yes5.png",
                ].map((src) => (
                  <div key={src} className="relative w-60 h-60 md:w-72 md:h-72 shrink-0">
                    <Image
                      src={src}
                      alt="Nail art by Pia"
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                ))}
                {[
                  "/images/featured/yes1.png",
                  "/images/featured/yes2.png",
                  "/images/featured/yes3.png",
                  "/images/featured/yes4.png",
                  "/images/featured/yes5.png",
                ].map((src) => (
                  <div key={`${src}-dup`} className="relative w-60 h-60 md:w-72 md:h-72 shrink-0">
                    <Image
                      src={src}
                      alt="Nail art by Pia"
                      fill
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
