"use client";

import React, { useEffect, useRef, useState } from "react";

const roles = [
  "Web Developer",
  "Competitive programmer",
  "Database system Developer",
  "Cloud / DevOps Engineer"
];

const Typewriter = () => {
  const [text, setText] = useState("");
  const currRoleIdx = useRef(0);
  const isDeleting = useRef(false);
  const textLen = useRef(0);

  useEffect(() => {
    let lastTime = performance.now();
    let delay = 100;
    let reqId: number;

    const loop = (time: number) => {
      const dt = time - lastTime;

      if (dt > delay) {
        const fullText = roles[currRoleIdx.current];

        if (!isDeleting.current && textLen.current === fullText.length) {
          delay = 2000;
          isDeleting.current = true;
        } else if (isDeleting.current && textLen.current === 0) {
          isDeleting.current = false;
          currRoleIdx.current = (currRoleIdx.current + 1) % roles.length;
          delay = 500;
        } else {
          textLen.current += isDeleting.current ? -1 : 1;
          setText(fullText.substring(0, textLen.current));
          delay = isDeleting.current ? 40 : Math.random() * 80 + 40;
        }

        lastTime = time;
      }

      reqId = requestAnimationFrame(loop);
    };

    reqId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(reqId);
  }, []);

  return (
    <div className="flex flex-col gap-2 relative z-50 text-center md:text-left w-full">
      <h1 className="text-[40px] md:text-5xl lg:text-6xl font-bold text-white tracking-wide leading-tight">
        Hi, I&apos;M <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b3a399] via-[#dfd7cc] to-[#5b5348]">ASTON</span>
      </h1>
      <h2 className="text-xl md:text-2xl lg:text-3xl text-white/70 font-medium min-h-[40px]">
        {text}
        <span className="animate-pulse text-[#b3a399] font-bold ml-1">|</span>
      </h2>
      <p className="mt-4 text-sm md:text-base lg:text-lg text-white/50 max-w-lg leading-relaxed">
        Welcome to my portfolio! Feel free to surf in your turf and explore my projects.
      </p>
    </div>
  );
};

export default Typewriter;
