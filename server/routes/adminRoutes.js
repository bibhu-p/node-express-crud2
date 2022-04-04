const express = require('express');
const route = express.Router()

const adminController = require('../controller/adminController');

route.post('/register',adminController.register);
route.post('/login',adminController.login);


module.exports = route
