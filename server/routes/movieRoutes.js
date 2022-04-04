const express = require('express');
const route = express.Router()
const movieController = require('../controller/movieController');


route.post('/create', movieController.create);
route.get('/find',movieController.find);
route.get('/find:id',movieController.findById);
route.put('/update:id',movieController.update);
route.delete('/delete:id',movieController.delete);

module.exports = route