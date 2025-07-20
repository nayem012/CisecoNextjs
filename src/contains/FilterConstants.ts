import { CATEGORIES } from "@/data/data";

export const DATA_categories = [
//   { name: "hijab" },
//   { name: "hijab-pins" },
//   { name: "hijab-accessories" }
...CATEGORIES.map((c)=>{
    return {name: c.name}
})
];

export const DATA_colors = [
  { name: "White" },
  { name: "Nude" },
  { name: "Black" },
  { name: "Royal Blue" },
  { name: "Mint" },
  { name: "Lemon" },
  { name: "Teal" },
  { name: "Rust Brown" },
  { name: "Sky blue" },
  { name: "Coffee" },
  { name: "Coffee brown" },
  { name: "Red" },
  { name: "Marron" },
  { name: "Levender" },
  { name: "Purple" },
  { name: "Beige" },
  { name: "Baby pink" }
];


export const DATA_sortOrderRadios = [
  { name: "Most Popular", id: "Most-Popular" },
  { name: "Best Rating", id: "Best-Rating" },
  { name: "Newest", id: "Newest" },
  { name: "Price Low - Hight", id: "Price-low-hight" },
  { name: "Price Hight - Low", id: "Price-hight-low" },
];

export const PRICE_RANGE = [1, 1000];