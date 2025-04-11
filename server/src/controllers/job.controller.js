const JobModel = require('../models/JobModel');

const formatDate = (date) => {
  const dateObj = new Date(date);
  
  const day = dateObj.getDate();
  let suffix = 'th';
  if (day === 1 || day === 21 || day === 31) {
    suffix = 'st';
  } else if (day === 2 || day === 22) {
    suffix = 'nd';
  } else if (day === 3 || day === 23) {
    suffix = 'rd';
  }

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const month = months[dateObj.getMonth()];
  
  const year = dateObj.getFullYear();
  
  return `${day}${suffix} ${month},${year}`;
};


const AddJob = async (req, res) => {
  try {
      const { title, company, doa, link, status, useremail, userid } = req.body;
      console.log(req.body);
      
      if (!title || !title.trim()) {
          return res.status(400).json({
              message: "Job title is required",
              error: true,
          });
      }
      
      if (!company || !company.trim()) {
          return res.status(400).json({
              message: "Company name is required",
              error: true,
          });
      }
      
      if (!doa) {
          return res.status(400).json({
              message: "Date of application is required",
              error: true,
          });
      }
      
      if (!status) {
          return res.status(400).json({
              message: "Application status is required",
              error: true,
          });
      }
      
      if (!useremail || !useremail.trim()) {
          return res.status(400).json({
              message: "User email is required",
              error: true,
          });
      }
      
      if (!userid) {
          return res.status(400).json({
              message: "User ID is required",
              error: true,
          });
      }
      
      const checkEmail = await JobModel.find({ useremail: useremail, company: company, title: title });
      if (checkEmail) {
          console.log("reject");
          return res.status(400).json({
              message: "Already Job Applied",
              error: true,
          });
      }
      
      const formattedDoa = formatDate(doa);
      
      const newJob = {
          title,
          company,
          doa: formattedDoa,
          link,
          status,
          useremail,
          userid
      };
      
      const job = new JobModel(newJob);
      const jobsave = await job.save();
      
      return res.status(201).json({
          message: "New Job Applied Successfully",
          data: jobsave,
          success: true,
      });
  } catch (error) {
      console.error("Error adding job:", error);
      return res.status(500).json({
          message: "Failed to add job",
          error: true,
      });
  }
};

  const GetAllJobs = async (req,res)=>{
    const {useremail} = req.body;
    console.log(req.body);
    const Jobsarr = await JobModel.find({useremail});
   
    return res.status(201).json({
      message : "All Jobs Retrieved Successfully",
      data : Jobsarr,
      success : true,
    })
  }


  const UpdateJob = async (req, res) => {
    try {
      const { id, title, company, doa, link, status, useremail } = req.body;
  
      // Validation
      if (!id || !useremail) {
        return res.status(400).json({
          message: "Job ID and user email are required",
          success: false
        });
      }
  
      // Validate required fields
      if (!title || title.trim() === '') {
        return res.status(400).json({
          message: "Job title is required",
          success: false
        });
      }
  
      if (!company || company.trim() === '') {
        return res.status(400).json({
          message: "Company name is required",
          success: false
        });
      }
  
      if (!doa) {
        return res.status(400).json({
          message: "Date of application is required",
          success: false
        });
      }
  
      // Validate status (assuming allowed values)
      const allowedStatuses = ['applied', 'interview', 'offer', 'rejected', 'pending']; // adjust as needed
      if (!status || !allowedStatuses.includes(status.toLowerCase())) {
        return res.status(400).json({
          message: `Status must be one of: ${allowedStatuses.join(', ')}`,
          success: false
        });
      }
  
      // Validate link (optional but if provided, must be a valid URL)
      if (link && typeof link === 'string' && link.trim() !== '') {
        try {
          new URL(link);
        } catch (err) {
          return res.status(400).json({
            message: "Job link must be a valid URL",
            success: false
          });
        }
      }
  
      // Proceed with update if validation passes
      const updatedjobData = {
        title: title.trim(),
        company: company.trim(),
        doa: formatDate(doa),
        link: link ? link.trim() : '',
        status: status.toLowerCase()
      };
  
      const updatedJob = await JobModel.findOneAndUpdate(
        { _id: id, useremail: useremail }, 
        { ...updatedjobData, updated_at: new Date() },
        { new: true, runValidators: true } 
      );
      
      if (!updatedJob) {
        return res.status(404).json({
          message: "Job not found or you don't have permission to update it",
          success: false
        });
      }
  
      return res.status(200).json({
        message: "Updated Job Successfully",
        data: updatedJob,
        success: true,
      });
    } catch (error) {
      console.error("Error updating job:", error);
      return res.status(500).json({
        message: "Failed to update job",
        error: error.message,
        success: false
      });
    }
  };

  const DeleteJob = async (req, res) => {
    try {
      const { id, useremail } = req.body;
      
      if (!id || !useremail) {
        return res.status(400).json({
          success: false,
          message: "Job ID and user email are required"
        });
      }
      
      const deletedJob = await JobModel.findOneAndDelete({
        _id: id,
        useremail: useremail
      });
      
      if (!deletedJob) {
        return res.status(404).json({
          success: false,
          message: "Job not found or you don't have permission to delete it"
        });
      }
      
      return res.status(200).json({
        message: "Deleted Job Successfully",
        data: deletedJob,
        success: true
      });
      
    } catch (error) {
      console.error("Error deleting job:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to delete job",
        error: error.message
      });
    }
  };

  const GetJobsByFilters=async (req,res)=>{
    const {status,date,useremail} = req.body;
    console.log(status,date,useremail);
    
    if(status!=='All' && date=='')
    {
      const Jobsarr = await JobModel.find({useremail,status});
      return res.status(201).json({
        message : "Retrieved Jobs by status Successfully",
        data : Jobsarr,
        success : true,
      })


    }

    else if(status=='All' && date!=='')
    { const doa = formatDate(date);
      const Jobsarr = await JobModel.find({useremail,doa});
      return res.status(201).json({
        message : "Retrieved Jobs by date Successfully",
        data : Jobsarr,
        success : true,
      })

    }

    else if(status!=='All' && date!=='')
    { const doa = formatDate(date);
      const Jobsarr = await JobModel.find({useremail,status,doa});
      return res.status(201).json({
        message : "Retrieved Jobs by both status and date Successfully",
        data : Jobsarr,
        success : true,
      })

    }

    return res.status(400).json({
      message : "Failed to retrieve jobs with given filters",
      error: true,
      data : [],
  });

  }
  
  module.exports={
    AddJob,
    GetAllJobs,
    UpdateJob,
    DeleteJob,
    GetJobsByFilters,
  }