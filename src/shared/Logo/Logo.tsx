import React from "react";
import logoImg from "@/images/logo.png";
// import logoLightImg from "@/images/logo-light.svg";
import Link from "next/link";
import Image from "next/image";

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
            className={`block h-8 sm:h-10 w-auto `}
            src={img}
            alt="Logo"
            sizes="200px"
            priority
          />
          {/* text artexo */}
          <h1 className={`text-2xl font-bold ${
           "dark:text-white text-gray-800"
          }`}>
            <span className="animated-background bg-gradient-to-r from-teal-400 to-blue-500 text-transparent bg-clip-text">
            AR
            </span>
          texo</h1>
        </div>
      ) : (
        "Artexo"
      )}
      
    </Link>
  );
};

export default Logo;
