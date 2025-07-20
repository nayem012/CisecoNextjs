"use client";
import React, { useState, useEffect } from "react";
// import { PIXEL_ID } from "../lib/config";
import SectionHero2 from "@/components/SectionHero/SectionHero2";
// import SectionSliderLargeProduct from "@/components/SectionSliderLargeProduct";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
// import DiscoverMoreSlider from "@/components/DiscoverMoreSlider";
// import SectionGridMoreExplore from "@/components/SectionGridMoreExplore/SectionGridMoreExplore";
import SectionPromo2 from "@/components/SectionPromo2";
// import { PIXEL_ID } from "@/lib/config";
// import SectionSliderCategories from "@/components/SectionSliderCategories/SectionSliderCategories";
// import SectionPromo3 from "@/components/SectionPromo3";
// import SectionClientSay from "@/components/SectionClientSay/SectionClientSay";
// import Heading from "@/components/Heading/Heading";
// import ButtonSecondary from "@/shared/Button/ButtonSecondary";
// import { PRODUCTS, SPORT_PRODUCTS } from "@/data/data";
// import SectionGridFeatureItems from "@/components/SectionGridFeatureItems";
// import SectionMagazine5 from "@/app/blog/SectionMagazine5";
// import SectionHero from "./about/SectionHero";
// import SectionHero3 from "@/components/SectionHero/SectionHero3";
// import ReactPixel from "react-facebook-pixel";
import { CATEGORIES } from "@/data/data";

function PageHome() {
  // Remove all direct ReactPixel usage from here
  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* <CookieConsentBanner /> */}
      <SectionHero2 />
      {/* <SectionHero /> */}
      {/* <SectionHero3/> */}
      {/* <div className="mt-24 lg:mt-32">
        <DiscoverMoreSlider />
      </div> */}

      <div className="container relative space-y-24 my-24 lg:space-y-32 lg:my-32">
        <SectionSliderProductCard 
          heading="New Arrivals"
          subHeading="Explore our latest collection of new arrivals"
          category="all"
        />
        {CATEGORIES.map((category: { name: string; slug: string }, index: number) => (
          <SectionSliderProductCard
            key={index}
            heading={category.name}
            subHeading={`Explore our latest collection of ${category.name.toLowerCase()} products`}
            category={category.slug}
          />
        ))}
        {/* <SectionSliderProductCard
          heading="Sport Collection"
          subHeading="Explore our latest collection of sport products"
          data={SPORT_PRODUCTS}
        {/* <div className="py-24 lg:py-32 border-t border-b border-slate-200 dark:border-slate-700">
          <SectionHowItWork />
        </div> */}
        {/* <SectionPromo1 /> */}

        {/* <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <SectionGridMoreExplore />
        </div>

        <SectionSliderProductCard
          heading="Best Sellers"
          subHeading="Best selling of the month"
        /> */}

        <SectionPromo2 />
        
        {/* <SectionSliderLargeProduct cardStyle="style2" /> */}

        {/* <SectionSliderCategories /> */}

        {/* <SectionPromo3 /> */}

        {/* <SectionGridFeatureItems /> */}

        {/* <div className="relative py-24 lg:py-32">
          <BackgroundSection />
          <div>
            <Heading rightDescText="From the Ciseco blog">
              The latest news
            </Heading>
            <SectionMagazine5 />
            <div className="flex mt-16 justify-center">
              <ButtonSecondary>Show all blog articles</ButtonSecondary>
            </div>
          </div>
        </div>
        <SectionClientSay /> */}
      </div>
    </div>
  );
}

export default PageHome;
