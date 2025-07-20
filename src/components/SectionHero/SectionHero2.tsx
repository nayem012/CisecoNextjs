"use client";

import React, { FC, useState, useRef, useEffect } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Next from "@/shared/NextPrev/Next";
import Prev from "@/shared/NextPrev/Prev";
import useInterval from "react-use/lib/useInterval";
import useBoolean from "react-use/lib/useBoolean";
import { HERO2_DEMO_DATA as DATA } from "./data";
import Image from "next/image";
import ncNanoId from "@/utils/ncNanoId";

export interface SectionHero2Props {
  className?: string;
}

let TIME_OUT: NodeJS.Timeout | null = null;

const SectionHero2: FC<SectionHero2Props> = ({ className = "" }) => {
  const [indexActive, setIndexActive] = useState(0);
  const [isRunning, toggleIsRunning] = useBoolean(true);
  const [isFading, setIsFading] = useState(true);
  const [fade, setFade] = useState(true);
  const prevIndex = useRef(indexActive);

  useInterval(() => {
    handleAutoNext();
  }, isRunning ? 5500 : null);

  useEffect(() => {
    setIsFading(false);
    const timeout = setTimeout(() => setIsFading(true), 30);
    return () => clearTimeout(timeout);
  }, [indexActive]);

  useEffect(() => {
    if (prevIndex.current !== indexActive) {
      setFade(false);
      const timeout = setTimeout(() => setFade(true), 20); // trigger fade-out, then fade-in
      prevIndex.current = indexActive;
      return () => clearTimeout(timeout);
    }
  }, [indexActive]);

  const handleAutoNext = () => {
    setIndexActive((state) => (state >= DATA.length - 1 ? 0 : state + 1));
  };

  const handleClickNext = () => {
    setIndexActive((state) => (state >= DATA.length - 1 ? 0 : state + 1));
    handleAfterClick();
  };

  const handleClickPrev = () => {
    setIndexActive((state) => (state === 0 ? DATA.length - 1 : state - 1));
    handleAfterClick();
  };

  const handleAfterClick = () => {
    toggleIsRunning(false);
    if (TIME_OUT) clearTimeout(TIME_OUT);
    TIME_OUT = setTimeout(() => toggleIsRunning(true), 1000);
  };

  // Only render one "page", but animate/fade between them
  const item = DATA[indexActive];

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl min-h-screen h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100">
      <div
        className={`nc-SectionHero2Item relative h-full w-full transition-opacity duration-700 ${fade ? 'opacity-100' : 'opacity-0'}`}
        key={`${item.heading}-${indexActive}`}
      >
        <div className="relative h-full w-full flex flex-col-reverse md:flex-row items-center justify-center px-2 sm:px-8 py-8 gap-4 md:gap-10">
          {/* Image Container */}
          <div className="relative w-full md:w-1/2 h-56 sm:h-72 md:h-[420px] xl:h-[520px] flex justify-center items-center">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-100/60 via-white/40 to-teal-200/60 blur-2xl scale-105 -z-10" />
            <Image
              src={item.image}
              alt={item.heading}
              fill
              className="object-contain object-center transition-transform duration-500 hover:scale-105 drop-shadow-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={indexActive === 0}
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-3 md:space-y-6 z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-extrabold text-gray-900 drop-shadow-lg tracking-tight">
              {item.heading}
            </h2>
            <p className="text-base sm:text-lg md:text-xl xl:text-2xl text-gray-700 max-w-2xl font-medium">
              {item.subHeading}
            </p>
            <ButtonPrimary
              className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white rounded-xl transform transition-all hover:scale-105 shadow-xl border-2 border-white/60"
              sizeClass="px-8 py-3 text-sm md:text-base"
              href={item.btnLink}
            >
              {item.btnText}
            </ButtonPrimary>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {DATA.map((_, idx) => (
            <button
              key={ncNanoId()}
              onClick={() => {
                setIndexActive(idx);
                handleAfterClick();
              }}
              className={`p-1.5 rounded-full border-2 border-emerald-400/40 transition-colors duration-300 shadow-md ${
                indexActive === idx ? 'bg-emerald-500 scale-110 border-emerald-500' : 'bg-white/70 hover:bg-emerald-100'
              }`}
              aria-label={`Slide ${idx + 1}`}
            >
              <span className="block w-3 h-3 rounded-full bg-transparent" />
            </button>
          ))}
        </div>

        {/* Navigation Arrows */}
        <Prev
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10"
          btnClassName="w-9 h-9 sm:w-12 sm:h-12 bg-white/90 hover:bg-emerald-100 shadow-xl rounded-full transition-transform hover:scale-110 border border-emerald-200"
          svgSize="w-6 h-6"
          onClickPrev={handleClickPrev}
        />
        <Next
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10"
          btnClassName="w-9 h-9 sm:w-12 sm:h-12 bg-white/90 hover:bg-emerald-100 shadow-xl rounded-full transition-transform hover:scale-110 border border-emerald-200"
          svgSize="w-6 h-6"
          onClickNext={handleClickNext}
        />
      </div>
    </div>
  );
};

export default SectionHero2;