const express = require('express');
const route = express.Router();

const userController = require('../controller/userController');


route.post('/register',userController.register);
route.post('/login',userController.login);
route.get('/find',userController.find);
route.get('/find/:id', userController.findById);
route.put('/update/:id',userController.update);
route.delete('/delete',userController.delete);

module.exports = route
