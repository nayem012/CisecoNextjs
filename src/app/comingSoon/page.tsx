"use client";

import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import React, { useState, useEffect } from "react";
import NcImage from "@/shared/NcImage/NcImage";
import { ClockIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const ComingSoonPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");

  // Set your launch date here (YYYY, MM-1, DD)
  const launchDate = new Date(2024, 11, 31).getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission here
    console.log("Submitted email:", email);
    // alert("Thanks for subscribing! We'll notify you when we launch.");
    toast.success("Thanks for subscribing! We'll notify you when we launch.");
    setEmail("");
  };

  return (
    <div className="nc-ComingSoonPage bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container relative min-h-screen flex flex-col items-center justify-center py-16 lg:py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo or Brand Name */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Coming Soon
          </h1>
          
          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
            Were working hard to bring you an amazing experience. Our website is under construction and will be ready soon!
          </p>
          
          {/* Countdown Timer */}
          {/* <div className="flex justify-center gap-4 sm:gap-8 mb-16">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-20 sm:w-24 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {timeLeft.days}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Days
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-20 sm:w-24 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {timeLeft.hours}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Hours
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-20 sm:w-24 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {timeLeft.minutes}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Minutes
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-20 sm:w-24 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {timeLeft.seconds}
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Seconds
              </div>
            </div>
          </div> */}
          
          {/* Email Subscription */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 sm:p-8 max-w-lg mx-auto mb-16">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
              <EnvelopeIcon className="w-6 h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
              Notify Me When Launched
            </h3>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              />
              <ButtonPrimary type="submit" className="w-full sm:w-auto">
                Subscribe
              </ButtonPrimary>
            </form>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-4">
            {/* <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a> */}
            <a
              href="https://www.facebook.com/share/1A7N4x4fP1/"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            {/* <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 shadow-lg text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;