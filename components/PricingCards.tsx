"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { Service } from "@/lib/types";

interface PricingCardsProps {
  services: Service[];
}

export default function PricingCards({ services }: PricingCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
      {services.map((service, i) => (
        <motion.div
          key={service.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-pink/10 flex flex-col"
        >
          <div className="mb-4">
            <h3 className="text-2xl font-display mb-2">{service.name}</h3>
            <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink to-lavender">
              {service.price}
            </div>
            {service.frenchTipPrice && (
              <p className="text-sm text-black/50 mt-1">
                French tip: {service.frenchTipPrice}
              </p>
            )}
          </div>
          <p className="text-black/60 mb-6 flex-grow">{service.description}</p>
          <div className="mb-6">
            {service.colors && service.colors.length > 0 ? (
              <span className="text-xs bg-pink/10 text-pink px-3 py-1.5 rounded-full font-medium">
                {service.colors.length} colors available
              </span>
            ) : service.features ? (
              <div className="flex flex-wrap gap-1.5">
                {service.features.map((feature) => (
                  <span key={feature} className="text-xs bg-pink/10 text-pink px-3 py-1.5 rounded-full font-medium">
                    {feature}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <Button href="/contact" variant="pink" className="w-full text-center">
            Book Now
          </Button>
        </motion.div>
      ))}
    </div>
  );
}
