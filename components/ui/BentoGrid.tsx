import { useState, useRef, useEffect } from "react";
import { IoCopyOutline, IoSendOutline } from "react-icons/io5";

import { cn } from "@/lib/utils";


import { BackgroundGradientAnimation } from "./GradientBg";
import GridGlobe from "./GridGlobe";
import MagicButton from "../MagicButton";
import { TechPopup } from "./TechPopup";
import { QueryPopup } from "./QueryPopup";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        // change gap-4 to gap-8, change grid-cols-3 to grid-cols-5, remove md:auto-rows-[18rem], add responsive code
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  //   remove unecessary things here
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ["React.js", "Next.js", "TypeScript"];
  const middleLists = ["HTML", "CSS", "C/C++", "Python"];
  const rightLists = ["MySQL", "Git", "Docker", "Vercel"];

  const [isTechPopupOpen, setIsTechPopupOpen] = useState(false);
  const [isQueryPopupOpen, setIsQueryPopupOpen] = useState(false);
  const techStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = techStackRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div
      className={cn(
        // remove p-4 rounded-3xl dark:bg-black dark:border-white/[0.2] bg-white  border border-transparent, add border border-white/[0.1] overflow-hidden relative
        "row-span-1 relative overflow-hidden rounded-3xl border border-white/[0.1] group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col space-y-4",
        id === 3 ? "cursor-pointer" : "",
        className
      )}
      onClick={id === 3 ? () => setIsTechPopupOpen(true) : undefined}
      style={{
        //   add these two
        //   you can generate the color from here https://cssgradient.io/
        background: "rgb(21,21,19)",
        backgroundColor:
          "linear-gradient(90deg, rgba(21,21,19,1) 0%, rgba(33,34,28,1) 100%)",
      }}
    >
      {/* add img divs */}
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <>
              <img
                src={img}
                alt={img}
                className={cn(
                  imgClassName, 
                  "object-cover",
                  id === 1 ? "object-center opacity-60 md:opacity-80 contrast-125 saturate-150 mix-blend-screen" : "object-center"
                )}
                style={id === 1 ? {
                  maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)"
                } : undefined}
              />
              {id === 1 && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#151513] via-transparent to-transparent pointer-events-none" />
              )}
            </>
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${(id === 5 || id === 1 || id === 3) && "w-full opacity-80"
            } `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              //   width={220}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        {id === 6 && (
          // add background animation , remove the p tag
          <BackgroundGradientAnimation>
            <div className="absolute z-50 inset-0 flex items-center justify-center text-white font-bold px-4 pointer-events-none text-3xl text-center md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
        )}

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10"
          )}
        >
          {/* change the order of the title and des, font-extralight, remove text-xs text-neutral-600 dark:text-neutral-300 , change the text-color */}
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-[#b3a399] z-10">
            {description}
          </div>
          {/* add text-3xl max-w-96 , remove text-neutral-600 dark:text-neutral-300*/}
          {/* remove mb-2 mt-2 */}
          <div
            className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}
          >
            {title}
          </div>

          {/* for the github 3d globe */}
          {id === 2 && <GridGlobe />}

          {/* Tech stack list div */}
          {id === 3 && (
            <div 
              ref={techStackRef}
              className="flex gap-3 lg:gap-4 absolute right-0 top-0 bottom-0 w-[60%] overflow-x-auto no-scrollbar pl-12 pr-4 lg:pr-8 py-4 items-center"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
              }}
            >
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-5 min-w-24 lg:min-w-32">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="py-3 px-3 text-xs lg:text-sm font-medium opacity-80 
                    lg:opacity-100 rounded-xl text-center bg-[#21221c] border border-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-5 min-w-24 lg:min-w-32 mt-12">
                {middleLists.map((item, i) => (
                  <span
                    key={i}
                    className="py-3 px-3 text-xs lg:text-sm font-medium opacity-80 
                    lg:opacity-100 rounded-xl text-center bg-[#21221c] border border-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <div className="flex flex-col gap-3 md:gap-3 lg:gap-5 min-w-24 lg:min-w-32">
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="py-3 px-3 text-xs lg:text-sm font-medium opacity-80 
                    lg:opacity-100 rounded-xl text-center bg-[#21221c] border border-white/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {id === 6 && (
            <div className="mt-5 relative">
              <MagicButton
                title="SEND QUERY"
                icon={<IoSendOutline />}
                position="left"
                handleClick={() => setIsQueryPopupOpen(true)}
                otherClasses="!bg-[#21221c]"
              />
            </div>
          )}
        </div>
      </div>
      {id === 3 && (
        <TechPopup isOpen={isTechPopupOpen} onClose={() => setIsTechPopupOpen(false)} />
      )}
      {id === 6 && (
        <QueryPopup isOpen={isQueryPopupOpen} onClose={() => setIsQueryPopupOpen(false)} />
      )}
    </div>
  );
};
