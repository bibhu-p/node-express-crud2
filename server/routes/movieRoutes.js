const express = require('express');
const route = express.Router()
const movieController = require('../controller/movieController');
const middleware = require('../services/middleware');


route.post('/create',middleware, movieController.create);
route.get('/find',middleware,movieController.find);
route.get('/find/:id',middleware,movieController.findById);
route.put('/update/:id',middleware,movieController.update);
route.delete('/delete/:id',middleware,movieController.delete);
// route.post('/upload',movieController.uploadPoster);


module.exports = route