"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";
import BallCanvas from "./TechBallsCanvas";

export const technologies = [
  { name: "Python", icon: "/python_hires.svg" },
  { name: "MySQL", icon: "/mysql_hires.svg" },
  { name: "C++", icon: "/cpp_hires.svg" },
  { name: "React JS", icon: "/react_hires.svg" },
  { name: "HTML 5", icon: "/html_hires.svg" },
  { name: "CSS 3", icon: "/css_hires.svg" },
  { name: "C", icon: "/c_new_hires.svg" },
  { name: "Docker", icon: "/docker_hires.svg" },
  { name: "Git", icon: "/git_hires.svg" },
];

export const TechPopup = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm"
           onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-[90%] max-w-4xl max-h-[90vh] overflow-y-auto bg-[#000000] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition"
            >
              <IoClose size={32} />
            </button>
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-10 text-white">Tech Stack Pool</h2>
            <p className="text-center text-white/70 mb-4 block">Click and drag to swing the cue pole!</p>
            <div className="relative w-full h-[50vh] md:h-[60vh] rounded-3xl overflow-hidden border border-white/10 mt-6 bg-[#21221c]">
              <BallCanvas technologies={technologies} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
