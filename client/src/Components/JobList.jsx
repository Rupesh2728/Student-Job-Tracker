// components/JobList.js
import React, { useContext } from 'react';
import JobCard from './JobCard';
import { JobContext } from '../context/JobContext';

const JobList = ({handleUpdatedJob,handleJobDeletion}) => {
  const { jobs, setJobs } = useContext(JobContext);

  const handleEditJob = (updatedJob) => {
    handleUpdatedJob(updatedJob);
  };

  const handleDeleteJob = (jobId) => {
    handleJobDeletion(jobId);
  };

  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-lg">
          <svg 
            className="w-20 h-20 mx-auto text-gray-400 mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            ></path>
          </svg>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No jobs found</h3>
          <p className="text-gray-600 mb-6">
            You haven't added any job applications yet. Get started by adding your first job application.
          </p>
        
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
      {jobs.map((job) => (
        <JobCard 
          key={job._id} 
          job={job} 
          onEditJob={handleEditJob}
          onDeleteJob={handleDeleteJob}
        />
      ))}
    </div>
  );
};

export default JobList;