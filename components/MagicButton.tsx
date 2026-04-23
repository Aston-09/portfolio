import React from "react";
import { motion } from "framer-motion";

const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <div
      className="relative inline-flex h-12 w-full md:w-64 md:mt-10 overflow-hidden rounded-xl p-[1px] focus:outline-none group transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {/* Spinning conic gradient border */}
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#b3a399_0%,#dfd7cc_33%,#5b5348_66%,#b3a399_100%)]" />

      {/* Inner content */}
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl
             bg-[#000000] px-7 text-sm font-semibold text-white backdrop-blur-3xl gap-2 
             group-hover:bg-[#21221c] transition-colors duration-300
             ${otherClasses}`}
      >
        {position === "left" && (
          <span className="transition-transform duration-300 group-hover:-translate-x-1">{icon}</span>
        )}
        {title}
        {position === "right" && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>
        )}
      </span>
    </div>
  );
};

export default MagicButton;
