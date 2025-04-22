"use client";
// all products page with filter and sort, react-query, and pagination
import { redirect } from "next/navigation";
// sorting and filtering imports
export default function ProductDetailPage() {
  // redirct to /collection
  redirect("/collection");
  return <div className="text-center">Redirecting...</div>;
}