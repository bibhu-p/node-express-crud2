const { Router } = require('express');
const express = require('express');
const route = express.Router()

const adminController = require('../controller/adminController');
const userController = require('../controller/userController');
const movieController = require('../controller/movieController');


// APIs
// Admin
route.post('/api/admin/register',adminController.register);
route.post('/api/admin/login',adminController.login);

// User
route.post('/api/user/register',userController.register);
route.post('/api/user/login',userController.login);
// route.get('/api/user',userController.find);
// // route.get('/api/user/:id', userController.findById)
// route.put('/api/user/:id',userController.update);
// route.delete('/api/user/delete:id',userController.delete);

// // Movies
// route.post('/api/movies', movieController.create);
// route.get('/api/movies',movieController.find);
// route.put('/api/users/:id',movieController.update);
// route.delete('/api/movies/delete:id',movieController.delete);

module.exports = route
