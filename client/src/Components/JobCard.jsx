import React, { useState } from 'react';
import { Calendar, Pencil } from 'lucide-react';
import EditJobModal from './EditJobModal';

const JobCard = ({ job, onEditJob, onDeleteJob }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const { 
    id,
    title,
    company,
    link,
    doa,
    status,
  } = job;
  
  let typeColor;
  switch(status.toLowerCase()) {
    case 'applied':
      typeColor = 'text-blue-600 bg-blue-100';
      break;
    case 'interview':
      typeColor = 'text-gray-600 bg-gray-100';
      break;
    case 'offer':
      typeColor = 'text-green-600 bg-green-100';
      break;
    default:
      typeColor = 'text-red-600 bg-red-100';
  }

  // Get the first letter of company name for the logo
  const companyInitial = company ? company.charAt(0).toUpperCase() : '?';

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditClose = () => {
    setIsEditModalOpen(false);
  };

  const handleDeleteClick = () => {
     console.log(job._id);
     
    if (window.confirm('Are you sure you want to delete this job application?')) {
      onDeleteJob(job._id);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between">
          <div>
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-semibold text-lg text-gray-900 mb-1 hover:text-blue-600 transition-colors cursor-pointer"
            >
              {title}
            </a>
            <div className="mb-2 mt-1">
              <span className={`inline-block text-xs font-medium px-2 py-1 rounded uppercase ${typeColor}`}>
                {status}
              </span>
            </div>
          </div>
          <button 
            className="text-gray-400 hover:text-blue-600"
            onClick={handleDeleteClick}
          >
            <img 
              src="https://t4.ftcdn.net/jpg/03/46/38/39/360_F_346383913_JQecl2DhpHy2YakDz1t3h0Tk3Ov8hikq.jpg" 
              alt='Delete Icon' 
              className='w-[3rem] hover:w-[3.2rem]'
            />
          </button>
        </div>

        <div className='flex justify-between'>
          <div className="flex items-center mt-4">
            <div className="w-8 h-8 flex-shrink-0 mr-3 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center text-gray-600 font-medium">
              {companyInitial}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{company}</div>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <Calendar size={14} className="mr-1" />
                <span>{doa}</span>
              </div>
            </div>
          </div>

          <Pencil 
            className="m-auto xs:mr-0 sm:mr-4 mt-[2rem] w-[1.25rem] hover:w-[1.4rem] cursor-pointer" 
            onClick={handleEditClick}
          />
        </div>
      </div>

      <EditJobModal 
        isOpen={isEditModalOpen}
        onClose={handleEditClose}
        onEditJob={onEditJob}
        job={job}
      />
    </>
  );
};

export default JobCard;