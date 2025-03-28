"use client";

import React, { FC, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Next from "@/shared/NextPrev/Next";
import Prev from "@/shared/NextPrev/Prev";
import useInterval from "react-use/lib/useInterval";
import useBoolean from "react-use/lib/useBoolean";
import { HERO2_DEMO_DATA as DATA } from "./data";

export interface SectionHero2Props {
  className?: string;
}

let TIME_OUT: NodeJS.Timeout | null = null;

const SectionHero2: FC<SectionHero2Props> = ({ className = "" }) => {
  const [indexActive, setIndexActive] = useState(0);
  const [isRunning, toggleIsRunning] = useBoolean(true);

  useInterval(() => {
    handleAutoNext();
  }, isRunning ? 5500 : null);

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

  const renderItem = (index: number) => {
    const isActive = indexActive === index;
    const item = DATA[index];
    if (!isActive) return null;

    return (
      <div
        className={`nc-SectionHero2Item nc-SectionHero2Item--animation relative overflow-hidden ${className} flex items-center justify-center min-h-[300px] sm:min-h-[400px]
         animated-background bg-gradient-to-r from-green-100 via-teal-100 to-emerald-100 text-gray-800 rounded-lg shadow-lg px-6 py-12`}
        key={index}
      >
        <div className="text-center">
          
          <h2 className="nc-SectionHero2Item__heading font-bold text-3xl md:text-5xl mb-6">
            {item.heading}
          </h2>
          <span className="nc-SectionHero2Item__subheading block text-lg md:text-xl font-medium mb-2">
            {item.subHeading}
          </span>
          <ButtonPrimary
            className="nc-SectionHero2Item__button"
            sizeClass="py-3 px-8"
            href={item.btnLink}
          >
            {item.btnText}
          </ButtonPrimary>
        </div>

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex justify-center">
          {DATA.map((_, idx) => (
            <div
              key={idx}
              onClick={() => {
                setIndexActive(idx);
                handleAfterClick();
              }}
              className="relative px-1 py-1.5 cursor-pointer"
            >
              <div className="relative w-6 h-1 bg-white rounded">
                {indexActive === idx && (
                  <div className="absolute inset-0 bg-gray-800 rounded"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <Prev
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white"
          btnClassName="w-10 h-10 hover:bg-gray-700 rounded-full"
          svgSize="w-5 h-5"
          onClickPrev={handleClickPrev}
        />
        <Next
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white"
          btnClassName="w-10 h-10 hover:bg-gray-700 rounded-full"
          svgSize="w-5 h-5"
          onClickNext={handleClickNext}
        />
      </div>
    );
  };

  return <>{DATA.map((_, index) => renderItem(index))}</>;
};

export default SectionHero2;
