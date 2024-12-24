import Link from "next/link";
import React from "react";

interface PaginationProps {
  page: number;
  jobLength: number;
  jobsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  jobLength,
  jobsPerPage,
}) => {
  const totalPages = Math.ceil(jobLength / jobsPerPage);

  return (
    <div className="w-full flex justify-center items-center mt-6">
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm md:text-base h-10">
          {/* Previous Button */}
          <li>
            <Link
              href={`/?${new URLSearchParams({
                page: String(page > 1 ? page - 1 : 1),
              }).toString()}`}
              className={`flex items-center justify-center px-4 h-10 leading-tight ${
                page === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "text-white bg-blue-700 border border-blue-700 hover:bg-blue-800"
              } rounded-l-lg`}
              aria-disabled={page === 1}
            >
              Previous
            </Link>
          </li>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <li key={pageNumber}>
                <Link
                  href={`/?${new URLSearchParams({
                    page: String(pageNumber),
                  }).toString()}`}
                  className={`flex items-center justify-center px-4 h-10 leading-tight border ${
                    pageNumber === page
                      ? "text-white bg-blue-700 border-blue-700 hover:bg-blue-800"
                      : "text-blue-700 bg-white border-blue-700 hover:bg-blue-100"
                  }`}
                >
                  {pageNumber}
                </Link>
              </li>
            )
          )}

          {/* Next Button */}
          <li>
            <Link
              href={`/?${new URLSearchParams({
                page: String(page < totalPages ? page + 1 : totalPages),
              }).toString()}`}
              className={`flex items-center justify-center px-4 h-10 leading-tight ${
                page === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "text-white bg-blue-700 border border-blue-700 hover:bg-blue-800"
              } rounded-r-lg`}
              aria-disabled={page === totalPages}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
