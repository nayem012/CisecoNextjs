
"use client";
import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";
import { PIXEL_ID } from "./config";
const PixelTracker = () => {
  useEffect(() => {
    const pixelId = PIXEL_ID;
    ReactPixel.init(pixelId || "");
    ReactPixel.pageView();
  }, []);
  return null;
};
export default PixelTracker;