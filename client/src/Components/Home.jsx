import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import JobList from './JobList';
import Pagination from './Pagination';
import { JobProvider, JobContext } from '../context/JobContext';
import Filters from './Filters';
import { REACT_APP_BACKEND_URL } from '../../env';

const Home = () => {
  const navigate = useNavigate();
  const [user, setuser] = useState();
  const { setJobs } = useContext(JobContext);
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/signin');
      return;
    }
    
    try {
      const parsedUserData = JSON.parse(userData);
      if (!parsedUserData.id) {
        console.log('Invalid user data: mongoId missing');
        navigate('/signin');
      }

      setuser(parsedUserData);
      getAllJobs(parsedUserData);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user'); 
      navigate('/signin');
    }
  }, [navigate]);

  const getAllJobs = async (userData) => {
    try {
      setErrors(null); // Clear any previous errors
      const url = REACT_APP_BACKEND_URL + "/job/getall";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ useremail: userData.email }),
      });
      
      if (!response.ok) {
        throw new Error('Jobs retrieval failed');
      }
      
      const res = await response.json();
      setJobs(res.data);
      console.log(res.data); // array of all jobs;
      
    } catch (error) {
      setErrors({ form: 'Retrieval of all Jobs failed. Please try again.' });
    } 
  }

  const handleAddJob = async (jobData) => {
    try {
      setErrors(null); // Clear any previous errors
      const url = REACT_APP_BACKEND_URL + "/job/add";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...jobData, useremail: user.email, userid: user.id }),
      });
      
      if (!response.ok) {
        throw new Error('Job Addition failed');
      }
      
      const res = await response.json();
      getAllJobs(user);
       
    } catch (error) {
      setErrors({ form: 'Addition of Job failed. Please try again.' });
    } 

    console.log('New job:', jobData);
  };

  const handleUpdatedJob = async (updatedJob) => {
    try {
      setErrors(null); // Clear any previous errors
      const url = REACT_APP_BACKEND_URL + "/job/update";
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...updatedJob, useremail: user.email }),
      });
      
      if (!response.ok) {
        throw new Error('Job Updation failed');
      }
      
      const res = await response.json();
      getAllJobs(user);
       
    } catch (error) {
      setErrors({ form: 'Updation of Job failed. Please try again.' });
    } 
  }

  const handleDeleteJob = async (jobId) => {  
    try {
      setErrors(null); // Clear any previous errors
      const url = REACT_APP_BACKEND_URL + "/job/";
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: jobId, useremail: user.email }),
      });
      
      if (!response.ok) {
        throw new Error('Job Deletion failed');
      }
      
      const res = await response.json();
      getAllJobs(user);
       
    } catch (error) {
      setErrors({ form: 'Deletion of Job failed. Please try again.' });
    } 
  }

  const getJobsbyfilters = async (userData, status, date) => {
    try {
      setErrors(null); // Clear any previous errors
      const url = REACT_APP_BACKEND_URL + "/job/filter";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, date, useremail: userData.email }),
      });
      
      if (!response.ok) {
        throw new Error('Jobs retrieval failed');
      }
      
      const res = await response.json();
      setJobs(res.data);
      console.log(res.data); 
      
    } catch (error) {
      setErrors({ form: 'Retrieval of all Jobs by filters failed. Please try again.' });
    } 
  }

  const HandleFilters = (selectedStatus, selectedDate) => {
    console.log(selectedDate, selectedStatus);
    
    if (selectedStatus == 'All' && selectedDate == '') {
      getAllJobs(user);
      return;
    }

    getJobsbyfilters(user, selectedStatus, selectedDate);
  }

  // Function to dismiss error
  const dismissError = () => {
    setErrors(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 w-[85%]">
          {/* Error Alert */}
          {errors && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{errors.form}</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={dismissError}>
                <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}
          <Filters onAddJob={handleAddJob} HandleFilters={HandleFilters} />
          <JobList handleUpdatedJob={handleUpdatedJob} handleJobDeletion={handleDeleteJob} />
          {/* <Pagination /> */}
        </div>
      </main>
    </div>
  );
};

export default Home;