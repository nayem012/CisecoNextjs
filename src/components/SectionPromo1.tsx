import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import rightImgDemo from "@/images/logo.png";
import rightLargeImgDark from "@/images/logo.png";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Logo from "@/shared/Logo/Logo";
// import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { siteName, siteDescription, siteUrl } from '@/lib/config';

export interface SectionPromo1Props {
  className?: string;
}

const SectionPromo1: FC<SectionPromo1Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionPromo1 relative flex flex-col lg:flex-row items-center ${className} bg-primary-200 dark:bg-primary-800 text-neutral-900 dark:text-neutral-100 p-8 rounded-lg lg:p-12 shadow-lg`}
    >
      <div className="relative flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        <Logo className="w-28" />
        <h2 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 !leading-[1.2] tracking-tight">
          Elevate Your Style <br /> with {siteName}
        </h2>
        <span className="block mt-6 text-slate-500 dark:text-slate-400 ">
          {siteDescription}
          <br />
          Visit us: <a href={siteUrl} className="underline text-pink-600" target="_blank" rel="noopener noreferrer">{siteUrl}</a>
          <br />
          {/* API: <span className="text-xs text-pink-400">{apiURL}</span> */}
        </span>
        <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
          <ButtonPrimary href="/collection">
            New Collection
          </ButtonPrimary>
          {/* <ButtonSecondary
            href="/referral"
            className="border border-slate-100 dark:border-slate-700"
          >
            Refer & Earn
          </ButtonSecondary> */}
        </div>
      </div>
      <div className="hidden md:flex flex-1 max-w-xl lg:max-w-none justify-center items-center">
        <NcImage
          alt={`${siteName} Premium Collection`}
          containerClassName="block dark:hidden"
          src={rightImgDemo}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <NcImage
          alt={`${siteName} Night Collection`}
          containerClassName="hidden dark:block"
          src={rightLargeImgDark}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};

export default SectionPromo1;