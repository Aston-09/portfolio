import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { CanvasRevealEffect } from "./ui/CanvasRevealEffect";

const Approach = () => {
  return (
    <section className="w-full py-20 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-[#777B7E]/30 to-transparent" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="heading mb-16">
          My <span className="gradient-text">Approach</span>
        </h1>
      </motion.div>

      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-8 px-4">
        <Card
          title="Ideation & Architecture"
          icon={<AceternityIcon order="Stage 01" />}
          des="We will start by refining the Ideation , mapping the Architecture of your Idea and pin point right Tech Stack for smooth execution."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-[#777B7E]/40 rounded-3xl overflow-hidden glass"
            colors={[[119, 123, 126]]}
          />
        </Card>
        
        <Card
          title="Development & Security"
          icon={<AceternityIcon order="Stage 02" />}
          des="I write clean and modular code. Whether building custom Databases, creating scalable web extensions, or setting up Web apps, security and performance are prioritized."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-[#777B7E]/40 rounded-3xl overflow-hidden glass"
            colors={[[119, 123, 126]]}
            dotSize={2}
          />
        </Card>
        
        <Card
          title="Deployment & Scaling"
          icon={<AceternityIcon order="Stage 03" />}
          des="From handling data with /PostgreSQL /Docker /MySQL to configuring CI/CD pipelines, I ensure your application goes live smoothly on cloud platforms like Render Vercel or AWS."
        >
          <CanvasRevealEffect
            animationSpeed={3}
            containerClassName="bg-[#777B7E]/40 rounded-3xl overflow-hidden glass"
            colors={[[119, 123, 126]]}
          />
        </Card>
      </div>
    </section>
  );
};

export default Approach;

const Card = ({
  title,
  icon,
  children,
  des,
}: {
  title: string;
  icon: React.ReactNode;
  children?: React.ReactNode;
  des: string;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <motion.div
      whileHover={{ y: -8 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card flex items-center justify-center
       max-w-sm w-full mx-auto p-4 relative lg:h-[35rem] rounded-3xl overflow-hidden
       transition-all duration-300 glass-card
       border border-white/5 hover:border-[#777B7E]/30"
      style={{
        background: "rgba(21, 21, 19, 0.4)",
        boxShadow: "0 0 40px rgba(119, 123, 126, 0.15), 0 0 80px rgba(119, 123, 126, 0.05)"
      }}
    >
      <Icon className="absolute h-10 w-10 -top-3 -left-3 dark:text-white text-black opacity-20 group-hover/canvas-card:opacity-100 transition-opacity duration-300 text-purple" />
      <Icon className="absolute h-10 w-10 -bottom-3 -left-3 dark:text-white text-black opacity-20 group-hover/canvas-card:opacity-100 transition-opacity duration-300 text-cyan-400" />
      <Icon className="absolute h-10 w-10 -top-3 -right-3 dark:text-white text-black opacity-20 group-hover/canvas-card:opacity-100 transition-opacity duration-300 text-pink-400" />
      <Icon className="absolute h-10 w-10 -bottom-3 -right-3 dark:text-white text-black opacity-20 group-hover/canvas-card:opacity-100 transition-opacity duration-300 text-indigo-400" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full w-full absolute inset-0 z-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-8 py-10 h-full flex flex-col justify-center">
        <div
          className="text-center group-hover/canvas-card:-translate-y-4 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] 
        group-hover/canvas-card:opacity-0 transition duration-300 min-w-40 mx-auto flex items-center justify-center flex-col gap-4"
        >
          {icon}
          <h2 className="text-xl font-medium tracking-wide text-white/80 uppercase">
            {title}
          </h2>
        </div>
        
        <h2
          className="dark:text-white text-center text-3xl opacity-0 group-hover/canvas-card:opacity-100
         relative z-10 text-black mt-4 font-bold group-hover/canvas-card:text-white 
         group-hover/canvas-card:-translate-y-2 transition duration-300 heading-sm"
        >
          {title}
        </h2>
        
        <p
          className="text-base opacity-0 group-hover/canvas-card:opacity-100
         relative z-10 mt-6 group-hover/canvas-card:text-white text-center
         group-hover/canvas-card:-translate-y-2 transition duration-300 leading-relaxed font-light"
          style={{ color: "#dfd7cc" }}
        >
          {des}
        </p>
      </div>
      
      {/* Subtle overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10 pointer-events-none" />
    </motion.div>
  );
};

const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <button className="relative inline-flex overflow-hidden rounded-full p-[1px] hover-lift">
        <span
          className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite]
         bg-[conic-gradient(from_90deg_at_50%_50%,#dfd7cc_0%,#000000_50%,#dfd7cc_100%)]"
        />
        <span
          className="inline-flex h-full w-full items-center 
        justify-center rounded-full bg-[#000000] px-8 py-3 text-purple font-medium text-lg uppercase tracking-wider backdrop-blur-md"
        >
          {order}
        </span>
      </button>
    </div>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
