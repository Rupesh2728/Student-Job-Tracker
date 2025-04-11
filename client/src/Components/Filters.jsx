import React, { useState } from 'react';
import { Sliders, Plus, ChevronDown, Calendar } from 'lucide-react';
import AddJobModal from './AddJobModal'; // Import the AddJobModal component


const Filters = ({ onAddJob,HandleFilters }) => {
  // State for filters
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Status options
  const statusOptions = [
    'All',
    'Applied',
    'Interview',
    'Offer',
    'Rejected',
  ];

  const handleStatusSelect = (status) => {
    HandleFilters(status,selectedDate);
    setSelectedStatus(status);
    setShowStatusDropdown(false);
  };

  const handleDateChange = (e) => {
    HandleFilters(selectedStatus,e.target.value);
    setSelectedDate(e.target.value);
    setShowDatePicker(false);
  };

  const handleAddJob = (jobData) => {
    if (onAddJob) {
      onAddJob(jobData);
    }
    console.log('Job added:', jobData);
  };

  

  return (
    <>
      <div className="my-6">
        <div className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row">
          {/* Status Filter */}
          <div className="relative mb-3 sm:mb-0 sm:mr-3">
            <button 
              className="w-full sm:w-auto flex items-center justify-between p-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50"
              onClick={() => setShowStatusDropdown(!showStatusDropdown)}
            >
              <div className="flex items-center">
                <Sliders size={20} />
                <span className="ml-2 mr-2">{selectedStatus}</span>
              </div>
              <ChevronDown size={15} />
            </button>

            {/* Status Dropdown */}
            {showStatusDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                <ul className="py-1">
                  {statusOptions.map((status, index) => (
                    <li 
                      key={index} 
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                      onClick={() => handleStatusSelect(status)}
                    >
                      {status}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Date Filter */}
          <div className="relative mb-3 sm:mb-0 sm:mr-3">
            <button 
              className="w-full sm:w-auto flex items-center justify-between p-2 border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <div className="flex items-center">
                <Calendar size={20} />
                <span className="ml-2 mr-2">{selectedDate || 'Date'}</span>
              </div>
              <ChevronDown size={15} />
            </button>

            {/* Date Picker */}
            {showDatePicker && (
              <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
                <input 
                  type="date" 
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
            )}
          </div>

          {/* Spacer for layout */}
          <div className="flex-grow"></div>

          {/* Add Job Button - Now full width on mobile */}
          <div className="w-full sm:w-auto">
            <button 
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={20} className="mr-2" />
              <span>Add Job</span>
            </button>
          </div>
        </div>

        {/* Display selected filters */}
        {(selectedStatus !== 'All' || selectedDate) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedStatus !== 'All' && (
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                Status: {selectedStatus}
                <button 
                  className="ml-2 text-blue-600 hover:text-blue-800"
                  onClick={() => handleStatusSelect('All')}
                >
                  ×
                </button>
              </div>
            )}
            
            {selectedDate && (
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                Date: {selectedDate}
                <button 
                  className="ml-2 text-blue-600 hover:text-blue-800"
                  onClick={() => {HandleFilters(selectedStatus,'');setSelectedDate('');}}
                >
                  ×
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <AddJobModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAddJob={handleAddJob}
      />
    </>
  );
};

export default Filters;