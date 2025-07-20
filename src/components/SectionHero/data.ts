import Image, { StaticImageData } from "next/image";
import { Route } from "@/routers/types";
import imageRightPng from "@/images/hero1.png";
import imageRightPng2 from "@/images/hero2.png";
import imageRightPng3 from "@/images/hero3.png";

interface Hero2DataType {
  image: StaticImageData | string;
  heading: string;
  subHeading: string;
  btnText: string;
  btnLink: Route;
}
export const HERO2_DEMO_DATA: Hero2DataType[] = [
  {
    image: imageRightPng,
    heading: "Jersey Shop",
    subHeading: "Score big with authentic jerseys for every fan! ⚽️🏀",
    btnText: "Shop Jerseys 🏆",
    btnLink: "/collection",
  },
  {
    image: imageRightPng2,
    heading: "Custom Team Kits",
    subHeading: "Personalize your kit and play like a pro! �️",
    btnText: "Customize Now ✏️",
    btnLink: "/collection",
  },
  {
    image: imageRightPng3,
    heading: "Artexo Exclusive",
    subHeading: "Limited edition jerseys only at Artexo! ⭐️",
    btnText: "See Exclusives 👕",
    btnLink: "/collection",
  },
];

