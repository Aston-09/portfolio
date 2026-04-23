"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 relative" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50"
        />
      </div>

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(179,163,153,0.06) 0%, transparent 50%)",
          filter: "blur(60px)",
        }}
      />

      <div className="flex flex-col items-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="heading lg:max-w-[45vw]"
        >
          Ready to take{" "}
          <span className="gradient-text">your</span> digital presence to the
          next level?
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white-200 md:mt-10 my-5 text-center max-w-md leading-relaxed"
        >
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </motion.p>
        <motion.a
          href="mailto:adityasinghnayal@jklu.edu.in"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </motion.a>
      </div>

      <div className="flex mt-16 md:flex-row flex-col justify-between items-center relative z-10">
        <p className="md:text-base text-sm md:font-normal font-light text-white-200">
          Copyright © 2026 Aston
        </p>

        <div className="flex items-center md:gap-3 gap-6 mt-4 md:mt-0">
          {socialMedia.map((info) => (
            <motion.a
              key={info.id}
              href={info.link || "#"}
              target={info.link ? "_blank" : undefined}
              rel={info.link ? "noreferrer" : undefined}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 cursor-pointer flex justify-center items-center glass-card rounded-lg transition-all duration-300 hover:border-purple/30"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
