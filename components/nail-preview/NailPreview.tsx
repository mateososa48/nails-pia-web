"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import HandWithNails from "./HandWithNails";
import { services } from "@/lib/config";
import { ServiceColor } from "@/lib/types";

const colorServices = services.filter((s) => s.colors && s.colors.length > 0);

export default function NailPreview() {
  const [activeTab, setActiveTab] = useState(0);
  const activeService = colorServices[activeTab];
  const [selectedColor, setSelectedColor] = useState<ServiceColor>(
    activeService.colors![0]
  );

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    setSelectedColor(colorServices[index].colors![0]);
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:min-h-[400px] md:max-h-[800px]">
      {/* Hand */}
      <div className="relative w-full md:w-1/2 shrink-0 bg-cream min-h-[300px] md:min-h-0">
        <HandWithNails color={selectedColor.hex} image={selectedColor.image} />
      </div>

      {/* Controls */}
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 px-6 py-8 lg:px-16">
        {/* Treatment Tabs */}
        <div>
          <h3 className="text-2xl lg:text-3xl mb-3 font-display bg-clip-text text-transparent bg-gradient-to-r from-[#E84393] via-pink to-lavender inline-block">Treatment</h3>
          <div className="flex flex-wrap gap-2">
            {colorServices.map((service, index) => (
              <button
                key={service.name}
                onClick={() => handleTabChange(index)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  activeTab === index
                    ? "text-white"
                    : "text-black/60 bg-black/[0.04] hover:bg-black/[0.08]"
                }`}
              >
                {activeTab === index && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-gradient-to-r from-[#E84393] via-pink to-lavender rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{service.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Color Picker */}
        <div>
          <h3 className="text-2xl lg:text-3xl mb-3 font-display bg-clip-text text-transparent bg-gradient-to-r from-[#E84393] via-pink to-lavender inline-block">Color</h3>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="flex flex-wrap gap-3"
            role="radiogroup"
            aria-label="Nail color"
          >
            {activeService.colors!.map((color) => {
              const isSelected = selectedColor.name === color.name;
              return (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  aria-label={color.name}
                  aria-checked={isSelected}
                  role="radio"
                  className="group flex flex-col items-center cursor-pointer"
                >
                  {/* Circle + ring wrapper */}
                  <div className="relative">
                    <div
                      className={`absolute -inset-1.5 rounded-full border-2 transition-all duration-200 ${
                        isSelected
                          ? "border-black/40 scale-100 opacity-100"
                          : "border-transparent scale-90 opacity-0"
                      }`}
                    />
                    {color.image ? (
                      <img
                        src={color.image}
                        alt={color.name}
                        className="w-8 h-8 rounded-full shadow-md border border-black/10 object-cover transition-transform duration-150 group-hover:scale-110 group-active:scale-95"
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full shadow-md border border-black/10 transition-transform duration-150 group-hover:scale-110 group-active:scale-95"
                        style={{ backgroundColor: color.hex }}
                      />
                    )}
                  </div>
                  <span className="block text-[10px] text-center mt-2 text-black/40 group-hover:text-black/70 transition-colors leading-tight max-w-[3rem]">
                    {color.name}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Summary */}
        <motion.div
          key={`${activeTab}-${selectedColor.name}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <p className="text-black/60 text-sm">
            <span
              className="text-base font-display"
              style={selectedColor.hex ? { color: selectedColor.hex } : undefined}
            >
              {selectedColor.name}
            </span>{" "}
            — {activeService.name} ·{" "}
            {activeService.colorGroups
              ? (activeService.colorGroups.find((g) =>
                  g.colors.some((c) => c.name === selectedColor.name)
                )?.price ?? activeService.price)
              : activeService.price}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
