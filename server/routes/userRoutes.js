const express = require('express');
const route = express.Router();

const userController = require('../controller/userController');
const middleware = require('../services/middleware');


route.post('/register',userController.register);
route.post('/login',userController.login);
// route.get('/find',middleware,userController.find);
route.get('/find',userController.find);
route.get('/find/:id', userController.findById);
route.put('/update/:id',userController.update);
route.put('/update/movie/:id',userController.updateMovie);
route.delete('/delete/:id',userController.delete);

module.exports = route
