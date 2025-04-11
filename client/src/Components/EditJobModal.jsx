import React, { useState, useEffect } from 'react';
import { X, Calendar, Building, Link as LinkIcon, Briefcase, Check } from 'lucide-react';

const EditJobModal = ({ isOpen, onClose, onEditJob, job }) => {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    link: '',
    status: 'Applied',
    doa: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState({
    title: false,
    company: false,
    doa: false
  });

  // Status options
  const statusOptions = [
    'Applied',
    'Interview',
    'Offer',
    'Rejected'
  ];

  // Update form when job data changes
  useEffect(() => {
    if (job) {
      // For date field, we need to convert it back to YYYY-MM-DD format if it's not already
      let formattedDate = job.doa;
      
      // If the date is in format like "8th April,2025", convert it to YYYY-MM-DD
      if (job.doa && typeof job.doa === 'string' && !job.doa.includes('-')) {
        try {
          // Extract date parts
          const dateParts = job.doa.match(/(\d+)(?:st|nd|rd|th)\s+(\w+),(\d+)/);
          if (dateParts) {
            const day = parseInt(dateParts[1], 10);
            const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 
                           'August', 'September', 'October', 'November', 'December']
                           .indexOf(dateParts[2]);
            const year = parseInt(dateParts[3], 10);
            
            if (month !== -1) {
              // Create date string with proper padding for day and month
              const paddedMonth = String(month + 1).padStart(2, '0');
              const paddedDay = String(day).padStart(2, '0');
              formattedDate = `${year}-${paddedMonth}-${paddedDay}`;
            }
          }
        } catch (error) {
          console.error('Error parsing date:', error);
          // Fallback to current date if parsing fails
          formattedDate = new Date().toISOString().split('T')[0];
        }
      }
      
      setJobData({
        title: job.title || '',
        company: job.company || '',
        link: job.link || '',
        status: job.status || 'Applied',
        doa: formattedDate
      });
      
      // Reset errors when loading new job data
      setErrors({
        title: false,
        company: false,
        doa: false
      });
    }
  }, [job]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({
      ...jobData,
      [name]: value
    });
    
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
  };

  // Validate form data
  const validateForm = () => {
    const newErrors = {
      title: !jobData.title.trim(),
      company: !jobData.company.trim(),
      doa: !jobData.doa
    };
    
    setErrors(newErrors);
    
    // Return true if no errors (all fields filled)
    return !Object.values(newErrors).some(error => error);
  };

  const HandleClose=()=>{
     
    setJobData({
      title: '',
      company: '',
      link: '',
      status: 'Applied', 
      doa: new Date().toISOString().split('T')[0]
    });

    setErrors({
      title: false,
      company: false,
      doa: false
    });
    
    onClose();
  }


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onEditJob({ ...jobData, id: job.id || job._id });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Job Application</h2>
          <button 
            onClick={HandleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-4">
          {/* Job Title */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Job Title</label>
            <div className={`flex items-center border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-lg overflow-hidden`}>
              <div className="bg-gray-50 p-2 border-r">
                <Briefcase size={20} className={errors.title ? 'text-red-500' : 'text-gray-500'} />
              </div>
              <input
                type="text"
                name="title"
                value={jobData.title}
                onChange={handleChange}
                placeholder="e.g. Technical Support Specialist"
                className="w-full p-2 focus:outline-none"
                required
              />
            </div>
            {errors.title && <p className="text-red-500 text-sm mt-1">Job title is required</p>}
          </div>

          {/* Company */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Company</label>
            <div className={`flex items-center border ${errors.company ? 'border-red-500' : 'border-gray-300'} rounded-lg overflow-hidden`}>
              <div className="bg-gray-50 p-2 border-r">
                <Building size={20} className={errors.company ? 'text-red-500' : 'text-gray-500'} />
              </div>
              <input
                type="text"
                name="company"
                value={jobData.company}
                onChange={handleChange}
                placeholder="e.g. Google Inc."
                className="w-full p-2 focus:outline-none"
                required
              />
            </div>
            {errors.company && <p className="text-red-500 text-sm mt-1">Company name is required</p>}
          </div>

          {/* Application Link */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Application Link</label>
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <div className="bg-gray-50 p-2 border-r">
                <LinkIcon size={20} className="text-gray-500" />
              </div>
              <input
                type="url"
                name="link"
                value={jobData.link}
                onChange={handleChange}
                placeholder="e.g. https://careers.google.com/jobs/123"
                className="w-full p-2 focus:outline-none"
              />
            </div>
          </div>

          {/* Two columns layout for status and date */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            {/* Status Selection */}
            <div className="w-full sm:w-1/2">
              <label className="block text-gray-700 mb-2">Status</label>
              <div className="relative">
                <select
                  name="status"
                  value={jobData.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none appearance-none"
                  required
                >
                  {statusOptions.map((status, index) => (
                    <option key={index} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <Check size={16} className="text-gray-500" />
                </div>
              </div>
            </div>

            {/* Application Date */}
            <div className="w-full sm:w-1/2">
              <label className="block text-gray-700 mb-2">Application Date</label>
              <div className={`flex items-center border ${errors.doa ? 'border-red-500' : 'border-gray-300'} rounded-lg overflow-hidden`}>
                <div className="bg-gray-50 p-2 border-r">
                  <Calendar size={20} className={errors.doa ? 'text-red-500' : 'text-gray-500'} />
                </div>
                <input
                  type="date"
                  name="doa"
                  value={jobData.doa}
                  onChange={handleChange}
                  className="w-full p-2 focus:outline-none"
                  required
                />
              </div>
              {errors.doa && <p className="text-red-500 text-sm mt-1">Date is required</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;