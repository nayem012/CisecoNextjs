import React from "react";
import logoImg from "@/images/logo.png";
// import logoLightImg from "@/images/logo-light.svg";
import Link from "next/link";
import Image from "next/image";
import { siteName } from "@/lib/config";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  // imgLight = logoImg,
  className = "flex-shrink-0",
}) => {
  return (
    <Link
      href="/"
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <div className="flex items-center space-x-2">
          <Image
            className={`block h-10 sm:h-10 w-auto `}
            src={img}
            alt="Logo"
            sizes="200px"
            priority
          />
          {/* text */}
          <h1 className={`md:text-2xl font-bold text-lg ${
           "dark:text-white text-gray-800"
          }`}>
            {siteName}
            </h1>
        </div>
      ) : (
        `${siteName}`
      )}
      
    </Link>
  );
};

export default Logo;
