// src/components/CookieConsentBanner.tsx
"use client";
import { useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary"; //
import ButtonSecondary from "@/shared/Button/ButtonSecondary"; //

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const hasAccepted = localStorage.getItem("hasAcceptedCookies-mary"); //
      if (hasAccepted === null) {
        setIsVisible(true);
      }
    } catch (e) {
      // Fallback: If localStorage is not accessible, assume consent needed
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("hasAcceptedCookies-mary", "true"); //
      window.dispatchEvent(new Event("storage")); // Trigger storage event for PixelTracker
    } catch (e) {
      console.error("Failed to set cookie consent in localStorage:", e);
    }
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("hasAcceptedCookies-mary", "false"); //
      window.dispatchEvent(new Event("storage")); // Trigger storage event for PixelTracker
    } catch (e) {
      console.error("Failed to set cookie decline in localStorage:", e);
    }
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-neutral-800 text-white p-4 z-50 flex flex-col md:flex-row items-center justify-between shadow-lg">
      <p className="text-sm text-center md:text-left mb-3 md:mb-0">
        We use cookies to improve your experience. By continuing to visit this site, you agree to our use of cookies.
      </p>
      <div className="flex space-x-2">
        <ButtonPrimary onClick={handleAccept} className="px-4 py-2 text-sm">
          Accept
        </ButtonPrimary>
        <ButtonSecondary onClick={handleDecline} className="px-4 py-2 text-sm">
          Decline
        </ButtonSecondary>
      </div>
    </div>
  );
};

export default CookieConsentBanner;