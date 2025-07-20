import { config } from "dotenv"
config();
export const apiURL = "https://admin-panel.artexobd.com/api/admin/"
// export const apiURL = "http://localhost:3001/api/admin/"
export const siteName = "ARtexo"
export const siteDescription = "Shop the latest best polo t‑shirts. 100% cotton, cash‑on‑delivery across BD. Grab yours now!"
export const siteUrl = "https://artexobd.com"
export const PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID
export const meta_conversion_accessToken = process.env.NEXT_PUBLIC_META_CONVERSION_ACCESS_TOKEN