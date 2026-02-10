"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Service } from "@/lib/types";

interface ServiceAccordionProps {
  services: Service[];
}

export default function ServiceAccordion({ services }: ServiceAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggle = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      {services.map((service, index) => {
        const isOpen = openItems.has(index);
        return (
          <div
            key={service.name}
            className={index < services.length - 1 ? "border-b border-pink/[0.12]" : ""}
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex items-center justify-between py-5 px-2 group cursor-pointer"
            >
              <div className="text-left">
                <h3 className="text-lg font-display">{service.name}</h3>
                <p className="text-sm text-black/50 mt-0.5">{service.description}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-4">
                <span className="text-xs bg-pink/10 text-pink px-2.5 py-1 rounded-full font-medium">
                  {service.colors.length} colors
                </span>
                <span className="font-bold text-lg">{service.price}</span>
                <motion.svg
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-5 h-5 text-black/40"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-2 pb-6 pt-1">
                    <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-9 gap-3">
                      {service.colors.map((color) => (
                        <motion.div
                          key={color.image || color.hex}
                          className="flex flex-col items-center gap-1.5"
                          whileHover={{ scale: 1.1 }}
                        >
                          {color.image ? (
                            <img
                              src={color.image}
                              alt={color.name}
                              className="w-8 h-8 rounded-full border border-black/10 shadow-sm object-cover"
                            />
                          ) : (
                            <div
                              className="w-8 h-8 rounded-full border border-black/10 shadow-sm"
                              style={{ backgroundColor: color.hex }}
                            />
                          )}
                          <span className="text-[10px] text-black/40 leading-tight text-center">
                            {color.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
