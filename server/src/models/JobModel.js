const mongoose= require('mongoose');

const JobSchema = new mongoose.Schema({
     userid:{
        type: String,
        default: "",
     },

     useremail:{
        type: String,
        default: "",
     },

     title:{
        type: String,
        default: "",
     },

     company:{
      type: String,
      default: "",
   },

   doa:{
      type: String,
      default: "",
   },

   link:{
      type: String,
      default: "",
   },

   status:{
      type: String,
      default: "",
   },
  
},{
    timestamps: true,
});

const JobModel = mongoose.model('Job',JobSchema);

module.exports = JobModel;