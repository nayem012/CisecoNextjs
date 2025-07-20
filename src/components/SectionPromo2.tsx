import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import rightImgDemo from "@/images/logo.png";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Logo from "@/shared/Logo/Logo";
import backgroundLineSvg from "@/images/Moon.svg";
import Image from "next/image";
import { siteName } from "@/lib/config";

export interface SectionPromo2Props {
  className?: string;
}

const SectionPromo2: FC<SectionPromo2Props> = ({ className = "lg:pt-10" }) => {
  return (
    <div className={`nc-SectionPromo2 ${className}`}>
      <div className="relative flex flex-col lg:flex-row lg:justify-center bg-yellow-50 dark:bg-slate-800 rounded-2xl sm:rounded-[40px] p-4 pb-0 sm:p-5 sm:pb-0 lg:p-24">
        <div className="absolute inset-0">
          <Image
            fill
            className="absolute w-full h-full object-contain dark:opacity-5"
            src={backgroundLineSvg}
            alt="backgroundLineSvg"
          />
        </div>

        <div className="lg:w-[45%] max-w-lg relative">
          <Logo className="w-28" />
          <h2 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 !leading-[1.13] tracking-tight">
            New Products<br></br> Are Comming
          </h2>
          <span className="block mt-6 text-slate-500 dark:text-slate-400">
          Wear it bold. Wear it Bangladeshi. Wear {siteName}.
          </span>
          <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12 mb-12 md:mb-0">
            <ButtonPrimary
              href="/about"
              className="dark:bg-slate-200 dark:text-slate-900"
            >
              Discover more
            </ButtonPrimary>
          </div>
        </div>

        <div className="justify-center items-center w-full mt-10 lg:mt-0 max-w-xl lg:max-w-[calc(55%-40px)] mx-auto hidden md:flex">
          <NcImage
            alt=""
            containerClassName=""
            src={rightImgDemo}
            sizes="(max-width: 768px) 100vw, 50vw"
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default SectionPromo2;
