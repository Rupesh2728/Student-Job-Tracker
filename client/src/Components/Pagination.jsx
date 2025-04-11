// components/Pagination.js
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = () => {
  const pages = [1, 2, 3, 4, 5];
  const currentPage = 1;

  return (
    <div className="flex justify-center my-8">
      <nav className="flex items-center space-x-1">
        <button className="p-2 rounded-full text-gray-500 hover:bg-blue-50 hover:text-blue-600">
          <ChevronLeft size={20} />
        </button>
        
        {pages.map(page => (
          <button 
            key={page}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              page === currentPage 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
            }`}
          >
            {page}
          </button>
        ))}
        
        <button className="p-2 rounded-full text-gray-500 hover:bg-blue-50 hover:text-blue-600">
          <ChevronRight size={20} />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;