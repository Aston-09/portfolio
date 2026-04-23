"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className={cn(
          "flex max-w-fit fixed z-[5000] top-10 inset-x-0 mx-auto px-8 py-4 items-center justify-center space-x-6",
          "glass bg-[#000000] backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300",
              "text-white/70 hover:text-white hover:bg-white/5 active:scale-95 group font-medium"
            )}
          >
            <span className="block sm:hidden text-[#dfd7cc] group-hover:text-[#dfd7cc] transition-colors">
              {navItem.icon}
            </span>
            <span className="text-sm tracking-wide">
              {navItem.name}
            </span>
            
            {/* Hover indicator line */}
            <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-gradient-to-r from-[#b3a399] via-[#dfd7cc] to-[#5b5348] group-hover:w-1/2 group-hover:-translate-x-1/2 transition-all duration-300 opacity-0 group-hover:opacity-100 rounded-full" />
          </Link>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
