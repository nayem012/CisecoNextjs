import React, { FC } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import rightImgDemo from "@/images/rightLargeImg.png";
import rightLargeImgDark from "@/images/rightLargeImgDark.png";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Logo from "@/shared/Logo/Logo";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";

export interface SectionPromo1Props {
  className?: string;
}

const SectionPromo1: FC<SectionPromo1Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionPromo1 relative flex flex-col lg:flex-row items-center ${className}`}
    >
      <div className="relative flex-shrink-0 mb-16 lg:mb-0 lg:mr-10 lg:w-2/5">
        <Logo className="w-28" />
        <h2 className="font-semibold text-3xl sm:text-4xl xl:text-5xl 2xl:text-6xl mt-6 sm:mt-10 !leading-[1.2] tracking-tight">
          Elevate Your Style <br /> with ArtExo
        </h2>
        <span className="block mt-6 text-slate-500 dark:text-slate-400 ">
          Discover premium Bangladeshi fashion with exclusive member benefits. 
          Enjoy free shipping, referral rewards, and seasonal discounts.
          Coming soon.
        </span>
        <div className="flex space-x-2 sm:space-x-5 mt-6 sm:mt-12">
          <ButtonPrimary href="/collection" className="">
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
      <div className="relative flex-1 max-w-xl lg:max-w-none">
        <NcImage
          alt="ArtExo Premium Collection"
          containerClassName="block dark:hidden"
          src={rightImgDemo}
          sizes="(max-width: 768px) 100vw, 50vw"
          className=""
        />
        <NcImage
          alt="ArtExo Night Collection"
          containerClassName="hidden dark:block"
          src={rightLargeImgDark}
          sizes="(max-width: 768px) 100vw, 50vw"
          className=""
        />
      </div>
    </div>
  );
};

export default SectionPromo1;