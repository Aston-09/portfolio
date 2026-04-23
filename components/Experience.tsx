import React from "react";
import { motion } from "framer-motion";

import { workExperience } from "@/data";
import { Button } from "./ui/MovingBorders";

const Experience = () => {
  return (
    <div className="py-20 w-full relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="heading mb-16">
          My <span className="gradient-text">Work Experience</span>
        </h1>
      </motion.div>

      <div className="w-full mt-12 grid lg:grid-cols-4 grid-cols-1 gap-10">
        {workExperience.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`md:col-span-2 group ${card.className || ""}`}
          >
            <Button
              duration={10000 + index * 2000}
              borderRadius="1.75rem"
              style={{
                background: "rgba(21, 21, 19, 0.6)",
                borderRadius: `calc(1.75rem * 0.96)`,
              }}
              className="flex-1 text-black dark:text-white border-white/10 dark:border-white/10 hover-lift glass-card"
            >
              <div className="flex lg:flex-row flex-col lg:items-center p-3 py-6 md:p-5 lg:p-10 gap-6 relative overflow-hidden">
                {/* Decorative background glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#5b5348]/10 to-[#b3a399]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <motion.img
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  src={card.thumbnail}
                  alt={card.title}
                  className="lg:w-32 md:w-20 w-16 relative z-10 drop-shadow-2xl"
                />
                
                <div className="lg:ms-5 relative z-10">
                  <h1 className="text-start text-xl md:text-2xl font-bold heading-sm tracking-wide group-hover:text-[#dfd7cc] transition-colors duration-300">
                    {card.title}
                  </h1>
                  <p className="text-start text-white-100/80 mt-3 font-normal leading-relaxed text-sm md:text-base">
                    {card.desc}
                  </p>
                </div>
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
