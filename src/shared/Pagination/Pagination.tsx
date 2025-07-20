import { CustomLink } from "@/data/types";
import React, { FC } from "react";
import twFocusClass from "@/utils/twFocusClass";
import Link from "next/link";

export interface PaginationProps {
  className?: string;
  totalPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ className = "", totalPage, currentPage, onPageChange }) => {
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  const renderItem = (pageNum: number, index: number) => {
    if (pageNum === currentPage) {
      return (
        <span
          key={index}
          className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-600 text-white ${twFocusClass()}`}
        >
          {pageNum}
        </span>
      );
    }
    // RETURN UNACTIVE PAGINATION
    return (
      <button
        key={index}
        className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-pink-100 border border-pink-200 text-pink-600 dark:text-pink-300 dark:bg-pink-900 dark:hover:bg-pink-800 dark:border-pink-700 ${twFocusClass()}`}
        onClick={() => onPageChange(pageNum)}
        aria-current={pageNum === currentPage ? "page" : undefined}
      >
        {pageNum}
      </button>
    );
  };

  return (
    <nav
      className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}
    >
      {pages.map(renderItem)}
    </nav>
  );
};

export default Pagination;
