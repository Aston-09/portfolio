"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";

import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import ParticleCanvas from "./ui/ParticleCanvas";
import Typewriter from "./ui/Typewriter";

const Hero = () => {
  return (
    <div className="relative pb-20 pt-36">


      {/* Spotlights */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="#5b5348"
        />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="#b3a399" />
      </div>

      {/* Particle Constellation Background */}
      <ParticleCanvas />

      {/* Ambient glow orbs for depth */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(119,123,126,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="flex justify-center relative my-20 z-10 md:mt-32">
        <div className="w-full max-w-6xl px-6 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-16">
          
          {/* Main Profile Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-[150px] h-[150px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px] rounded-full overflow-hidden shadow-[0_0_30px_rgba(119,123,126,0.4),0_0_50px_rgba(119,123,126,0.3)] border-2 border-[#777B7E]/30 flex-shrink-0 bg-[#000000] relative z-50"
          >
            <img src="/logo.jpg" alt="Aston Logo" className="w-full h-full object-cover pointer-events-none" />
          </motion.div>

          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6 w-full max-w-xl">

          {/* Badge pill */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="badge-pill">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b3a399] animate-pulse" />
              Open to opportunities
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="w-full"
          >
            <Typewriter />
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          >
            <a href="#about">
              <MagicButton
                title="Explore my work"
                icon={<FaLocationArrow />}
                position="right"
              />
            </a>
          </motion.div>

          {/* Scroll hint - adjust for md layout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-4 flex flex-col items-center md:items-start gap-1 w-full"
          >
            <span className="text-white-200 text-xs tracking-widest uppercase opacity-50">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-transparent via-[#b3a399] to-transparent opacity-50" />
          </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
