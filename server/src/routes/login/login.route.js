const express = require('express');
const {CheckLogin} = require('../../controllers/login.controller');
  
const LoginRouter = express.Router();

LoginRouter.post('/',CheckLogin);

module.exports = LoginRouter;