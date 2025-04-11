import React, { useEffect, useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import JobList from './JobList';
import Pagination from './Pagination';
import { JobProvider,JobContext } from '../context/JobContext';
import Filters from './Filters';
import {REACT_APP_BACKEND_URL} from '../../env';

const Home = () => {
  const navigate = useNavigate();
  const [user,setuser] = useState();
  const { setJobs } = useContext(JobContext);
  const [errors,setErrors] = useState();

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


   const getAllJobs=async (userData)=>{
    try {
      const url =  REACT_APP_BACKEND_URL + "/job/getall";
       const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({useremail : userData.email}),
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
      const url =  REACT_APP_BACKEND_URL + "/job/add";
       const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...jobData,useremail : user.email, userid : user.id}),
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


  const handleUpdatedJob=async(updatedJob)=>
  {
    try {
      const url =  REACT_APP_BACKEND_URL + "/job/update";
       const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...updatedJob,useremail : user.email}),
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



  const handleDeleteJob=async(jobId)=>
    {  
      try {
        const url =  REACT_APP_BACKEND_URL + "/job/";
         const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id: jobId,useremail : user.email}),
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

    const getJobsbyfilters=async (userData,status,date)=>{
      try {
        const url =  REACT_APP_BACKEND_URL + "/job/filter";
         const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({status,date,useremail : userData.email}),
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

  const HandleFilters=(selectedStatus,selectedDate)=>{
     
    console.log(selectedDate,selectedStatus);
    
    
    
    if(selectedStatus=='All' && selectedDate=='')
       {
         getAllJobs(user);
         return;
       }

     getJobsbyfilters(user,selectedStatus,selectedDate);
  }

  return (
  
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 w-[85%]">
            <Filters onAddJob={handleAddJob} HandleFilters={HandleFilters}/>
            <JobList handleUpdatedJob={handleUpdatedJob} handleJobDeletion={handleDeleteJob}/>
           {/* <Pagination /> */}
          </div>
        </main>
      </div>
   
  );
};

export default Home;