const express = require('express');
const {AddJob,GetAllJobs,UpdateJob,DeleteJob, GetJobsByFilters} = require('../../controllers/job.controller');
  
const JobRouter = express.Router();

JobRouter.post('/add',AddJob);
JobRouter.post('/getall',GetAllJobs);
JobRouter.put('/update',UpdateJob);
JobRouter.delete('/',DeleteJob);
JobRouter.post('/filter',GetJobsByFilters);
module.exports = JobRouter;