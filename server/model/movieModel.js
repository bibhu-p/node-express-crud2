const mongoose = require('mongoose');

// Movies Model
const moviesSchema = new mongoose.Schema({
	name: {
        type:String,
        required:true
    },
	director: {
        type:String,
        required:true
    },
	hero : {
        type:String,
        required:true
    },
    heroine: {
        type:String,
        required:true
    },
    producer: {
        type:String,
        required:true
    }
})

const Movies = mongoose.model('movies', moviesSchema);

module.exports = Movies