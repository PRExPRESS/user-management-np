import React, { useState } from 'react';

interface PaginationProps {
  totalPages: number; // Total number of pages
  currentPage: number; // The current page number
  onPageChange: (page: number) => void; // Function to handle page changes
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  // Define how many page numbers to show before and after the current page
  const maxPagesToShow = 5;

  // Function to handle page click
  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Function to handle "Previous" button click
  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Function to handle "Next" button click
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Function to determine which page numbers to display, including ellipses
  const getPageNumbers = () => {
    const pages = [];
    
    // If there are less than or equal to the max pages to show, display all pages
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Show the first page, the current page, and the last page
    pages.push(1);

    if (currentPage > maxPagesToShow - 2) {
      pages.push('...');
    }

    const start = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 2);
    const end = Math.min(currentPage + Math.floor(maxPagesToShow / 2), totalPages - 1);

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (currentPage < totalPages - (maxPagesToShow - 2)) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="inline-flex -space-x-px text-base h-10">
        {/* Previous Button */}
        <li>
          <button
            onClick={handlePrevClick}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
          >
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="px-4 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400">...</span>
            ) : (
              <button
                onClick={() => handlePageClick(page as number)}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`flex items-center justify-center px-4 h-10 leading-tight ${
                  currentPage === page
                    ? 'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:opacity-50"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
