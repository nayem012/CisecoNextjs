import Image, { StaticImageData } from "next/image";
import { Route } from "@/routers/types";
import imageRightPng from "@/images/hero-right.png";
import imageRightPng2 from "@/images/hero-right-2.png";
import imageRightPng3 from "@/images/hero-right-3.png";

interface Hero2DataType {
  image: StaticImageData | string;
  heading: string;
  subHeading: string;
  btnText: string;
  btnLink: Route;
}
export const HERO2_DEMO_DATA: Hero2DataType[] = [
  {
    image: imageRightPng2,
    heading: "Artexo",
    subHeading: "Discover exclusive designs crafted with passion ❤️",
    btnText: "Shop Now 🛒",
    btnLink: "/collection",
  },
  {
    image: imageRightPng3,
    heading: "Artexo",
    subHeading: "Stand out with unique styles from the heart of fashion 🔥",
    btnText: "Explore Collection 🔍",
    btnLink: "/collection",
  },
  {
    image: imageRightPng,
    heading: "Artexo",
    subHeading: "Elevate your wardrobe with our latest trends 😍",
    btnText: "Get Yours Today 🎉",
    btnLink: "/collection",
  },
];

