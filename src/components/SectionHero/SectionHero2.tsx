"use client";

import React, { FC, useState } from "react";
import backgroundLineSvg from "@/images/Moon.svg";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Next from "@/shared/NextPrev/Next";
import Prev from "@/shared/NextPrev/Prev";
import useInterval from "react-use/lib/useInterval";
import useBoolean from "react-use/lib/useBoolean";
import Image from "next/image";
import { HERO2_DEMO_DATA as DATA } from "./data";

export interface SectionHero2Props {
  className?: string;
}

let TIME_OUT: NodeJS.Timeout | null = null;

const SectionHero2: FC<SectionHero2Props> = ({ className = "" }) => {
  const [indexActive, setIndexActive] = useState(0);
  const [isRunning, toggleIsRunning] = useBoolean(true);

  useInterval(() => handleAutoNext(), isRunning ? 5500 : null);

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
        className={`nc-SectionHero2Item nc-SectionHero2Item--animation relative overflow-hidden ${className}`}
        key={index}
      >
        {/* Desktop Carousel Layout */}
        <div className="hidden sm:block">
          <div className="absolute inset-0 bg-[#E3FFE6]">
            <Image
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="absolute w-full h-full object-contain"
              src={backgroundLineSvg}
              alt="hero"
            />
          </div>

          <div className="relative container pb-0 pt-14 sm:pt-20 lg:py-44 flex flex-col lg:flex-row">
            {/* Text Content */}
            <div className="nc-SectionHero2Item__left relative z-[1] w-full max-w-3xl space-y-8 sm:space-y-14 lg:pr-10">
              <div className="space-y-5 sm:space-y-6">
                <span className="nc-SectionHero2Item__subheading block text-base md:text-xl text-slate-700 font-medium">
                  {item.subHeading}
                </span>
                <h2 className="nc-SectionHero2Item__heading font-semibold text-3xl sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl !leading-[114%] text-slate-900">
                  {item.heading}
                </h2>
              </div>

              <ButtonPrimary
                className="nc-SectionHero2Item__button dark:bg-slate-900 hidden lg:flex"
                sizeClass="py-3 px-6 sm:py-5 sm:px-9"
                href={item.btnLink}
              >
                <span>{item.btnText}</span>
                <svg className="w-5 h-5 ms-2.5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M22 22L20 20"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </ButtonPrimary>
            </div>

            {/* Mobile Button for Desktop Layout */}
            <ButtonPrimary
              className="nc-SectionHero2Item__button dark:bg-slate-900 lg:hidden mt-8 mx-auto"
              sizeClass="py-3 px-6 sm:py-4 sm:px-8"
              href={item.btnLink}
            >
              {item.btnText}
            </ButtonPrimary>

            {/* Desktop Image */}
            <div className="hidden sm:block nc-SectionHero2Item__image mt-10 lg:mt-0 lg:absolute end-0 rtl:-end-28 bottom-0 top-0 w-full max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
              <Image
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full object-contain object-right-bottom"
                src={item.image}
                alt={item.heading}
                priority
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="absolute bottom-4 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-20 flex justify-center">
            {DATA.map((_, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setIndexActive(idx);
                  handleAfterClick();
                }}
                className="relative px-1 py-1.5 cursor-pointer"
              >
                <div className="relative w-20 h-1 shadow-sm rounded-md bg-white">
                  {isActive && idx === indexActive && (
                    <div className="nc-SectionHero2Item__dot absolute inset-0 bg-slate-900 rounded-md" />
                  )}
                </div>
              </div>
            ))}
          </div>
          <Prev
            className="hidden lg:block absolute start-1 sm:start-5 top-1/2 -translate-y-1/2 z-10 !text-slate-700"
            btnClassName="w-12 h-12 hover:border-slate-400"
            svgSize="w-6 h-6"
            onClickPrev={handleClickPrev}
          />
          <Next
            className="hidden lg:block absolute end-1 sm:end-5 top-1/2 -translate-y-1/2 z-10 !text-slate-700"
            btnClassName="w-12 h-12 hover:border-slate-400"
            svgSize="w-6 h-6"
            onClickNext={handleClickNext}
          />
        </div>

        {/* Mobile Carousel Layout (No Photo) */}
        <div className="block sm:hidden p-4">
          <div className="relative bg-[#E3FFE6] rounded-lg shadow-sm overflow-hidden">
            <div className="p-4">
              <span className="nc-SectionHero2Item__subheading block text-xs md:text-sm text-slate-700 font-medium">
                {item.subHeading}
              </span>
              <h2 className="nc-SectionHero2Item__heading font-semibold text-base md:text-lg leading-tight text-slate-900">
                {item.heading}
              </h2>
              <ButtonPrimary
                className="nc-SectionHero2Item__button dark:bg-slate-900 mt-2"
                sizeClass="py-2 px-3"
                href={item.btnLink}
              >
                {item.btnText}
              </ButtonPrimary>
            </div>
          </div>
          <div className="mt-2 flex justify-center space-x-2">
            {DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIndexActive(idx);
                  handleAfterClick();
                }}
                className={`w-3 h-3 rounded-full ${
                  indexActive === idx ? "bg-slate-900" : "bg-white"
                } border border-slate-900`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  };

  return <>{DATA.map((_, idx) => renderItem(idx))}</>;
};

export default SectionHero2;
