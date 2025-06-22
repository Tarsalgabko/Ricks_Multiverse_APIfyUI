import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = 7;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        visiblePages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          visiblePages.push(i);
        }
        visiblePages.push('...');
        visiblePages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        visiblePages.push(1);
        visiblePages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          visiblePages.push(i);
        }
      } else {
        visiblePages.push(1);
        visiblePages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          visiblePages.push(i);
        }
        visiblePages.push('...');
        visiblePages.push(totalPages);
      }
    }
    
    return visiblePages;
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center space-x-1 px-3 py-2 bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-lg text-green-400 font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-green-400/40 hover:shadow-green-400/20 hover:shadow-lg transition-all duration-300"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Prev</span>
      </button>
      
      <div className="flex items-center space-x-1">
        {getVisiblePages().map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <div className="px-3 py-2 text-green-400/60">
                <MoreHorizontal className="w-4 h-4" />
              </div>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                  currentPage === page
                    ? 'bg-green-400/20 text-green-400 border border-green-400/40 shadow-green-400/20 shadow-lg'
                    : 'bg-black/40 backdrop-blur-sm border border-green-400/20 text-green-300 hover:border-green-400/40 hover:text-green-400'
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center space-x-1 px-3 py-2 bg-black/40 backdrop-blur-sm border border-green-400/20 rounded-lg text-green-400 font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:border-green-400/40 hover:shadow-green-400/20 hover:shadow-lg transition-all duration-300"
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;