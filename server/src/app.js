const express= require('express');
const cors = require("cors");
const app= express();
const morgan = require('morgan');
require('dotenv').config() 

app.use(express.json());

//Routes
const RegisterRouter = require('./routes/register/register.router');
const LoginRouter = require('./routes/login/login.route');
const JobRouter = require('./routes/Job/Job.route');

// app.use(cors({
//     origin:`${process.env.FRONT_END_URL}`,
//     credentials: true,
// }));

// origin:'http://localhost:5173',

app.use(cors({
    origin:'https://student-job-tracker-khaki.vercel.app/signin',
    credentials: true,
}));

app.use(morgan('combined'));

app.use('/register',RegisterRouter);
app.use('/login',LoginRouter);
app.use('/job',JobRouter);

module.exports = app;

