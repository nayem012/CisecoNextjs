import Logo from "@/shared/Logo/Logo";
import SocialsList1 from "@/shared/SocialsList1/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";
import { siteName } from "@/lib/config";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "1",
    title: "Information",
    menus: [
      { href: "/about", label: "About Us" },
      { href: "/policy", label: "Policy & terms" },
      // { href: "/", label: "Size Guide" },
      // { href: "/", label: "How to Order" },
      // { href: "/", label: "Return & Exchanges" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-100 mb-6">
          {menu.title}
        </h2>
        <ul className="space-y-3">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                className="text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <footer className="nc-Footer relative bg-neutral-50 dark:bg-neutral-900 py-16 lg:py-20 border-t border-neutral-200 dark:border-neutral-800">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Logo and Socials */}
          <div className="mb-10 md:mb-0">
            <Logo className="w-40" />
            <p className="mt-4 text-neutral-500 dark:text-neutral-400 max-w-xs">
              Your one-stop shop for quality products and exceptional service.
            </p>
            <div className="mt-6">
              <SocialsList1 className="flex items-center space-x-3" />
            </div>
          </div>

          {/* Menu Columns */}
          <div className="grid grid-cols-2 gap-10 md:gap-16 lg:gap-20">
            {widgetMenus.map(renderWidgetMenuItem)}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center text-neutral-500 dark:text-neutral-400 text-sm">
          &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>

        {/* deveoper */}
        <div className="mt-2 text-center text-neutral-500 dark:text-neutral-400 text-sm">
          Developed by{" "}
          <a
            href="https://turag.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            Turag
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;