'use client';

import React from 'react';
import rightImg from '@/images/hero-right1.png';
import SectionHero from './SectionHero';
import BgGlassmorphism from '@/components/BgGlassmorphism/BgGlassmorphism';
import BackgroundSection from '@/components/BackgroundSection/BackgroundSection';
interface SectionMissionProps {
  title: string;
  content: string[];
}

const SectionMission: React.FC<SectionMissionProps> = ({ title, content }) => {
  return (
    <div className="space-y-8 px-4 sm:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center sm:text-left text-gray-800 dark:text-gray-200">
      {title}
      </h2>
      <ul className="list-disc pl-5 space-y-4 text-gray-600 dark:text-gray-400">
      {content.map((item, index) => (
        <li
        key={index}
        className="text-lg leading-relaxed sm:text-xl sm:leading-loose"
        >
        {item}
        </li>
      ))}
      </ul>
    </div>
  );
}
const PageAbout: React.FC = () => {
  return (
    <div className="nc-PageAbout relative overflow-hidden">
      <BgGlassmorphism />
      <BackgroundSection className="absolute inset-0" />

      <div className="container mx-auto py-16 lg:py-28 space-y-24">
        {/* Hero Section */}
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us"
          subHeading="Founded in 2025, Artexo is a proudly Bangladeshi brand blending bold design with local craftsmanship."
          btnText=""
        />

        {/* Mission Section */}
        <SectionMission
          title="Our Mission"
          content={[
            'At Artexo, we believe fashion is a form of self-expression.',
            'Our mission is to create standout apparel that captures individuality, attitude, and authenticity.',
            'Each piece is 100% crafted in Bangladesh, showcasing the talent and dedication of our homegrown artisans.'
          ]}
        />

        {/* Timeline Section */}
        {/* <SectionTimeline
          events={[
            { year: 2025, label: 'Artexo Founded in Dhaka, Bangladesh.' },
            { year: 2026, label: 'Expanded product lines with sustainable fabrics.' },
            { year: 2027, label: 'First international shipment to North America.' }
          ]}
        /> */}

        {/* Founder Section */}
        

        {/* Statistics Section */}
        
      </div>
    </div>
  );
};

export default PageAbout;
