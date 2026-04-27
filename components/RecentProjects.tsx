"use client";

import { FaLocationArrow } from "react-icons/fa6";
import { motion } from "framer-motion";

import { projects } from "@/data";
import { PinContainer } from "./ui/Pin";

const RecentProjects = () => {
  return (
    <div className="py-20 relative z-10" id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="heading mb-16">
          Selected <span className="gradient-text">Works</span>
        </h1>
      </motion.div>
      
      <div className="flex flex-wrap items-center justify-center p-4 gap-x-20 gap-y-24 mt-10">
        {projects.map((item, index) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="lg:min-h-[32.5rem] h-[25rem] flex items-center justify-center sm:w-96 w-[80vw]"
            key={item.id}
          >
            <PinContainer
              title="Visit Repository"
              href={item.link}
            >
              <div className="relative flex items-center justify-center sm:w-96 w-[80vw] overflow-hidden h-[20vh] lg:h-[30vh] mb-10 group">
                <div
                  className="relative w-full h-full overflow-hidden lg:rounded-3xl glass noise border border-white/10"
                >
                  <img src="/bg.png" alt="bgimg" className="opacity-40 object-cover w-full h-full" />
                </div>
                <motion.img
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ duration: 0.4 }}
                  src={item.img}
                  alt="cover"
                  className="z-10 absolute bottom-0 w-full h-full object-cover drop-shadow-2xl"
                />
              </div>

              <h1 className="font-bold lg:text-2xl md:text-xl text-lg line-clamp-1 heading-sm tracking-wide">
                {item.title}
              </h1>

              <p
                className="lg:text-lg lg:font-normal font-light text-sm line-clamp-2 mt-3 mb-6"
                style={{
                  color: "#b3a399",
                }}
              >
                {item.des}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center">
                  {item.iconLists.map((icon, index) => (
                    <div
                      key={index}
                      className="border border-white/10 rounded-full bg-[#000000] lg:w-11 lg:h-11 w-8 h-8 flex justify-center items-center shadow-lg"
                      style={{
                        transform: `translateX(-${5 * index + 2}px)`,
                      }}
                    >
                      <img src={icon} alt="tech icon" className="p-2.5 opacity-80" />
                    </div>
                  ))}
                </div>

                <div className="flex justify-center items-center group cursor-pointer">
                  <p className="flex lg:text-lg md:text-sm text-sm text-purple font-medium group-hover:text-[#dfd7cc] transition-colors">
                    Source Code
                  </p>
                  <motion.div
                    whileHover={{ x: 5, y: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <FaLocationArrow className="ms-3 group-hover:text-[#dfd7cc] transition-colors" color="#dfd7cc" />
                  </motion.div>
                </div>
              </div>
            </PinContainer>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
